'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
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
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/') ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Home
            </Link>
            <Link
              href="/learn"
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/learn') ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Learn
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/about') ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/contact') ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Contact
            </Link>
            <Link
              href="/learn"
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              Start Learning
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600"
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
            <Link
              href="/learn"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors mt-4 text-center"
            >
              Start Learning
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation