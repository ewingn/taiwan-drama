'use client'

import React from 'react'
import Link from 'next/link'
import { Heart, Globe, Award, Youtube, MapPin, Clapperboard, Code, Users } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🎭✨</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            The Secret Dream That Became Reality
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            What happens when a tech PM's secret obsession with Taiwanese dramas meets 10+ years of Chinese learning? 
            You get TaiwanScript – where language learning meets drama acting dreams! 🎬
          </p>
        </div>

        {/* Personal Story */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">My Confession 🤫</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-pink-600 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  The Drama Addiction Started Early
                </h3>
                <p className="text-gray-700">
                  Over 10 years ago, I discovered Taiwanese dramas and completely fell down the rabbit hole. 
                  <strong> "The Apple of My Eye"</strong> and <strong>"In Time With You"</strong> weren't just entertainment – 
                  they were my Chinese teachers! I'd pause, rewind, and secretly mimic every line, every expression, every dramatic pause.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                  <Clapperboard className="w-5 h-5" />
                  The Secret Actor Dreams
                </h3>
                <p className="text-gray-700">
                  Here's my embarrassing confession: I secretly dreamed of being a Taiwanese drama actor! 🙈 
                  I'd practice emotional scenes in my room, memorize sentence patterns, and imagine myself 
                  in those beautifully shot Taipei cafes having deep conversations about life and love.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-green-600 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Living the Dream (Sort Of)
                </h3>
                <p className="text-gray-700">
                  I spent time in Shanghai and lived in Taiwan for over a year – finally experiencing those 
                  night markets, MRT rides, and bubble tea shops I'd seen in dramas! Every cultural moment 
                  felt like déjà vu from my favorite shows. Recently, I've been binging "Victims Game" and "Light the Night" 
                  and the obsession continues! 
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-purple-600 mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  When Tech Meets Passion
                </h3>
                <p className="text-gray-700">
                  As a Product Manager in tech, I love building things that combine my passions: 
                  language learning, community building, and now AI tools. When I realized I could create 
                  a platform where others could live out their drama actor dreams while learning Chinese, 
                  I knew I had to build it!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Mission */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why TaiwanScript Exists</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="text-red-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">For the Secret Dreamers</h3>
              <p className="text-sm text-gray-600">
                Every language learner who's ever wanted to BE the character, not just watch them
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Community & Fun</h3>
              <p className="text-sm text-gray-600">
                Language learning should be social, shareable, and genuinely entertaining
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="text-green-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Real Cultural Immersion</h3>
              <p className="text-sm text-gray-600">
                Authentic scenarios that help you actually understand Taiwan, not just the language
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>TaiwanScript is my love letter to everyone who's ever fallen in love with a culture through its stories.</strong> 
              It's for the language learners who want to do more than just memorize vocabulary – 
              who want to <em>live</em> the language, <em>feel</em> the culture, and maybe fulfill that secret dream 
              of being the protagonist in their own Taiwanese drama! 🌟
            </p>
          </div>
        </div>

        {/* Personal Touch */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">The Real Talk 💭</h2>
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-lg text-gray-700">
              Look, I never did become that Taiwanese drama actor (probably for the best! 😅), 
              but I never lost that passion. Building TaiwanScript lets me satisfy that craving while 
              creating something that brings joy to other language learners.
            </p>
            
            <p className="text-lg text-gray-700">
              This is absolutely a personal portfolio project – I'm a tech PM who loves building things! 
              But it's also my genuine attempt to create something that both language learners AND 
              Taiwanese audiences can enjoy and be proud of.
            </p>
            
            <div className="bg-white rounded-xl p-6 mt-8">
              <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center justify-center gap-2">
                <Youtube className="w-6 h-6" />
                Let's Build This Together!
              </h3>
              <p className="text-gray-700 mb-4">
                I share my journey and thoughts about this project on my YouTube channel. 
                I'd love your feedback on what we should build next! Every comment, suggestion, 
                and idea helps shape TaiwanScript into something amazing.
              </p>
              <a 
                href="https://www.youtube.com/@YouYong%E8%AF%B4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
                Visit My Channel
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Live Your Drama Dreams? 🎭
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're a fellow drama addict, a serious language learner, or someone who just wants 
            to try something fun and different – let's make your Chinese learning journey unforgettable!
          </p>
          <Link 
            href="/learn"
            className="inline-block bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Your Drama Journey ✨
          </Link>
        </div>

        {/* Fun Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="text-3xl font-bold text-blue-600">10+</div>
            <div className="text-sm text-blue-700">Years Learning Chinese</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="text-3xl font-bold text-green-600">100s</div>
            <div className="text-sm text-green-700">Dramas Watched</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="text-3xl font-bold text-purple-600">1+</div>
            <div className="text-sm text-purple-700">Years in Taiwan</div>
          </div>
          <div className="bg-pink-50 rounded-xl p-4">
            <div className="text-3xl font-bold text-pink-600">∞</div>
            <div className="text-sm text-pink-700">Secret Acting Dreams</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage