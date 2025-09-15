// src/components/games/VoicePracticeComponent.tsx
import React, { useState } from 'react'
import { Mic, MicOff, Send, Target, Award, ArrowRight } from 'lucide-react'

interface VoicePracticeProps {
  chapter: {
    id: number
    title: string
    voicePractice: {
      scenario: string
      objective: string
      keyPhrases: string[]
      culturalContext: string[]
      aiCharacterPrompt: string
      successCriteria: string[]
      affectionReward: number
    }
  }
  onComplete: (affectionReward: number) => void
}

interface Message {
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  emotion?: string
}

const VoicePracticeComponent: React.FC<VoicePracticeProps> = ({ chapter, onComplete }) => {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentScene, setCurrentScene] = useState(0)
  const [phraseUsage, setPhraseUsage] = useState<{ [phrase: string]: boolean }>({})
  const [affectionEarned, setAffectionEarned] = useState(0)
  const [inputText, setInputText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [conversationEnded, setConversationEnded] = useState(false)

  // Safety check
  if (!chapter || !chapter.voicePractice) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4 text-red-600">Voice Practice Error</h3>
        <p className="text-gray-600 mb-4">Unable to load voice practice data</p>
        <button onClick={() => onComplete(0)} className="bg-gray-600 text-white px-6 py-3 rounded-lg">
          Back to Chapter
        </button>
      </div>
    )
  }

  const scenePrompts = [
    {
      setup: "🎬 SCENE BEGINS",
      direction: `You are now IN CHARACTER as the nervous transfer student. Xiao Ai approaches you after class with a warm smile.`,
      cue: "ACTION! Remember to be genuine and use your key phrases naturally.",
      objective: "Build rapport and show cultural appreciation"
    },
    {
      setup: "🎭 SCENE DEVELOPMENT", 
      direction: "The conversation is flowing well. Xiao Ai is warming up to you and showing interest in your background.",
      cue: "Stay in character! Show your personality while practicing Chinese.",
      objective: "Deepen the connection and express gratitude"
    },
    {
      setup: "🌟 CLIMAX SCENE",
      direction: "This is your moment to make a lasting impression. Xiao Ai is genuinely interested in getting to know you better.",
      cue: "Give it your all! This determines how much affection you earn.",
      objective: "Create a memorable moment that advances your relationship"
    }
  ]

  const currentPrompt = scenePrompts[Math.min(currentScene, scenePrompts.length - 1)]

  const handlePhraseUsage = (text: string) => {
    let newAffection = 0
    chapter.voicePractice.keyPhrases.forEach((phrase: string) => {
      const chinesePart = phrase.split(' (')[0].split(' -')[0]
      if (text.includes(chinesePart) && !phraseUsage[chinesePart]) {
        setPhraseUsage(prev => ({ ...prev, [chinesePart]: true }))
        newAffection += 8
      }
    })
    
    if (newAffection > 0) {
      setAffectionEarned(prev => prev + newAffection)
    }
  }

  const simulateAIResponse = (userInput: string) => {
    handlePhraseUsage(userInput)
    
    // Simulate AI responses based on chapter context
    const responses = {
      1: [ // First Day
        "你的中文說得不錯！我很impressed！",
        "真的嗎？你覺得台灣怎麼樣？",
        "我很樂意幫你！我們可以一起練習中文。",
        "哇，美國一定很不一樣吧？",
        "你想要我教你一些台灣的話嗎？"
      ],
      2: [ // Secret Messages
        "哈哈，今天的數學課真的很無聊！",
        "你寫紙條的想法很有趣！",
        "我也想和你聊天，但要小心老師！",
        "想不想一起吃午餐？",
        "你真的很勇敢呢！"
      ]
    }

    const chapterResponses = responses[chapter.id as keyof typeof responses] || responses[1]
    const randomResponse = chapterResponses[Math.floor(Math.random() * chapterResponses.length)]
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: randomResponse,
        timestamp: new Date(),
        emotion: 'happy'
      }])
      
      if (messages.length >= 8) { // After several exchanges
        setCurrentScene(prev => Math.min(prev + 1, 2))
      }
      
      if (messages.length >= 12) { // End conversation after enough exchanges
        setTimeout(() => {
          setConversationEnded(true)
        }, 2000)
      }
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    setMessages(prev => [...prev, {
      type: 'user',
      content: inputText,
      timestamp: new Date()
    }])

    simulateAIResponse(inputText)
    setInputText('')
  }

  const calculateFinalScore = () => {
    const phrasesUsed = Object.values(phraseUsage).filter(Boolean).length
    const totalPhrases = chapter.voicePractice.keyPhrases.length
    const messageCount = messages.filter(m => m.type === 'user').length
    
    let bonus = 0
    if (phrasesUsed === totalPhrases) bonus += 15 // Perfect phrase usage
    if (messageCount >= 8) bonus += 10 // Good conversation length
    if (affectionEarned > 20) bonus += 5 // High engagement
    
    return Math.min(affectionEarned + bonus, chapter.voicePractice.affectionReward)
  }

  if (conversationEnded) {
    const finalScore = calculateFinalScore()
    const phrasesUsed = Object.values(phraseUsage).filter(Boolean).length
    const successRate = (phrasesUsed / chapter.voicePractice.keyPhrases.length) * 100

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-2xl font-bold mb-4 text-purple-600">🎭 Scene Complete!</h3>
        <div className="text-6xl mb-4">
          {successRate >= 90 ? '🌟' : successRate >= 70 ? '👏' : '👍'}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{phrasesUsed}/{chapter.voicePractice.keyPhrases.length}</div>
            <div className="text-sm text-blue-700">Key Phrases Used</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{messages.filter(m => m.type === 'user').length}</div>
            <div className="text-sm text-green-700">Messages Sent</div>
          </div>
          <div className="bg-pink-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-pink-600">+{finalScore}</div>
            <div className="text-sm text-pink-700">Affection Earned</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">Performance Summary:</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div>• Cultural Sensitivity: {successRate >= 80 ? 'Excellent' : successRate >= 60 ? 'Good' : 'Needs Work'}</div>
            <div>• Language Usage: {phrasesUsed >= 4 ? 'Natural' : 'Basic'}</div>
            <div>• Conversation Flow: {messages.length >= 10 ? 'Engaging' : 'Brief'}</div>
          </div>
        </div>

        <button
          onClick={() => onComplete(finalScore)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          Continue Story → +{finalScore} ❤️
        </button>
      </div>
    )
  }

  if (!sessionStarted) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
        {/* Acting Instructions */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl p-6 -m-6 mb-6">
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
            🎭 {chapter.title} - Voice Acting Scene
          </h3>
          <p className="opacity-90">Time to become an actor in your own Taiwanese drama!</p>
        </div>

        {/* Scene Brief */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
            🎬 Scene Briefing
          </h4>
          <div className="space-y-3 text-blue-700">
            <div><strong>Your Character:</strong> Nervous but sincere transfer student</div>
            <div><strong>Scene:</strong> {chapter.voicePractice.scenario}</div>
            <div><strong>Acting Goal:</strong> {chapter.voicePractice.objective}</div>
          </div>
        </div>

        {/* Director's Notes */}
        <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-200">
          <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
            📝 Director's Notes
          </h4>
          <div className="space-y-2">
            <div className="text-sm text-yellow-700">
              <strong>Character Motivation:</strong> You want to fit in and make a good impression while staying true to yourself.
            </div>
            <div className="text-sm text-yellow-700">
              <strong>Emotional Arc:</strong> Start nervous, build confidence, end with genuine connection.
            </div>
          </div>
        </div>

        {/* Script Elements */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Key Lines */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
              🎯 Key Lines to Deliver
            </h4>
            <div className="space-y-2">
              {chapter.voicePractice.keyPhrases.map((phrase: string, index: number) => (
                <div key={index} className="bg-white rounded p-3 border border-green-100">
                  <div className="font-medium text-green-700 text-sm">{phrase}</div>
                  <div className="text-xs text-green-600 mt-1">+8 ❤️ for natural delivery</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Context */}
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
              🏮 Cultural Acting Notes
            </h4>
            <div className="space-y-2">
              {chapter.voicePractice.culturalContext.map((note: string, index: number) => (
                <div key={index} className="text-sm text-purple-700 flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>{note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Goals */}
        <div className="bg-pink-50 rounded-lg p-4 mb-6 border border-pink-200">
          <h4 className="font-bold text-pink-800 mb-3">🎯 Performance Goals</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {chapter.voicePractice.successCriteria.map((criteria: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-pink-700">
                <Target className="w-4 h-4" />
                <span>{criteria}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => setSessionStarted(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
        >
          🎬 Lights, Camera, Action!
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-purple-200 flex flex-col h-[700px]">
      {/* Scene Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">👩‍🎓</div>
            <div>
              <h3 className="font-bold">{currentPrompt.setup}</h3>
              <p className="text-sm opacity-90">Scene with Xiao Ai</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
              ❤️ +{affectionEarned}
            </div>
            <button 
              onClick={() => setConversationEnded(true)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded p-1"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Director's Cue */}
      <div className="bg-yellow-50 border-b p-3">
        <div className="text-sm">
          <strong className="text-yellow-800">🎭 Director:</strong> 
          <span className="text-yellow-700"> {currentPrompt.direction}</span>
        </div>
        <div className="text-xs text-yellow-600 mt-1">
          <strong>Current Objective:</strong> {currentPrompt.objective}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Scene Start */}
        <div className="text-center text-sm text-gray-500 bg-gray-50 rounded p-2">
          🎬 {currentPrompt.cue}
        </div>

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-xl p-3 ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-pink-100 text-pink-800 border border-pink-200'
            }`}>
              <div className="flex items-start gap-2">
                {message.type === 'ai' && <span className="text-lg">👩‍🎓</span>}
                {message.type === 'user' && <span className="text-lg">🧑‍🎓</span>}
                <div className="flex-1">
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center text-gray-500 bg-blue-50 rounded-lg p-6">
            <div className="text-4xl mb-2">👩‍🎓</div>
            <div className="text-sm">Xiao Ai is waiting for you to start the conversation...</div>
            <div className="text-xs text-blue-600 mt-1">Remember your key phrases!</div>
          </div>
        )}
      </div>

      {/* Performance Tracker */}
      <div className="border-t bg-gray-50 p-3">
        <div className="text-xs font-semibold text-gray-600 mb-2">Acting Performance:</div>
        <div className="flex flex-wrap gap-1">
          {chapter.voicePractice.keyPhrases.map((phrase: string, index: number) => {
            const chinesePart = phrase.split(' (')[0].split(' -')[0]
            const used = phraseUsage[chinesePart]
            return (
              <span key={index} className={`text-xs px-2 py-1 rounded-full ${
                used ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'
              }`}>
                {used ? '✓' : '○'} {chinesePart}
              </span>
            )
          })}
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Delivered: {Object.values(phraseUsage).filter(Boolean).length}/{chapter.voicePractice.keyPhrases.length} key lines
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isRecording ? 'bg-red-500 animate-pulse' : 'bg-red-500 hover:bg-red-600'
            } text-white`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Deliver your lines in Chinese... (在這裡用中文說話)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={2}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="flex-shrink-0 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
          🎭 Stay in character and deliver your lines naturally for maximum affection points!
        </div>
      </div>
    </div>
  )
}

export default VoicePracticeComponent