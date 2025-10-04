'use client'

import React from 'react'
import Link from 'next/link'
import { Heart, Youtube, MapPin, Clapperboard, Code, Target, Users, MessageCircle, TrendingUp, Zap, Coffee, Star } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        
        {/* Hook - Problem + Personal Connection */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🎭</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            The Problem with Language Learning Apps
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            They teach you to order coffee, but not to confess your feelings in the rain. 
            They give you vocabulary, but not the **cultural soul** that makes conversations feel real.
          </p>
          <div className="bg-blue-50 rounded-xl p-6 max-w-2xl mx-auto shadow-sm">
            <p className="text-gray-700">
              <strong>I'm building TaiwanScript</strong> because after 10+ years of learning Chinese through Taiwanese dramas, 
              I realized the most effective language learning happens when you're emotionally invested in the story.
            </p>
          </div>
        </div>

        {/* The Insight - Product Thinking */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-red-600">The Core Product Insights</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-50 rounded-xl p-6 text-center shadow-sm">
              <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Engagement Problem</h3>
              <p className="text-sm text-gray-600">
                95% of language app users drop off quickly. Traditional gamification isn't enough to sustain engagement.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 text-center shadow-sm">
              <Heart className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Emotional Connection</h3>
              <p className="text-sm text-gray-600">
                People learn 3x faster when emotionally invested. Drama creates natural emotional hooks for high retention.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 text-center shadow-sm">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Cultural Context Gap</h3>
              <p className="text-sm text-gray-600">
                Language without culture leads to awkward interactions. We solve this by teaching authentic Taiwan dialogue.
              </p>
            </div>
          </div>
        </div>

        {/* My Background - Credibility */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Why I'm Qualified to Build This</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700">
                <Code className="w-5 h-5" />
                Platform & Product Expertise
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>**Product Manager** background focused on user-centric AI/ML product integration.</li>
                <li>Expertise in large-scale **community platforms** and managing deployment pipelines.</li>
                <li>Actively building portfolio in **Google ADK/Dialogflow** and secure cross-service architecture.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-700">
                <MapPin className="w-5 h-5" />
                Cultural & Language Depth
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>**10+ years** learning Chinese, with immersion experience in Taiwan.</li>
                <li>**Personal confession:** My goal was to be an actor in Taiwanese dramas, driving authentic practice.</li>
                <li>Deep insight into the gap between textbook Mandarin and **authentic Taiwanese usage**.</li>
              </ul>
              
              <div className="mt-6 bg-pink-50 rounded-lg p-4 border-l-4 border-pink-400">
                <p className="text-sm text-gray-700 italic">
                  Spent countless hours practicing lines from "In Time With You" and "The Apple of My Eye." That emotional investment is the core mechanic of this platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Foundation - Highly Prominent Link */}
        <div className="mb-16 bg-red-600/10 p-8 rounded-xl shadow-inner border border-red-200">
          <h2 className="text-3xl font-bold text-red-700 mb-4 flex items-center justify-center text-center">
            <Code className="w-8 h-8 mr-3" />
            Technical Foundation: ADK & Security
          </h2>
          <p className="text-gray-800 mb-6 text-lg text-center font-medium">
            This project is a functional demonstration of **secure polyglot architecture** and **Conversational AI (ADK)** at scale.
          </p>
          <div className="flex justify-center">
              <Link
                href="/tech-stack"
                className="inline-flex items-center px-8 py-3 border-2 border-red-600 text-base font-medium rounded-full shadow-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                <Code className="w-5 h-5 mr-2" />
                View Architecture & Technical Deep Dive
              </Link>
          </div>
        </div>
        {/* End Technical Foundation */}

        {/* Vision & Roadmap */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 mb-16 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Vision & Roadmap</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-3 text-purple-600">🎭</div>
              <h3 className="font-bold mb-2">Phase 1: Drama Immersion (MVP)</h3>
              <p className="text-sm text-gray-600">
                Complete romance storyline, secured AI conversations, and core ADK RAG tool validation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-3 text-blue-600">🌍</div>
              <h3 className="font-bold mb-2">Phase 2: Community Hub</h3>
              <p className="text-sm text-gray-600">
                Social features, user-generated content, community challenges, and progress sharing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-3 text-green-600">🚀</div>
              <h3 className="font-bold mb-2">Phase 3: Platform Scale</h3>
              <p className="text-sm text-gray-600">
                Multiple learning arcs (Taipei Life, KTV), and expansion to new language/culture combinations.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback CTA - The Most Important Section */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-8 shadow-xl">
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
              <ul className="text-sm space-y-1 opacity-90 list-disc list-inside">
                <li>Does this feel authentic to Taiwanese culture?</li>
                <li>What scenarios would you want to practice?</li>
                <li>How can we make it more social/shareable?</li>
                <li>What features would keep you coming back?</li>
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
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                Send Me Feedback
              </a>
              
              <a 
                href="https://www.youtube.com/@YouYong%E8%AF%B4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors inline-flex items-center justify-center gap-2 shadow-md"
              >
                <Youtube className="w-4 h-4" />
                YouTube Discussions
              </a>
            </div>
          </div>
        </div>

        {/* Personal Touch + CTA */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Coffee className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">Built with way too much coffee in Chicago</span>
          </div>
          
          <p className="text-gray-600 mb-6">
            If this resonates with you, give it a try. It's rough around the edges, but that's where the best feedback comes from.
          </p>
          
          <Link 
            href="/learn"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-xl"
          >
            Try TaiwanScript
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
