'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, User, Heart, ChevronRight, Settings, Loader2 } from 'lucide-react'
import { FirebaseError } from 'firebase/app' // Fixes TypeScript error for FirebaseError

// Import hooks and Firestore functions
import { useAuth } from '../../lib/auth-context' 
import { updateUserProfile, UserProfile } from '../../lib/firebase/firestore-operations'
import { auth } from '../../lib/firebase/config'
import { signOut } from 'firebase/auth'

const ProfilePage = () => {
  // Use the global authentication state
  const { user, profile, progress, loading } = useAuth()
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  // 1. Authentication Guard / Redirection
  useEffect(() => {
    if (!loading && !user) {
      // Redirect unauthenticated users to the login page
      router.push('/login')
    }
  }, [user, loading, router])

  // Function to handle changes to user preferences
  const handlePreferenceChange = async (key: keyof UserProfile['preferences'], value: any) => {
    if (!profile) return

    setIsUpdating(true)
    setStatusMessage('Saving preference...')

    const newPreferences = {
      ...profile.preferences,
      [key]: value,
    }
    
    try {
      // Call the function to persist the updated profile
      await updateUserProfile(profile.uid, { preferences: newPreferences })
      setStatusMessage('Preferences updated successfully!')
    } catch (error) {
      console.error("Error updating preferences:", error)
      setStatusMessage('Error updating preferences. Try again.')
    } finally {
      setIsUpdating(false)
      setTimeout(() => setStatusMessage(''), 3000)
    }
  }

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth) 
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Show a loading/redirecting state if data is still fetching or user is logging out
  if (loading || !user || !profile) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] text-red-600">
        <Loader2 size={32} className="animate-spin mr-2" />
        <span>Loading profile data...</span>
      </div>
    )
  }

  // Fallback display name
  const displayName = profile.displayName || profile.email.split('@')[0] || 'User'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <User size={32} className="mr-3 text-red-600" />
          {displayName}'s Dashboard
        </h1>
        <button 
          onClick={handleSignOut}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
          disabled={isUpdating}
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>

      {statusMessage && (
        <p className={`mb-4 text-center font-medium ${statusMessage.startsWith('Error') ? 'text-red-500' : 'text-green-600'}`}>
          {statusMessage}
        </p>
      )}

      {/* ------------------- GAME PROGRESS OVERVIEW ------------------- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          icon={<Heart size={24} className="text-pink-600" />}
          label="Total Affection"
          value={progress?.totalAffection || 0}
          color="text-pink-600"
          unit="💖"
        />
        <StatCard 
          icon={<ChevronRight size={24} className="text-red-600" />}
          label="Chapters Completed"
          value={progress?.chaptersCompleted.length || 0}
          color="text-red-600"
          unit="Arcs"
        />
        <StatCard 
          icon={<Settings size={24} className="text-gray-600" />}
          label="Total Play Time"
          value={Math.round(progress?.totalPlayTime || 0)}
          color="text-gray-600"
          unit="minutes"
        />
      </section>

      {/* ------------------- LEARNING PREFERENCES ------------------- */}
      <section className="bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Learning Preferences</h2>
        
        <PreferenceToggle
          label="Show Pinyin"
          description="Display Pinyin transcription under Hanzi characters for reading practice."
          checked={profile.preferences.showPinyin}
          onChange={(checked) => handlePreferenceChange('showPinyin', checked)}
          disabled={isUpdating}
        />

        <PreferenceToggle
          label="Auto-Play Audio"
          description="Automatically play the native audio when dialogue lines appear."
          checked={profile.preferences.autoPlayAudio}
          onChange={(checked) => handlePreferenceChange('autoPlayAudio', checked)}
          disabled={isUpdating}
        />

        <PreferenceSlider
          label="Voice Speed"
          value={profile.preferences.voiceSpeed}
          onChange={(value) => handlePreferenceChange('voiceSpeed', value)}
          min={0.5}
          max={1.5}
          step={0.1}
          unit="x"
          disabled={isUpdating}
        />

      </section>
    </div>
  )
}

// --------------------- Helper Components (Re-use these from the previous step) ---------------------

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number | string; color: string; unit: string }> = ({ icon, label, value, color, unit }) => (
    <div className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4">
        <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-2xl font-extrabold text-gray-900">{value} {unit}</p>
        </div>
    </div>
)

const PreferenceToggle: React.FC<{ label: string; description: string; checked: boolean; onChange: (checked: boolean) => void; disabled: boolean }> = ({ label, description, checked, onChange, disabled }) => (
    <div className="flex justify-between items-start py-4 border-b">
        <div className="max-w-md">
            <p className="text-lg font-medium text-gray-900">{label}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button
            onClick={() => onChange(!checked)}
            disabled={disabled}
            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 ${
                checked ? 'bg-red-600' : 'bg-gray-200'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                    checked ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
        </button>
    </div>
)

const PreferenceSlider: React.FC<{ label: string; value: number; onChange: (value: number) => void; min: number; max: number; step: number; unit: string; disabled: boolean }> = ({ label, value, onChange, min, max, step, unit, disabled }) => (
  <div className="py-4 border-b last:border-b-0">
    <div className="flex justify-between items-center mb-2">
      <p className="text-lg font-medium text-gray-900">{label}</p>
      <span className="text-lg font-bold text-red-600">{value.toFixed(1)}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      disabled={disabled}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ accentColor: '#dc2626' }}
    />
    <div className="flex justify-between text-sm text-gray-500 mt-1">
      <span>Slow ({min}{unit})</span>
      <span>Fast ({max}{unit})</span>
    </div>
  </div>
)


export default ProfilePage