// src/lib/auth-context.tsx
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config' // Your initialized auth instance
import { getUserProfile, getGameProgress, createUserProfile, createGameProgress, UserProfile, GameProgress } from './firebase/firestore-operations'

// Define the shape of your context data
interface AuthContextType {
  user: User | null // Firebase Auth User object
  profile: UserProfile | null // Your custom Firestore UserProfile
  progress: GameProgress | null // Your custom GameProgress
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [progress, setProgress] = useState<GameProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Firebase Auth State Listener (uses 'auth' from config.ts)
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser)
      if (authUser) {
        // 2. Fetch User Data (uses firestore-operations.ts)
        let userProfile = await getUserProfile(authUser.uid)
        let gameProgress = await getGameProgress(authUser.uid)

        // **Handle New User Creation (Critical Logic)**
        if (!userProfile) {
          console.log("New user detected, creating profile and progress.")
          userProfile = await createUserProfile(authUser.uid, authUser.email!, authUser.displayName)
          gameProgress = await createGameProgress(authUser.uid) // Initialize with default affection of 15
        }
        
        setProfile(userProfile)
        setProgress(gameProgress)
      } else {
        // User logged out
        setProfile(null)
        setProgress(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const contextValue = {
    user,
    profile,
    progress,
    loading,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}