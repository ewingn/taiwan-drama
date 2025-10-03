'use client'

import React, { useState } from 'react'
import { ArrowRight, Gamepad2, Star, Smartphone, Share, Trophy } from 'lucide-react'
import RomanceLearningPath from './RomanceLearningPath'  // ✅ Correct import path

interface Arc {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  lessons: number
  difficulty: string
  available: boolean
  enhanced?: boolean
  mobile?: boolean
  bgColor: string
  icon: string
}

const LearnPage = () => {
  const [selectedArc, setSelectedArc] = useState<string | null>(null)

  const arcs: Arc[] = [
    {
      id: 'drama',
      title: 'TV Drama Arc',
      subtitle: 'High School Romance Path',
      description: 'Experience a complete Taiwanese high school romance while learning through interactive storytelling and mobile-optimized games.',
      features: [
        '📱 Mobile-first responsive design',
        '🔗 NYT Connections-style word games',
        '📤 Shareable results for social media',
        '💕 Romance storyline with character development',
        '🎯 Progress tracking with XP and affection meter',
        '🎮 Multiple mini-game types and difficulties'
      ],
      lessons: 30,
      difficulty: 'Beginner to Intermediate',
      available: true,
      enhanced: true,
      mobile: true,
      bgColor: 'from-pink-500 to-red-500',
      icon: '💕'
    },
    {
      id: 'taipei',
      title: 'Taipei Life Arc',
      subtitle: 'Urban Adventures',
      description: 'Master everyday Taiwanese Chinese through authentic city scenarios - from ordering at local eateries to navigating the MRT system.',
      features: [
        'Transportation and directions',
        'Food ordering and restaurant etiquette',
        'Shopping and bargaining',
        'Small talk with locals'
      ],
      lessons: 15,
      difficulty: 'Intermediate',
      available: false,
      bgColor: 'from-blue-500 to-purple-500',
      icon: '🌃'
    },
    {
      id: 'ktv',
      title: 'KTV Night Arc',
      subtitle: 'Social Entertainment',
      description: 'Experience Taiwan\'s beloved KTV culture while learning social phrases, song vocabulary, and group interaction dynamics.',
      features: [
        'Song selection and music vocabulary',
        'Group social dynamics',
        'Party phrases and celebrations',
        'Friendship and bonding language'
      ],
      lessons: 8,
      difficulty: 'Intermediate',
      available: false,
      bgColor: 'from-purple-500 to-pink-500',
      icon: '🎤'
    },
    {
      id: 'huandao',
      title: 'Huandao Arc',
      subtitle: 'Island Adventure',
      description: 'Join the ultimate Taiwan cycling adventure, learning travel vocabulary while exploring the island\'s diverse landscapes and cultures.',
      features: [
        'Travel and accommodation booking',
        'Geographic and nature vocabulary',
        'Local dialect variations',
        'Adventure and outdoor activities'
      ],
      lessons: 20,
      difficulty: 'Advanced',
      available: false,
      bgColor: 'from-green-500 to-blue-500',
      icon: '🚲'
    }
  ]

  if (selectedArc === 'drama') {
    return <RomanceLearningPath onBack={() => setSelectedArc(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Arc
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Each arc offers a unique journey through different aspects of Taiwanese culture and language
          </p>
          
          {/* Mobile-Optimized Features Banner */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-bold text-sm sm:text-base">NEW: Mobile-Optimized Learning!</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center justify-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                <span>Interactive Mini-Games</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Share className="w-4 h-4" />
                <span>Shareable Progress</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>XP & Achievement System</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {arcs.map((arc) => (
<div
  key={arc.id}
  className={`relative rounded-3xl p-6 sm:p-8 text-white overflow-hidden 
              shadow-2xl border border-white/20 backdrop-blur-sm ${
    arc.available 
      ? 'cursor-pointer hover:scale-105 hover:shadow-3xl hover:-translate-y-2' 
      : 'cursor-not-allowed opacity-75'
  } transition-all duration-500 ease-out`}
              style={{
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                backgroundImage: arc.bgColor.includes('pink') && arc.bgColor.includes('red') 
                  ? 'linear-gradient(135deg, #ec4899, #ef4444)'
                  : arc.bgColor.includes('blue') && arc.bgColor.includes('purple')
                  ? 'linear-gradient(135deg, #3b82f6, #a855f7)'
                  : arc.bgColor.includes('purple') && arc.bgColor.includes('pink')
                  ? 'linear-gradient(135deg, #a855f7, #ec4899)'
                  : 'linear-gradient(135deg, #10b981, #3b82f6)'
              }}
              onClick={() => arc.available && setSelectedArc(arc.id)}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl sm:text-5xl">{arc.icon}</div>
                    <div className="flex flex-col gap-1">
                      {arc.enhanced && (
                        <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          ENHANCED
                        </div>
                      )}
                      {arc.mobile && (
                        <div className="bg-green-400 text-green-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Smartphone className="w-3 h-3" />
                          MOBILE
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                      {arc.lessons} Lessons
                    </div>
                    <div className="text-sm mt-1 opacity-90">{arc.difficulty}</div>
                  </div>
                </div>
                
               <h3 className="text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg">
  {arc.title}
</h3>
                <p className="text-base sm:text-lg opacity-90 mb-4">{arc.subtitle}</p>
                <p className="opacity-80 mb-6 text-sm sm:text-base">{arc.description}</p>
                
                <div className="space-y-2 mb-6">
                  {arc.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs sm:text-sm">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        arc.enhanced && index < 3 ? 'bg-yellow-300' : 'bg-white'
                      }`}></div>
                      <span className={arc.enhanced && index < 3 ? 'font-medium' : ''}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium ${
                    arc.available 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'bg-gray-500 bg-opacity-50 text-gray-300'
                  }`}>
                    {arc.available ? (arc.enhanced ? 'Ready to Play' : 'Available Now') : 'Coming Soon'}
                  </div>
                  {arc.available && (
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </div>
              </div>
              
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
              
              {/* Enhanced Badges */}
              {(arc.enhanced || arc.mobile) && (
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {arc.mobile && (
                    <div className="bg-green-400 text-green-900 p-2 rounded-full">
                      <Smartphone className="w-4 h-4" />
                    </div>
                  )}
                  {arc.enhanced && (
                    <div className="bg-yellow-400 text-yellow-900 p-2 rounded-full">
                      <Gamepad2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA for Mobile */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold mb-2">📱 Perfect for Mobile Learning</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Learn Chinese anywhere, anytime with touch-optimized games and shareable progress for your social media!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-gray-500">
              <span>🎮 Touch-Friendly Games</span>
              <span>📤 Share to YouTube Comments</span>
              <span>📊 Visual Progress Tracking</span>
              <span>💕 Engaging Storylines</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnPage