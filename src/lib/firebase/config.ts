// src/lib/firebase/config.ts

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your Firebase configuration object (ensure these are set in your Next.js .env files)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase App only once (prevents errors on hot reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Export the initialized services
// This export resolves the TS2459 error.
export const db = getFirestore(app)
export const auth = getAuth(app)