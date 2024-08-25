'use server'

import { cookies } from 'next/headers'
import * as jose from 'jose'
import { applicationDefault, initializeApp as initializeAdminApp, deleteApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export async function createSession(idToken: string, remeber: boolean) {
    const AdminFirebase = initializeAdminApp({
        credential: applicationDefault(),
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