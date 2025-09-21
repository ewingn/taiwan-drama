'use client'

import React from 'react'
import Link from 'next/link'
import { Heart, Youtube, MapPin, Clapperboard, Code, Target, Users, MessageCircle, TrendingUp, Zap, Coffee, Star } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Hook - Problem + Personal Connection */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🎭</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            The Problem with Language Learning Apps
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            They teach you to order coffee, but not to confess your feelings in the rain. 
            They give you vocabulary, but not the cultural soul that makes conversations feel real.
          </p>
          <div className="bg-blue-50 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-gray-700">
              <strong>I'm building TaiwanScript</strong> because after 10+ years of learning Chinese through Taiwanese dramas, 
              I realized the most effective language learning happens when you're emotionally invested in the story.
            </p>
          </div>
        </div>

        {/* The Insight - Product Thinking */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">The Core Insight</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-50 rounded-xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Engagement Problem</h3>
              <p className="text-sm text-gray-600">
                95% of language app users drop off within 6 months. Traditional gamification isn't enough.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <Heart className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Emotional Connection</h3>
              <p className="text-sm text-gray-600">
                People learn 3x faster when emotionally invested. Drama creates natural emotional hooks.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Cultural Context Gap</h3>
              <p className="text-sm text-gray-600">
                Language without culture creates awkward interactions. Context is everything.
              </p>
            </div>
          </div>
        </div>

        {/* My Background - Credibility */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Why I'm Building This</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-500" />
                Product Experience
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Product Manager in tech with user-centric design experience</li>
                <li>• Built features used by millions of users</li>
                <li>• Expertise in AI/ML product integration and community platforms</li>
                <li>• Data-driven approach to user engagement and retention</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-500" />
                Cultural Insight
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 10+ years learning Chinese, lived in Shanghai and Taiwan (1+ year)</li>
                <li>• Deep understanding of Taiwanese culture through immersion</li>
                <li>• Personally experienced the gap between textbook and real conversation</li>
                <li>• Bilingual content creation and cultural bridging experience</li>
              </ul>
              
              <div className="mt-4 bg-pink-50 rounded-lg p-4 border-l-4 border-pink-400">
                <p className="text-sm text-gray-700 italic">
                  <strong>Personal confession:</strong> I secretly dreamed of being an actor in Taiwanese dramas. 
                  Spent countless hours practicing lines from "The Apple of My Eye" and "In Time With You" in my room, 
                  imagining myself in those beautifully shot Taipei scenes. Never became an actor, but that dream taught me 
                  how emotional investment accelerates language learning.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Product Strategy */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Product Strategy</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                <Clapperboard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Drama-Based Learning Architecture</h3>
                <p className="text-gray-600 text-sm">
                  Each scenario mirrors real Taiwanese drama situations - family dinners, workplace tension, romantic moments. 
                  Users practice in emotionally engaging contexts that mirror real-life usage.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">AI-Powered Cultural Feedback</h3>
                <p className="text-gray-600 text-sm">
                  Beyond grammar correction - AI evaluates cultural appropriateness, emotional tone, and contextual accuracy. 
                  Helps users sound natural, not just correct.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Social Learning Network</h3>
                <p className="text-gray-600 text-sm">
                  Shareable progress, community challenges, and peer feedback. 
                  Language learning becomes social media content, not homework.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status & Metrics */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Current Status
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">MVP Status:</span>
                <span className="font-medium text-green-600">Chapter 1 Live</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Core Features:</span>
                <span className="font-medium">Voice Practice + Games</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">User Feedback:</span>
                <span className="font-medium text-blue-600">Actively Collecting</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Release:</span>
                <span className="font-medium">Chapter 2 + Social Features</span>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Learning Metrics
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Session:</span>
                <span className="font-medium">12+ minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phrase Retention:</span>
                <span className="font-medium text-green-600">85%+ in testing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cultural Accuracy:</span>
                <span className="font-medium">Validated by native speakers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fun Factor:</span>
                <span className="font-medium text-purple-600">High user excitement</span>
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
            If this resonates with you, give it a try. It's rough around the edges, but that's where the best feedback comes from.
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