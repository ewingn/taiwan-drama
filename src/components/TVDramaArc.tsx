'use client'

import React, { useState } from 'react'
import { ArrowRight, Play, Mic } from 'lucide-react'

interface Scene {
  title: string
  description: string
  vocabulary: string[]
  scenario: string
}

interface TVDramaArcProps {
  onBack: () => void
}

const TVDramaArc: React.FC<TVDramaArcProps> = ({ onBack }) => {
  const [currentScene, setCurrentScene] = useState(0)
  const [showScript, setShowScript] = useState(false)

  const scenes: Scene[] = [
    {
      title: "Meeting at the Coffee Shop",
      description: "Your character accidentally bumps into their future love interest",
      vocabulary: ["對不起 (duìbuqǐ) - Sorry", "沒關係 (méiguānxi) - It's okay", "咖啡 (kāfēi) - Coffee"],
      scenario: "You're rushing to meet a friend when you accidentally bump into someone..."
    },
    {
      title: "The Misunderstanding",
      description: "A classic drama miscommunication creates tension",
      vocabulary: ["誤會 (wùhuì) - Misunderstanding", "解釋 (jiěshì) - Explain", "生氣 (shēngqì) - Angry"],
      scenario: "You see your love interest with someone else and jump to conclusions..."
    },
    {
      title: "The Confession",
      description: "The emotional climax where feelings are revealed",
      vocabulary: ["喜歡 (xǐhuān) - Like", "愛 (ài) - Love", "心 (xīn) - Heart"],
      scenario: "It's raining, and you finally decide to tell them how you feel..."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-red-600 hover:text-red-700 mb-8"
        >
          <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
          Back to Arcs
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TV Drama Arc: Romance in Taipei
          </h1>
          <p className="text-xl text-gray-600">
            Live out classic Taiwanese drama tropes while mastering essential vocabulary and phrases
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Scene Progress</span>
            <span>{currentScene + 1} of {scenes.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Scene */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Scene {currentScene + 1}: {scenes[currentScene].title}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowScript(!showScript)}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
              >
                {showScript ? 'Hide' : 'Show'} Script
              </button>
              <button className="bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
                <Mic className="w-4 h-4 inline mr-2" />
                Practice
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{scenes[currentScene].description}</p>

          {/* Vocabulary Section */}
          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-yellow-800">Key Vocabulary</h3>
            <div className="grid gap-3">
              {scenes[currentScene].vocabulary.map((word, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="font-medium">{word}</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Play size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Script Section */}
          {showScript && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Interactive Script</h3>
              <div className="space-y-4">
                <div className="bg-blue-100 rounded-lg p-4">
                  <strong>Your Character:</strong> *rushes with coffee in hand*
                  <div className="mt-2 text-sm text-gray-600">
                    Practice saying: "不好意思，我趕時間！" (Bùhǎoyìsi, wǒ gǎn shíjiān!)
                  </div>
                </div>
                <div className="bg-pink-100 rounded-lg p-4">
                  <strong>Love Interest:</strong> "小心一點！" (Xiǎoxīn yīdiǎn!)
                </div>
                <div className="bg-blue-100 rounded-lg p-4">
                  <strong>Your Character:</strong> 
                  <select className="ml-2 border rounded px-2 py-1">
                    <option>Choose your response...</option>
                    <option>對不起！(Sorry!)</option>
                    <option>沒看到你！(Didn't see you!)</option>
                    <option>你沒事吧？(Are you okay?)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentScene(Math.max(0, currentScene - 1))}
              disabled={currentScene === 0}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous Scene
            </button>
            <button
              onClick={() => setCurrentScene(Math.min(scenes.length - 1, currentScene + 1))}
              disabled={currentScene === scenes.length - 1}
              className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Scene
            </button>
          </div>
        </div>

        {/* AI Chat Practice */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Practice with AI Character</h3>
          <p className="text-gray-600 mb-6">
            Ready to test your skills? Chat with the AI character using the vocabulary and phrases you've learned.
          </p>
          <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all">
            Start AI Conversation
          </button>
        </div>
      </div>
    </div>
  )
}

export default TVDramaArc