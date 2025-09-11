'use client'

import React from 'react'
import Link from 'next/link'
import { Heart, Globe, Award } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Born from a Dream
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TaiwanScript was created from a secret desire to be a drama actor when first learning Chinese. 
            We believe language learning should be as engaging and immersive as your favorite TV show.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Like many language learners, our founder fell in love with Chinese through Taiwanese dramas. 
              The melodramatic storylines, the cultural nuances, and the authentic expressions used in 
              everyday conversations became the perfect learning laboratory.
            </p>
            <p className="text-gray-600 mb-4">
              Traditional language apps teach you to order coffee, but they don't teach you how to 
              dramatically confess your feelings in the rain or navigate the complex social dynamics 
              of a Taiwanese family dinner.
            </p>
            <p className="text-gray-600">
              TaiwanScript fills that gap by letting you live these experiences, not just learn about them.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Heart className="text-red-500 w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Cultural Immersion</h3>
                  <p className="text-gray-600 text-sm">Experience authentic Taiwanese culture through interactive storytelling</p>
                </div>
              </div>
              <div className="flex items-start">
                <Globe className="text-blue-500 w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Practical Learning</h3>
                  <p className="text-gray-600 text-sm">Learn phrases and vocabulary you'll actually use in real situations</p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="text-green-500 w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Confidence Building</h3>
                  <p className="text-gray-600 text-sm">Practice speaking without judgment in a safe, supportive environment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Star in Your Own Learning Journey?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of learners who are mastering Chinese through the power of storytelling and immersive role-play.
          </p>
          <Link 
            href="/learn"
            className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors inline-block"
          >
            Start Your First Scene
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutPage