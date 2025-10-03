'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// ⚡️ NEW: Import necessary icons and the useAuth hook
import { Menu, X, User, Heart, LogOut } from 'lucide-react'
import { useAuth } from '../lib/auth-context' 
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase/config'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  // ⚡️ NEW: Use the authentication context
  const { user, profile, progress, loading } = useAuth()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }
  
  const handleSignOut = async () => {
    setIsOpen(false)
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Helper to determine the text for the action button
  const ActionButton = () => {
    if (loading) {
      return (
        <div className="bg-gray-200 animate-pulse text-gray-200 px-6 py-2 rounded-full text-sm">
          Loading...
        </div>
      )
    }

    if (user) {
      // Logged in: Show Sign Out button
      return (
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors flex items-center space-x-1 text-sm"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      )
    }

    // Logged out: Show Sign In/Start Learning button
    return (
      <Link
        href="/login" // Assuming you'll create a dedicated login page
        className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors text-sm"
      >
        Sign In / Sign Up
      </Link>
    )
  }

  // Helper to display user info (only when logged in)
  const UserStatus = () => {
    if (!user || loading) return null

    // Fallback display name
    const displayName = profile?.displayName || profile?.email?.split('@')[0] || 'User'
    
    return (
      <>
        {/* User Profile Link/Status */}
        <Link 
          href="/profile" // Link to a new profile/dashboard page
          className="hidden md:flex items-center space-x-2 text-sm text-gray-700 hover:text-red-600"
        >
          <User size={20} className="text-red-600" />
          <span>{displayName}</span>
        </Link>
        
        {/* User Affection/Progress Status */}
        <div className="flex items-center space-x-1 text-sm text-pink-600">
          <Heart size={16} className="fill-pink-600" />
          {/* Note: Reading totalAffection from the progress object */}
          <span className="font-semibold">{progress?.totalAffection || 0}</span>
        </div>
      </>
    )
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-red-600">
              TaiwanScript
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Home
            </Link>
            <Link
              href="/learn"
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/learn') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Learn
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/about') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/contact') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Contact
            </Link>

            {/* ⚡️ NEW: User Status and Action Button */}
            <UserStatus />
            <ActionButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {/* Show only the menu button and user status if available */}
            {!loading && user && <UserStatus />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600 ml-4"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600"
            >
              Home
            </Link>
            <Link
              href="/learn"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600"
            >
              Learn
            </Link>
            {/* ⚡️ NEW: Profile link in mobile view */}
            {user && (
              <Link 
                href="/profile" 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600"
              >
                Profile
              </Link>
            )}
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600"
            >
              Contact
            </Link>
            
            {/* ⚡️ NEW: Action Button in Mobile View */}
            <div className="pt-4 px-3">
               {/* Use the ActionButton component, forcing the full width class for mobile */}
              {loading ? (
                <div className="block w-full bg-gray-200 animate-pulse text-gray-200 px-6 py-2 rounded-full text-center text-base">
                  Loading...
                </div>
              ) : user ? (
                <button
                  onClick={handleSignOut}
                  className="block w-full bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 text-base"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors text-center text-base"
                >
                  Sign In / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation