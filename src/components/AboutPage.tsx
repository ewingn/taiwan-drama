'use client'

import React from 'react'
import Link from 'next/link'
import { Heart, Globe, Award } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Hook - Problem + Personal Connection */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🎭</div>
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

        {/* Vision & Roadmap */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Vision & Roadmap</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-3">🎭</div>
              <h3 className="font-bold mb-2">Phase 1: Drama Immersion</h3>
              <p className="text-sm text-gray-600">
                Complete romance storyline with 10+ chapters, advanced AI conversations, 
                and full cultural context system.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="font-bold mb-2">Phase 2: Community Hub</h3>
              <p className="text-sm text-gray-600">
                Social features, user-generated content, community challenges, 
                and progress sharing across platforms.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="font-bold mb-2">Phase 3: Platform Scale</h3>
              <p className="text-sm text-gray-600">
                Multiple learning arcs, other Chinese dialects, 
                and expansion to other language/culture combinations.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback CTA - The Most Important Section */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">I Need Your Input!</h2>
            <p className="text-xl opacity-90 mb-6">
              This is a passion project, but I want to build something people actually love. 
              Your feedback shapes what gets built next.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <h3 className="font-bold mb-3">What I'm Looking For:</h3>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Does this feel authentic to Taiwanese culture?</li>
                <li>• What scenarios would you want to practice?</li>
                <li>• How can we make it more social/shareable?</li>
                <li>• What features would keep you coming back?</li>
              </ul>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <h3 className="font-bold mb-3">How to Reach Me:</h3>
              <div className="space-y-2 text-sm opacity-90">
                <div>📧 youyong189@gmail.com</div>
                <div>🎥 YouTube comments & discussions</div>
                <div>💬 Try the app and tell me what breaks</div>
                <div>🐛 Report bugs and weird behaviors</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg opacity-90 mb-6">
              Seriously - even if you just think "this is weird but interesting" or "this completely misses the mark," 
              I want to hear it. Building in public means being open to all feedback.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:youyong189@gmail.com?subject=TaiwanScript Feedback"
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Send Me Feedback
              </a>
              
              <a 
                href="https://www.youtube.com/@YouYong%E8%AF%B4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Youtube className="w-4 h-4" />
                YouTube Discussions
              </a>
            </div>
          </div>
        </div>

        {/* Personal Touch + CTA */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Coffee className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">Built with way too much coffee in Chicago</span>
          </div>
          
          <p className="text-gray-600 mb-6">
            Join thousands of learners who are mastering Chinese through the power of storytelling and immersive role-play.
          </p>
          <Link 
            href="/learn"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
          >
            Try TaiwanScript
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutPage