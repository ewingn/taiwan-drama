'use client'

import React from 'react'
import Link from 'next/link'
import { Play, BookOpen, Users, MessageCircle, Star, Mic } from 'lucide-react'

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn Chinese Through
              <span className="text-red-600 block">Taiwanese Drama</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Immerse yourself in authentic Taiwanese culture. Role-play as drama characters, 
              master key phrases, and speak with AI to test your skills in real scenarios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/learn"
                className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Play className="mr-2" size={20} />
                Start Your Journey
              </Link>
              <button className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="bg-yellow-400 rounded-full p-3">
            <Star className="text-white" size={24} />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse">
          <div className="bg-blue-500 rounded-full p-3">
            <MessageCircle className="text-white" size={24} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why TaiwanScript Works
            </h2>
            <p className="text-xl text-gray-600">
              Experience authentic language learning through immersive storytelling
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <BookOpen className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Stories</h3>
              <p className="text-gray-600">
                Follow engaging storylines while learning vocabulary and phrases in context
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Mic className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Voice Practice</h3>
              <p className="text-gray-600">
                Practice speaking with AI characters and get instant feedback on pronunciation
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cultural Immersion</h3>
              <p className="text-gray-600">
                Experience authentic Taiwanese scenarios from night markets to KTV
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Arcs Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Adventure
            </h2>
            <p className="text-xl text-gray-600">
              Multiple learning paths designed around authentic Taiwanese experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/learn" className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-xl font-semibold mb-2">TV Drama</h3>
                <p className="text-gray-600 text-sm mb-4">Act out classic Taiwanese drama scenes</p>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
                  MVP Ready
                </span>
              </div>
            </Link>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🌃</div>
                <h3 className="text-xl font-semibold mb-2">Taipei Life</h3>
                <p className="text-gray-600 text-sm mb-4">Navigate daily life in Taipei city</p>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  Coming Soon
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🎤</div>
                <h3 className="text-xl font-semibold mb-2">KTV Night</h3>
                <p className="text-gray-600 text-sm mb-4">Sing and socialize at karaoke</p>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  Coming Soon
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🚲</div>
                <h3 className="text-xl font-semibold mb-2">Huandao</h3>
                <p className="text-gray-600 text-sm mb-4">Cycle around Taiwan island</p>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage