// src/components/games/VoicePracticeComponent.tsx
import React, { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Send, X, Volume2, ArrowRight, Sparkles, MessageCircle } from 'lucide-react'
import { AgentClient, type AgentSession } from '@/lib/adk-client/agent-client'
import type { StoryChapter } from '@/types'
import { getAuth } from 'firebase/auth'

interface VoicePracticeProps {
  chapter: StoryChapter | null
  onComplete: (affectionReward: number) => void
}

interface Message {
  type: 'user' | 'ai'
  content: string
  pinyin?: string
  english?: string
  timestamp: Date
  emotion?: string
  audioUrl?: string
  affectionEarned?: number
}

const VoicePracticeComponent: React.FC<VoicePracticeProps> = ({ chapter, onComplete }) => {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [phraseUsage, setPhraseUsage] = useState<{ [phrase: string]: boolean }>({})
  const [affectionEarned, setAffectionEarned] = useState(0)
  const [inputText, setInputText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isAIThinking, setIsAIThinking] = useState(false)
  const [conversationEnded, setConversationEnded] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [showEnglishTranslation, setShowEnglishTranslation] = useState<number[]>([])
  const [agentSession, setAgentSession] = useState<AgentSession | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [agentError, setAgentError] = useState<string | null>(null)
  
  const audioChunks = useRef<Blob[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get current user
  useEffect(() => {
    const auth = getAuth()
    const currentUser = auth.currentUser
    if (currentUser) {
      setUserId(currentUser.uid)
    }
  }, [])

  // Initialize agent session
  useEffect(() => {
    if (chapter && sessionStarted && !agentSession && userId) {
      initializeAgent()
    }
  }, [chapter, sessionStarted, userId])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const initializeAgent = async () => {
    if (!chapter || !userId) return
    
    setIsAIThinking(true)
    setAgentError(null)
    
    try {
      const session = await AgentClient.startConversation(userId, chapter)
      setAgentSession(session)
      
      // The agent will automatically send a greeting
      // We'll wait for the first response via message sending
      setIsAIThinking(false)
      
      // Trigger initial greeting
      setTimeout(() => {
        handleInitialGreeting(session)
      }, 500)
      
    } catch (error) {
      console.error('Failed to initialize agent:', error)
      setAgentError('Failed to connect to Xiao Ai. Please try again.')
      setIsAIThinking(false)
    }
  }

  const handleInitialGreeting = async (session: AgentSession) => {
    try {
      // Send a system message to get the greeting
      const response = await session.sendMessage('[SYSTEM: Please greet the student]')
      
      const greeting = parseAgentResponse(response.text)
      setMessages([{
        type: 'ai',
        content: greeting.chinese,
        pinyin: greeting.pinyin,
        english: greeting.english,
        timestamp: new Date(),
        emotion: 'friendly',
        affectionEarned: 0,
      }])
    } catch (error) {
      console.error('Failed to get initial greeting:', error)
      // Fallback greeting
      setMessages([{
        type: 'ai',
        content: '嗨！我是小愛。很高興見到你！',
        pinyin: 'hāi! wǒ shì xiǎo ài. hěn gāoxìng jiàn dào nǐ!',
        english: 'Hi! I\'m Xiao Ai. Nice to meet you!',
        timestamp: new Date(),
        emotion: 'friendly',
        affectionEarned: 0,
      }])
    }
  }

  const parseAgentResponse = (responseText: string) => {
    // Try to parse structured response from agent
    // Agent should respond in format:
    // Chinese text
    // [PINYIN: pinyin text]
    // [ENGLISH: english text]
    
    const lines = responseText.split('\n').filter(line => line.trim())
    
    let chinese = ''
    let pinyin = ''
    let english = ''
    
    for (const line of lines) {
      if (line.startsWith('[PINYIN:')) {
        pinyin = line.replace('[PINYIN:', '').replace(']', '').trim()
      } else if (line.startsWith('[ENGLISH:')) {
        english = line.replace('[ENGLISH:', '').replace(']', '').trim()
      } else if (!line.startsWith('[')) {
        chinese += line + ' '
      }
    }
    
    // If no structured format, use the whole text as chinese
    if (!chinese) {
      chinese = responseText
    }
    
    return { chinese: chinese.trim(), pinyin, english }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim() || isAIThinking || !agentSession) return
    
    const userMessage: Message = {
      type: 'user',
      content: inputText,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsAIThinking(true)
    
    try {
      const response = await agentSession.sendMessage(inputText)
      
      // Parse the agent's response
      const parsed = parseAgentResponse(response.text)
      
      // Check for tool results (like affection updates)
      let affectionFromTools = 0
      if (response.tool_results) {
        response.tool_results.forEach((result: any) => {
          if (result.success && result.change) {
            affectionFromTools += result.change
          }
        })
      }
      
      const aiMessage: Message = {
        type: 'ai',
        content: parsed.chinese,
        pinyin: parsed.pinyin,
        english: parsed.english,
        timestamp: new Date(),
        emotion: 'supportive',
        affectionEarned: affectionFromTools,
      }
      
      setMessages(prev => [...prev, aiMessage])
      
      if (affectionFromTools > 0) {
        setAffectionEarned(prev => prev + affectionFromTools)
      }
      
      // Update phrase tracking
      if (chapter?.voicePractice?.keyPhrases) {
        chapter.voicePractice.keyPhrases.forEach(phrase => {
          const chinesePart = phrase.split('(')[0].trim()
          if (inputText.includes(chinesePart) && !phraseUsage[chinesePart]) {
            setPhraseUsage(prev => ({ ...prev, [chinesePart]: true }))
          }
        })
      }
      
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages(prev => [...prev, {
        type: 'ai',
        content: '對不起，我現在有點困難回應。可以再試一次嗎？',
        pinyin: 'duìbuqǐ, wǒ xiànzài yǒudiǎn kùnnán huíyìng. kěyǐ zài shì yīcì ma?',
        english: 'Sorry, I\'m having trouble responding right now. Can you try again?',
        timestamp: new Date(),
        emotion: 'apologetic'
      }])
    } finally {
      setIsAIThinking(false)
    }
  }

  const handleMicrophoneToggle = async () => {
    if (isRecording) {
      mediaRecorder?.stop()
      setIsRecording(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        
        recorder.ondataavailable = (event) => {
          audioChunks.current.push(event.data)
        }
        
        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' })
          audioChunks.current = []
          
          // Convert to base64 and send to speech-to-text
          const reader = new FileReader()
          reader.onloadend = () => {
            const base64Audio = (reader.result as string).split(',')[1]
            // For now, show placeholder
            setInputText('[Voice input - processing...]')
          }
          reader.readAsDataURL(audioBlob)
        }
        
        recorder.start()
        setMediaRecorder(recorder)
        setIsRecording(true)
      } catch (err) {
        console.error('Microphone access denied:', err)
        alert('Please enable microphone access to use voice practice.')
      }
    }
  }

  const handleEndConversation = async () => {
    if (agentSession) {
      try {
        await agentSession.end()
      } catch (error) {
        console.error('Failed to end session:', error)
      }
    }
    setConversationEnded(true)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Safety check for chapter data
  if (!chapter || !chapter.voicePractice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md mx-auto border border-purple-100">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Scene Unavailable
          </h3>
          <p className="text-gray-600 mb-6">This voice practice scene couldn't be loaded.</p>
          <button 
            onClick={() => onComplete(0)} 
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-gray-600 hover:to-gray-700 hover:shadow-xl transition-all"
          >
            Return to Story
          </button>
        </div>
      </div>
    )
  }

  if (conversationEnded) {
    const phrasesUsed = Object.values(phraseUsage).filter(Boolean).length
    const successRate = (phrasesUsed / chapter.voicePractice.keyPhrases.length) * 100
    const messageCount = messages.filter(m => m.type === 'user').length

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-2xl mx-auto border-2 border-purple-200">
          <div className="text-8xl mb-6 animate-bounce">
            {successRate >= 90 ? '🌟' : successRate >= 70 ? '👏' : '👍'}
          </div>
          <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Scene Complete!
          </h3>
          <p className="text-gray-600 mb-8">Your performance with Xiao Ai</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">{phrasesUsed}/{chapter.voicePractice.keyPhrases.length}</div>
              <div className="text-sm text-blue-700 font-medium">Key Phrases Used</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">{messageCount}</div>
              <div className="text-sm text-green-700 font-medium">Messages Exchanged</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border border-pink-200 shadow-md">
              <div className="text-3xl font-bold text-pink-600 mb-2">+{affectionEarned}</div>
              <div className="text-sm text-pink-700 font-medium">Affection Earned</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border border-purple-200">
            <h4 className="font-bold text-gray-800 mb-4">Performance Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className={`text-2xl mb-2 ${successRate >= 80 ? 'text-green-500' : successRate >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {successRate >= 80 ? '🎯' : successRate >= 60 ? '👌' : '📈'}
                </div>
                <div className="font-medium">Cultural Sensitivity</div>
                <div className="text-gray-600">{successRate >= 80 ? 'Excellent' : successRate >= 60 ? 'Good' : 'Improving'}</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl mb-2 ${phrasesUsed >= 4 ? 'text-green-500' : 'text-yellow-500'}`}>
                  {phrasesUsed >= 4 ? '🗣️' : '💬'}
                </div>
                <div className="font-medium">Language Usage</div>
                <div className="text-gray-600">{phrasesUsed >= 4 ? 'Natural' : 'Developing'}</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl mb-2 ${messageCount >= 10 ? 'text-green-500' : 'text-yellow-500'}`}>
                  {messageCount >= 10 ? '💫' : '⚡'}
                </div>
                <div className="font-medium">Engagement</div>
                <div className="text-gray-600">{messageCount >= 10 ? 'Captivating' : 'Solid'}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onComplete(affectionEarned)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:scale-105 transition-all shadow-lg"
          >
            Continue Your Story → +{affectionEarned} ❤️
          </button>
        </div>
      </div>
    )
  }

  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🎭</div>
                <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{chapter.title}</h2>
                <p className="text-xl opacity-90">Voice Acting Scene</p>
              </div>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                  🎬 Your Scene
                </h3>
                <p className="text-blue-700 mb-4">{chapter.voicePractice.scenario}</p>
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <div className="text-sm font-semibold text-blue-800 mb-2">🎯 Your Goal:</div>
                  <div className="text-blue-700">{chapter.voicePractice.objective}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6 border border-green-200">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                    🎯 Your Lines ({chapter.voicePractice.keyPhrases.length} phrases)
                  </h3>
                  <div className={`transform transition-transform ${showDetails ? 'rotate-90' : ''}`}>
                    <ArrowRight className="w-5 h-5 text-green-800" />
                  </div>
                </button>
                
                {showDetails && (
                  <div className="mt-4 space-y-3">
                    {chapter.voicePractice.keyPhrases.map((phrase: string, index: number) => (
                      <div key={index} className="bg-white rounded-xl p-4 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="font-medium text-green-700">{phrase}</div>
                        <div className="text-xs text-green-600 mt-1">+8 ❤️ for natural delivery</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-8 border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  🏮 Cultural Acting Tips
                </h3>
                <div className="space-y-2">
                  {chapter.voicePractice.culturalContext.slice(0, 2).map((tip: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-yellow-700 text-sm">{tip}</div>
                    </div>
                  ))}
                </div>
              </div>

              {!userId && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-800 text-sm">⚠️ Please sign in to use voice practice</p>
                </div>
              )}

              <button
                onClick={() => setSessionStarted(true)}
                disabled={!userId}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-6 h-6" />
                🎬 Begin Your Scene with AI Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col h-full overflow-hidden border-2 border-purple-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="text-2xl">👩‍🎓</div>
              <div>
                <h3 className="font-bold drop-shadow-md">Conversation with Xiao Ai (AI Agent)</h3>
                <p className="text-sm opacity-90">{chapter.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-medium backdrop-blur-sm">
                ❤️ +{affectionEarned}
              </div>
              <button 
                onClick={handleEndConversation}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Error Display */}
          {agentError && (
            <div className="bg-red-50 border-b border-red-200 p-3">
              <div className="text-sm text-red-800 text-center">
                ⚠️ {agentError}
              </div>
            </div>
          )}

          {/* Phrase Progress */}
          {Object.keys(phraseUsage).length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b p-3 border-yellow-200">
              <div className="text-xs flex items-center justify-between">
                <span className="font-semibold text-yellow-800">
                  💬 Key Phrases: {Object.values(phraseUsage).filter(Boolean).length}/{chapter.voicePractice.keyPhrases.length}
                </span>
                <span className="text-yellow-700">
                  Keep practicing!
                </span>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && !isAIThinking && (
              <div className="text-center py-12">
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute inset-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-3xl">👩‍🎓</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Connecting to Xiao Ai Agent...</h3>
                <p className="text-gray-600">Powered by Google Vertex AI</p>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-4 shadow-blue-200' 
                      : 'bg-gradient-to-r from-pink-50 to-purple-50 text-gray-800 mr-4 border-2 border-pink-100 shadow-pink-100'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl flex-shrink-0">
                        {message.type === 'user' ? '🧑‍🎓' : '👩‍🎓'}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium mb-1">{message.content}</div>
                        {message.pinyin && <div className={`text-sm ${message.type === 'user' ? 'text-white opacity-75' : 'text-gray-500'}`}>{message.pinyin}</div>}
                        {message.english && showEnglishTranslation.includes(index) && (
                          <div className={`mt-1 text-sm ${message.type === 'user' ? 'text-white opacity-90' : 'text-gray-600'}`}>{message.english}</div>
                        )}
                        <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-white opacity-75' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                        {message.affectionEarned && message.affectionEarned > 0 && (
                          <div className="mt-2 text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full inline-block">
                            +{message.affectionEarned} ❤️
                          </div>
                        )}
                      </div>
                      {message.english && message.type === 'ai' && (
                        <button
                          onClick={() => {
                            if (showEnglishTranslation.includes(index)) {
                              setShowEnglishTranslation(showEnglishTranslation.filter(i => i !== index));
                            } else {
                              setShowEnglishTranslation([...showEnglishTranslation, index]);
                            }
                          }}
                          className="text-xs text-purple-600 hover:text-purple-700 px-2 py-1 rounded-full bg-white bg-opacity-70 ml-2 hover:bg-opacity-100 transition-all"
                        >
                          {showEnglishTranslation.includes(index) ? 'Hide' : 'Translate'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {isAIThinking && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 mr-4 border-2 border-pink-100 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                      <div className="absolute inset-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-75 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-50 animate-pulse" style={{animationDelay: '0.6s'}}></div>
                      <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
                        <span className="text-lg">👩‍🎓</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 font-medium">Xiao Ai is thinking...</div>
                      <div className="text-xs text-gray-500">Agent processing your message</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Phrase Tracker */}
          <div className="border-t bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-700">Key Phrases Progress</div>
              <div className="text-xs text-gray-500">
                {Object.values(phraseUsage).filter(Boolean).length}/{chapter.voicePractice.keyPhrases.length} used
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {chapter.voicePractice.keyPhrases.map((phrase: string, index: number) => {
                const chinesePart = phrase.split(' (')[0].split(' -')[0]
                const used = phraseUsage[chinesePart]
                return (
                  <span key={index} className={`text-xs px-3 py-1 rounded-full transition-all ${
                    used ? 'bg-green-100 text-green-800 border border-green-200 shadow-sm' : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}>
                    {used ? '✓' : '○'} {chinesePart}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t p-4 bg-white">
            <div className="flex items-end gap-3">
              <button
                onClick={handleMicrophoneToggle}
                disabled={isAIThinking}
                className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isRecording 
                    ? 'bg-red-500 shadow-lg shadow-red-200 animate-pulse' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:scale-105'
                } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="用中文說話... (Speak in Chinese)"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-gray-50 text-gray-800 placeholder-gray-500 shadow-inner"
                  rows={2}
                  disabled={isAIThinking}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isAIThinking}
                className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-3 text-center">
              <div className="text-xs text-gray-500 flex items-center justify-center gap-2">
                <Sparkles className="w-3 h-3" />
                🤖 Powered by Google Vertex AI Agent Development Kit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoicePracticeComponent