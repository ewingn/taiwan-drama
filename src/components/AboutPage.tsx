'use client'

import React from 'react'
import Link from 'next/link'
import { Heart, Globe, Award, Code, BookOpen } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            From a Secret Dream to Your Screen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TaiwanScript was born from a decade-long journey in learning Chinese and a secret dream of starring in a Taiwanese drama.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Founder's Story</h2>
            <p className="text-gray-600 mb-4">
              For over ten years, I've been learning Chinese. Like many, my journey was sparked by the captivating world of Taiwanese dramas. I was hooked by the storylines, the culture, and the way the language was used in everyday life. It became my secret learning tool.
            </p>
            <p className="text-gray-600 mb-4">
              Deep down, I also held onto a secret dream: to one day be an actor in one of those dramas. While traditional apps taught me vocabulary, they couldn't teach me how to deliver lines with the right emotion or how to react in a scene.
            </p>
            <p className="text-gray-600">
              As a product manager in the tech industry, I saw an opportunity to merge my passions. I wanted to build something that could help others like me live out that same dream—to step into the shoes of a drama character and practice Chinese in a way that's fun, immersive, and truly unforgettable.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Philosophy</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Code className="text-purple-500 w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Passion for Tech</h3>
                  <p className="text-gray-600 text-sm">We leverage technology to create innovative and effective language learning tools.</p>
                </div>
              </div>
              <div className="flex items-start">
                <BookOpen className="text-blue-500 w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Love of Language</h3>
                  <p className="text-gray-600 text-sm">We believe learning a language should be a joyful and engaging experience.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Globe className="text-green-500 w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Cultural Connection</h3>
                  <p className="text-gray-600 text-sm">We use TV dramas as a window into the richness of Taiwanese culture.</p>
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
            Join us in this unique adventure to master Chinese through the power of storytelling and immersive role-play.
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