// src/lib/firebase/config.ts

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration object (ensure these are set in your Next.js .env files)
const firebaseConfig = {
  apiKey: "AIzaSyCe-wTNOu18fRqwQf6DZdheoKVgapUdFYs",
  authDomain: "taiwanscript-app.firebaseapp.com",
  projectId: "taiwanscript-app",
  storageBucket: "taiwanscript-app.firebasestorage.app",
  messagingSenderId: "249991008629",
  appId: "1:249991008629:web:559b7b705c983c9274833c",
  measurementId: "G-X8S572PP4J"
};

// Initialize Firebase App only once (prevents errors on hot reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const analytics = getAnalytics(app);

// Export the initialized services
// This export resolves the TS2459 error.
export const db = getFirestore(app)
export const auth = getAuth(app)