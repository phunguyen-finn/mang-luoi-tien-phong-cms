'use server'

import { cookies } from 'next/headers'
import * as jose from 'jose'
import { applicationDefault, initializeApp as initializeAdminApp, deleteApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { AUTHORITY } from '../user.service';

export async function createSession(idToken: string, remeber: boolean) {
    const serviceAccount = JSON.parse(
        process.env.GOOGLE_APPLICATION_CREDENTIALS as string
    );

    const AdminFirebase = initializeAdminApp({
        credential: cert(serviceAccount),
    }, "admin");

    try {
        const decodedIdToken = await getAuth(AdminFirebase).verifyIdToken(idToken);
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const db = getFirestore(AdminFirebase);

        const userDoc = await db.collection('user').doc(decodedIdToken.email as string).get();
        if (!userDoc.exists) {
            throw new Error('User not found');
        }
        const token = await new jose.SignJWT({
            uid: decodedIdToken.uid,
            email: decodedIdToken.email,
            displayName: userDoc.data()!.displayName,
            authority: userDoc.data()!.authority,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret);
        if (!remeber) {
            cookies().set('session', token, {
                sameSite: "strict",
                secure: true,
                httpOnly: true,
            })
        } else {
            cookies().set('session', token, {
                sameSite: "strict",
                secure: true,
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
            })
        }
    }
    catch (error: any) {
        throw new Error(error);
    } finally {
        deleteApp(AdminFirebase);
    }
}

export async function deleteSession() {
    cookies().set('session', '', {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
        maxAge: 0,
    })
}

export async function createAccount(email: string, password: string, displayName: string, authority: AUTHORITY, createdBy: string) {
    const serviceAccount = JSON.parse(
        process.env.GOOGLE_APPLICATION_CREDENTIALS as string
    );

    const AdminFirebase = initializeAdminApp({
        credential: cert(serviceAccount),
    }, "admin");

    try {
        const db = getFirestore(AdminFirebase);
        const user = await getAuth(AdminFirebase).createUser({
            email,
            password,
        });
        await db.collection('user').doc(email).set({
            createdAt: Timestamp.now(),
            createdBy,
            displayName,
            authority,
            uid: user.uid,
        });
    } catch (error: any) {
        throw new Error(error);
    } finally {
        deleteApp(AdminFirebase);
    }
}

export async function editAccount(data: any) {
    const serviceAccount = JSON.parse(
        process.env.GOOGLE_APPLICATION_CREDENTIALS as string
    );

    const AdminFirebase = initializeAdminApp({
        credential: cert(serviceAccount),
    }, "admin");

    try {
        const db = getFirestore(AdminFirebase);
        await db.collection('user').doc(data.email).update({
            displayName: data.displayName,
            authority: data.authority,
        });
    } catch (error: any) {
        throw new Error(error);
    } finally {
        deleteApp(AdminFirebase);
    }
}

export async function deleteAccount(id: string) {
    const serviceAccount = JSON.parse(
        process.env.GOOGLE_APPLICATION_CREDENTIALS as string
    );

    const AdminFirebase = initializeAdminApp({
        credential: cert(serviceAccount),
    }, "admin");

    try {
        const db = getFirestore(AdminFirebase);
        await getAuth(AdminFirebase).deleteUser(id);
        const snapshot = await db.collection('user').where('uid', '==', id).get();
        if (snapshot.empty) {
            throw new Error('User not found');
        }
        await db.collection('user').doc(snapshot.docs[0].id).delete();
    } catch (error: any) {
        throw new Error(error);
    } finally {
        deleteApp(AdminFirebase);
    }
}