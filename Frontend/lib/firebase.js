import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA1l6mQZNtPR7rWzR6LSy2mTbQNZIx0WSk",
    authDomain: "career-lounge-695fd.firebaseapp.com",
    projectId: "career-lounge-695fd",
    storageBucket: "career-lounge-695fd.firebasestorage.app",
    messagingSenderId: "301868876486",
    appId: "1:301868876486:web:dd6e9cee9a763b67db4dc7",
    measurementId: "G-0457YHGP8Z"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;