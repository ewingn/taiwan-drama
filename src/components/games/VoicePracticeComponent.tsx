// src/components/games/VoicePracticeComponent.tsx
import React, { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Send, X, Pause, Play, Volume2, ArrowRight } from 'lucide-react'
import { getAiResponse, shouldShowApiWarning } from '../../lib/aiApi'
import { storyChapters } from '../../data/storyChapters'
import type { DialogueLine } from '../../types'

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
  } | null
  onComplete: (affectionReward: number) => void
}

interface Message {
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  emotion?: string
  audioUrl?: string
}

const convertMessagesToDialogueLines = (messages: Message[]): DialogueLine[] => {
  return messages.map(msg => ({
    character: msg.type === 'user' ? '小明' : '小愛',
    avatar: msg.type === 'user' ? '🧑‍🎓' : '👩‍🎓',
    chinese: msg.content,
    pinyin: '',
    english: '',
    emotion: msg.emotion || 'normal',
  }));
};

const VoicePracticeComponent: React.FC<VoicePracticeProps> = ({ chapter, onComplete }) => {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentScene, setCurrentScene] = useState(0)
  const [phraseUsage, setPhraseUsage] = useState<{ [phrase: string]: boolean }>({})
  const [affectionEarned, setAffectionEarned] = useState(0)
  const [inputText, setInputText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isAIThinking, setIsAIThinking] = useState(false)
  const [conversationEnded, setConversationEnded] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])
  const [showApiWarning, setShowApiWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldShowApiWarning()) {
      setShowApiWarning(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages]);

  if (!chapter || !chapter.voicePractice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Scene Unavailable</h3>
          <p className="text-gray-600 mb-6">This voice practice scene couldn't be loaded.</p>
          <button 
            onClick={() => onComplete(0)} 
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all"
          >
            Return to Story
          </button>
        </div>
      </div>
    )
  }

  const scenePrompts = [
    {
      setup: "🎬 Scene Opening",
      direction: `You're now in character as the nervous transfer student. Xiao Ai approaches with genuine curiosity and warmth.`,
      cue: "Begin naturally and let your personality shine through",
      objective: "Build initial rapport and show cultural appreciation"
    },
    {
      setup: "🎭 Building Connection", 
      direction: "The conversation is flowing well. Xiao Ai is warming up and showing genuine interest in getting to know you.",
      cue: "Deepen the connection while staying authentic",
      objective: "Express gratitude and share more about yourself"
    },
    {
      setup: "🌟 Emotional Peak",
      direction: "This is your moment to create a lasting impression. Xiao Ai is fully engaged and interested.",
      cue: "Give it your all - this shapes your relationship",
      objective: "Create a meaningful moment that advances your bond"
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

  const processResponse = (aiResponse: Message) => {
    handlePhraseUsage(aiResponse.content);
    setMessages(prev => [...prev, aiResponse]);
    setIsAIThinking(false);

    if (aiResponse.audioUrl) {
      const audio = new Audio(aiResponse.audioUrl);
      audio.play();
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isAIThinking) return;

    const userMessage = {
      type: 'user' as const,
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsAIThinking(true);
    handlePhraseUsage(inputText);
    
    const dialogueHistory = convertMessagesToDialogueLines([...messages, userMessage]);

    try {
      const aiResponse = await getAiResponse({
        chapterId: chapter?.id || 1,
        conversationHistory: dialogueHistory,
        userTranscription: inputText,
      });

      processResponse(aiResponse);
    } catch (error) {
      console.error("AI API call failed:", error);
      setIsAIThinking(false);
      setShowApiWarning(true);
    }
    
    setInputText('');
  }
  
  const handleMicrophoneToggle = async () => {
    if (isRecording) {
      mediaRecorder?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        
        recorder.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        
        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
          audioChunks.current = [];
          
          setIsAIThinking(true);
          
          const userTranscription = "The transcribed text will go here.";
          
          const dialogueHistory = convertMessagesToDialogueLines(messages);

          try {
            const aiResponse = await getAiResponse({
              chapterId: chapter?.id || 1,
              conversationHistory: dialogueHistory,
              userTranscription: userTranscription
            });
            processResponse(aiResponse);
          } catch (error) {
            console.error("AI API call failed:", error);
            setIsAIThinking(false);
            setShowApiWarning(true);
          }
        };
        
        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access denied or error: ", err);
        alert("Please enable microphone access to use voice practice.");
      }
    }
  }

  const calculateFinalScore = () => {
    const phrasesUsed = Object.values(phraseUsage).filter(Boolean).length
    const totalPhrases = chapter.voicePractice.keyPhrases.length
    const messageCount = messages.filter(m => m.type === 'user').length
    
    let bonus = 0
    if (phrasesUsed === totalPhrases) bonus += 15
    if (messageCount >= 8) bonus += 10
    if (affectionEarned > 20) bonus += 5
    
    return Math.min(affectionEarned + bonus, chapter.voicePractice.affectionReward)
  }

  if (conversationEnded) {
    const finalScore = calculateFinalScore()
    const phrasesUsed = Object.values(phraseUsage).filter(Boolean).length
    const successRate = (phrasesUsed / chapter.voicePractice.keyPhrases.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-2xl mx-auto">
          <div className="text-8xl mb-6">
            {successRate >= 90 ? '🌟' : successRate >= 70 ? '👏' : '👍'}
          </div>
          <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Scene Complete!
          </h3>
          <p className="text-gray-600 mb-8">Your performance with Xiao Ai</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{phrasesUsed}/{chapter.voicePractice.keyPhrases.length}</div>
              <div className="text-sm text-blue-700 font-medium">Key Phrases Used</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">{messages.filter(m => m.type === 'user').length}</div>
              <div className="text-sm text-green-700 font-medium">Messages Exchanged</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-pink-600 mb-2">+{finalScore}</div>
              <div className="text-sm text-pink-700 font-medium">Affection Earned</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
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
                <div className={`text-2xl mb-2 ${messages.length >= 10 ? 'text-green-500' : 'text-yellow-500'}`}>
                  {messages.length >= 10 ? '💫' : '⚡'}
                </div>
                <div className="font-medium">Engagement</div>
                <div className="text-gray-600">{messages.length >= 10 ? 'Captivating' : 'Solid'}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onComplete(finalScore)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Continue Your Story → +{finalScore} ❤️
          </button>
        </div>
      </div>
    )
  }

  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🎭</div>
                <h2 className="text-3xl font-bold mb-2">{chapter.title}</h2>
                <p className="text-xl opacity-90">Voice Acting Scene</p>
              </div>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                  🎬 Your Scene
                </h3>
                <p className="text-blue-700 mb-4">{chapter.voicePractice.scenario}</p>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm font-semibold text-blue-800 mb-2">🎯 Your Goal:</div>
                  <div className="text-blue-700">{chapter.voicePractice.objective}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                    🎯 Your Lines ({chapter.voicePractice.keyPhrases.length} phrases)
                  </h3>
                  <div className={`transform transition-transform ${showDetails ? 'rotate-180' : ''}`}>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>
                
                {showDetails && (
                  <div className="mt-4 space-y-3">
                    {chapter.voicePractice.keyPhrases.map((phrase: string, index: number) => (
                      <div key={index} className="bg-white rounded-xl p-4 border border-green-100">
                        <div className="font-medium text-green-700">{phrase}</div>
                        <div className="text-xs text-green-600 mt-1">+8 ❤️ for natural delivery</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-8">
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

              <button
                onClick={() => setSessionStarted(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
              >
                🎬 Begin Your Scene
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
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col h-full overflow-hidden">
          
          {shouldShowApiWarning() && (
            <div className="bg-yellow-500 text-white p-3 text-center text-sm font-medium">
              ⚠️ API connection failed. Using mock responses.
            </div>
          )}

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">👩‍🎓</div>
              <div>
                <h3 className="font-bold">{currentPrompt.setup}</h3>
                <p className="text-sm opacity-90">Conversation with Xiao Ai</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-medium">
                ❤️ +{affectionEarned}
              </div>
              <button 
                onClick={() => setConversationEnded(true)}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b p-4">
            <div className="text-sm">
              <span className="font-semibold text-yellow-800">🎭 Director: </span>
              <span className="text-yellow-700">{currentPrompt.direction}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute inset-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-3xl">👩‍🎓</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Xiao Ai is waiting...</h3>
                <p className="text-gray-600">Start the conversation using your key phrases!</p>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`rounded-2xl p-4 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-4' 
                      : 'bg-gradient-to-r from-pink-50 to-purple-50 text-gray-800 mr-4 border border-pink-100'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl flex-shrink-0">
                        {message.type === 'user' ? '🧑‍🎓' : '👩‍🎓'}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium mb-1">{message.content}</div>
                        <div className={`text-xs ${message.type === 'user' ? 'text-white opacity-75' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {isAIThinking && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 mr-4 border border-pink-100">
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
                      <div className="text-gray-600">Xiao Ai is thinking...</div>
                      <div className="text-xs text-gray-500">Preparing response</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t bg-gray-50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-700">Acting Performance</div>
              <div className="text-xs text-gray-500">
                {Object.values(phraseUsage).filter(Boolean).length}/{chapter.voicePractice.keyPhrases.length} key lines delivered
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {chapter.voicePractice.keyPhrases.map((phrase: string, index: number) => {
                const chinesePart = phrase.split(' (')[0].split(' -')[0]
                const used = phraseUsage[chinesePart]
                return (
                  <span key={index} className={`text-xs px-3 py-1 rounded-full transition-all ${
                    used ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}>
                    {used ? '✓' : '○'} {chinesePart}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="border-t p-4 bg-white">
            <div className="flex items-end gap-3">
              <button
                onClick={handleMicrophoneToggle}
                className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isRecording 
                    ? 'bg-red-500 shadow-lg shadow-red-200 animate-pulse' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg'
                } text-white`}
              >
                {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              
              <div className="flex-1 relative">
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-gray-50 text-gray-800 placeholder-gray-500"
                  rows={2}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-3 text-center">
              <div className="text-xs text-gray-500">
                🎭 Stay in character and speak naturally for maximum affection!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoicePracticeComponent