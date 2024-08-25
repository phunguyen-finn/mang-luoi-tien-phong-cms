import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail, User, setPersistence, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";
import { Auth } from "@/services/firebase";

export const AuthService = {
    login: async function (email: string, password: string, remember: boolean) {
        await AuthService.setPersistence(remember);
        return signInWithEmailAndPassword(Auth, email, password);
    },
    logout: async function () {
        return signOut(Auth);
    },
    passwordReset: function (email: string) {
        return sendPasswordResetEmail(Auth, email);
    },
    onAuthStateChanged: function (callback: (user: User | null) => void) {
        return Auth.onAuthStateChanged((user) => {
            callback(user);
        });
    },
    setPersistence: function (persist: boolean) {
        return setPersistence(
            Auth,
            persist ? browserLocalPersistence : browserSessionPersistence
        );
    },
}

export default AuthService;