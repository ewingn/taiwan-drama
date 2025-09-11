'use client'

import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import TVDramaArc from './TVDramaArc'

interface Arc {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  lessons: number
  difficulty: string
  available: boolean
  bgColor: string
  icon: string
}

const LearnPage = () => {
  const [selectedArc, setSelectedArc] = useState<string | null>(null)

  const arcs: Arc[] = [
    {
      id: 'drama',
      title: 'TV Drama Arc',
      subtitle: 'Classic Taiwanese Romance',
      description: 'Step into the shoes of beloved drama characters and navigate romance, family drama, and friendship in classic Taiwanese TV show scenarios.',
      features: [
        'Interactive script reading with key vocabulary',
        'Character relationship dynamics',
        'Common drama phrases and expressions',
        'Emotional dialogue practice'
      ],
      lessons: 12,
      difficulty: 'Beginner',
      available: true,
      bgColor: 'from-pink-500 to-red-500',
      icon: '🎭'
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
    return <TVDramaArc onBack={() => setSelectedArc(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Arc
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each arc offers a unique journey through different aspects of Taiwanese culture and language
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {arcs.map((arc) => (
            <div
              key={arc.id}
              className={`relative rounded-2xl p-8 text-white overflow-hidden ${
                arc.available ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-75'
              } transition-all duration-300`}
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
                  <div className="text-5xl">{arc.icon}</div>
                  <div className="text-right">
                    <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                      {arc.lessons} Lessons
                    </div>
                    <div className="text-sm mt-1 opacity-90">{arc.difficulty}</div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{arc.title}</h3>
                <p className="text-lg opacity-90 mb-4">{arc.subtitle}</p>
                <p className="opacity-80 mb-6">{arc.description}</p>
                
                <div className="space-y-2 mb-6">
                  {arc.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                    arc.available 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'bg-gray-500 bg-opacity-50 text-gray-300'
                  }`}>
                    {arc.available ? 'Available Now' : 'Coming Soon'}
                  </div>
                  {arc.available && (
                    <ArrowRight className="w-6 h-6" />
                  )}
                </div>
              </div>
              
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LearnPage