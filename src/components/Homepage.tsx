'use client'

import React, { useState } from 'react'
import { Play, BookOpen, Users, MessageCircle, Star, Mic, Globe, Heart, Eye, CheckCircle, Youtube, Coffee, Code } from 'lucide-react'

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('learners')

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Audience Toggle */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-full p-1 flex">
              <button
                onClick={() => setActiveTab('learners')}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                  activeTab === 'learners' 
                    ? 'bg-red-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                🌍 Learning Chinese
              </button>
              <button
                onClick={() => setActiveTab('taiwanese')}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                  activeTab === 'taiwanese' 
                    ? 'bg-red-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                🇹🇼 台灣朋友
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Learners */}
      {activeTab === 'learners' && (
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
                <a 
                  href="/learn"
                  className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <Play className="mr-2" size={20} />
                  Start Your Journey
                </a>
                <button className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section - Taiwanese */}
      {activeTab === 'taiwanese' && (
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                我最羞恥的
                <span className="text-red-600 block">中文學習秘密</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                我學中文是因為台灣朋友，但狂看台劇練習和學生詞。我有個超羞恥的秘密夢想：
                當八點檔演員！現在我做了個網站讓大家都能「演」中文。
              </p>
              
              {/* Taiwanese Cultural Pride */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 max-w-4xl mx-auto mb-8 border border-red-200">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">👫</div>
                    <h3 className="font-bold text-gray-800">台灣朋友啟蒙</h3>
                    <p className="text-sm text-gray-600">因為台灣朋友開始學中文</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">📺</div>
                    <h3 className="font-bold text-gray-800">狂看台劇練習</h3>
                    <p className="text-sm text-gray-600">《我可能不會愛你》《惡作劇之吻》《那些年》</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎭</div>
                    <h3 className="font-bold text-gray-800">羞恥的秘密夢想</h3>
                    <p className="text-sm text-gray-600">想當八點檔演員（超級尷尬）</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-red-100">
                  <h3 className="font-bold text-gray-800 mb-3">🎬 結果？我當然沒成為演員啦！</h3>
                  <p className="text-gray-700 mb-4">
                    我連自我介紹都忘詞，聲調聽起來像Siri喝珍奶嗆到。但現在我做了個網站，
                    讓每個人都能「演」中文！互動劇本、遊戲、AI對話 - 缺的就是你的表演！
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">🎭 實現演員夢</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">📺 經典台劇場景</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">😅 自嘲幽默</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">🎮 好玩有趣</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/learn"
                  className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <Eye className="mr-2" size={20} />
                  看看怎麼玩
                </a>
                <a
                  href="https://www.youtube.com/@YouYong%E8%AF%B4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center"
                >
                  <Youtube className="mr-2" size={20} />
                  追蹤開發過程
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

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

      {/* Features Section - Dynamic Based on Audience */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {activeTab === 'learners' ? 'Why TaiwanScript Works' : '為什麼這個想法特別'}
            </h2>
            <p className="text-xl text-gray-600">
              {activeTab === 'learners' 
                ? 'Experience authentic language learning through immersive storytelling'
                : '結合科技與文化，讓台灣故事感動全世界'}
            </p>
          </div>
          
          {activeTab === 'learners' ? (
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
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Heart className="text-red-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">文化軟實力</h3>
                <p className="text-gray-600">
                  讓全世界透過最真實的台灣故事，愛上我們的文化和語言
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Globe className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">國際能見度</h3>
                <p className="text-gray-600">
                  用科技讓台灣文化在國際舞台發光，每個使用者都是台灣大使
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Coffee className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">在地創新</h3>
                <p className="text-gray-600">
                  台灣人做給世界看的產品，結合本土情懷與國際視野
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Learning Arcs Preview - Universal */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {activeTab === 'learners' ? 'Choose Your Adventure' : '不同的台灣體驗'}
            </h2>
            <p className="text-xl text-gray-600">
              {activeTab === 'learners' 
                ? 'Multiple learning paths designed around authentic Taiwanese experiences'
                : '每個故事線都是台灣人的共同回憶'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/learn" className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-xl font-semibold mb-2">
                  {activeTab === 'learners' ? 'TV Drama' : '偶像劇情懷'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {activeTab === 'learners' 
                    ? 'Act out classic Taiwanese drama scenes'
                    : '重現那些讓我們心動的經典場景'}
                </p>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
                  {activeTab === 'learners' ? 'MVP Ready' : '搶先體驗'}
                </span>
              </div>
            </a>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🌃</div>
                <h3 className="text-xl font-semibold mb-2">
                  {activeTab === 'learners' ? 'Taipei Life' : '台北生活'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {activeTab === 'learners' 
                    ? 'Navigate daily life in Taipei city'
                    : '捷運、夜市、巷弄裡的溫暖故事'}
                </p>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  {activeTab === 'learners' ? 'Coming Soon' : '開發中'}
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🎤</div>
                <h3 className="text-xl font-semibold mb-2">
                  {activeTab === 'learners' ? 'KTV Night' : 'KTV之夜'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {activeTab === 'learners' 
                    ? 'Sing and socialize at karaoke'
                    : '最台灣的社交文化體驗'}
                </p>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  {activeTab === 'learners' ? 'Coming Soon' : '開發中'}
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🚲</div>
                <h3 className="text-xl font-semibold mb-2">
                  {activeTab === 'learners' ? 'Huandao' : '環島旅行'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {activeTab === 'learners' 
                    ? 'Cycle around Taiwan island'
                    : '用腳踏車看遍台灣之美'}
                </p>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  {activeTab === 'learners' ? 'Coming Soon' : '開發中'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Taiwanese-specific section */}
      {activeTab === 'taiwanese' && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 border border-red-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  📺 我的羞恥台劇史 + 開發過程
                </h2>
                <p className="text-xl text-gray-600">
                  在YouTube分享我這個尷尬的中文學習故事，還有如何把羞恥夢想變成有趣產品
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-xl p-6 border border-red-100">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Youtube className="w-5 h-5 text-red-600" />
                    尷尬回憶錄
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 我的中文聽起來像Siri嗆到珍奶</li>
                    <li>• 自我介紹都會忘詞的演員夢</li>
                    <li>• 《惡作劇之吻》《我可能不會愛你》追劇史</li>
                    <li>• 最近看《火神的眼淚》《華燈初上》心得</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-red-100">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    開發心路歷程
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 如何把羞恥夢想變成實際產品</li>
                    <li>• 台灣朋友們的爆笑反應</li>
                    <li>• 美國人做台劇遊戲的挑戰</li>
                    <li>• 讓大家都能「演」中文的技術實現</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://www.youtube.com/@YouYong%E8%AF%B4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  一起回味台灣美好
                </a>
                <p className="text-sm text-gray-600 mt-4">
                  分享我的台灣情緣，見證一個passion project的誕生
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Community CTA (FOOTER REPLACEMENT) */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            {activeTab === 'learners' 
              ? '🌍 Ready to Learn? Need the Code?' 
              : '🇹🇼 準備好了嗎？想看技術？'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {activeTab === 'learners'
              ? 'Start your journey or dive into the architecture used to build this AI platform.'
              : '立刻開始戲劇體驗，或探索我如何使用 Google ADK 實現這個羞恥的夢想。'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/learn"
              className="bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              {activeTab === 'learners' ? 'Start Learning Now' : '立即體驗'}
            </a>
            {/* 👇 Tech Stack link in the CTA section */}
            <a
              href="/tech-stack"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-red-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Code className="w-5 h-5" />
              {activeTab === 'learners' ? 'View Tech Architecture' : '技術架構 (Portfolio)'}
            </a>
            {/* 👆 */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage
