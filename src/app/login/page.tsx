// src/app/login/page.tsx

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
} from 'firebase/auth'

// ⚡️ FIX: Import FirebaseError from the core firebase/app module
// This is usually where utility types like FirebaseError reside in modular SDKs.
import { FirebaseError } from 'firebase/app' 

import { auth } from '../../lib/firebase/config' // Your initialized auth instance
import { useAuth } from '../../lib/auth-context' // Your custom auth hook

// ... rest of the LoginPage component code remains the same ...

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect authenticated users away from the login page
  useEffect(() => {
    if (!loading && user) {
      router.push('/learn')
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      if (isLogin) {
        // Sign In logic
        await signInWithEmailAndPassword(auth, email, password)
        // If successful, the AuthContext listener handles fetching Firestore data and redirection
        
      } else {
        // Sign Up logic
        await createUserWithEmailAndPassword(auth, email, password)
        // If successful, the AuthContext listener handles creating Firestore profile/progress and redirection
      }
    } catch (err) {
      const firebaseError = err as FirebaseError
      console.error(firebaseError.code, firebaseError.message)
      
      let message = "An unexpected error occurred."
      if (firebaseError.code === 'auth/invalid-email') {
        message = 'Invalid email format.'
      } else if (firebaseError.code === 'auth/wrong-password' || firebaseError.code === 'auth/user-not-found') {
        message = 'Invalid credentials. Please check your email and password.'
      } else if (firebaseError.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Try logging in.'
      } else if (firebaseError.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.'
      }
      
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // If user is already logged in or we're loading, show a loading spinner
  if (loading || user) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)]">
        <Loader2 size={32} className="animate-spin text-red-600 mb-4" />
        <p className="text-gray-600">Authenticating...</p>
      </div>
    )
  }


  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)] bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-red-600 mb-6">
          {isLogin ? 'Welcome Back!' : 'Start Your Journey'}
        </h1>
        <p className="text-center text-gray-500 mb-8">
          {isLogin 
            ? "Log in to continue your Taiwanese drama adventure."
            : "Sign up to create your profile and unlock the story."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="Minimum 6 characters"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 p-3 bg-red-50 border border-red-200 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400"
          >
            {isSubmitting ? (
              <Loader2 size={20} className="animate-spin mr-2" />
            ) : (
              <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-600 hover:text-red-600 font-medium"
          >
            {isLogin 
              ? "Need an account? Sign up instead." 
              : "Already have an account? Log in here."}
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

// ⚡️ The crucial part to resolve the error: export the component by default
export default LoginPage