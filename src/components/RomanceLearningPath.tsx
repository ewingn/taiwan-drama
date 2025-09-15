'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight, Play, Mic, MicOff, Star, Heart, Gamepad2, BookOpen, Trophy, Lock, Check, Gift, MessageCircle, Volume2, Share, Copy, Users, Globe, Timer, Zap, Target, Award, Clock, Flame, HeartCrack, Volume1, Pause, RotateCcw, FastForward } from 'lucide-react'

// Enhanced Types for Gamified System
interface Character {
  id: string
  name: string
  chineseName: string
  role: string
  avatar: string
  description: string
  personality: string[]
  voiceSettings: {
    pitch: number
    rate: number
    voice: string
  }
}

interface VoiceInteraction {
  type: 'greeting' | 'question' | 'response' | 'emotion'
  trigger: string
  aiResponse: {
    chinese: string
    pinyin: string
    english: string
    emotion: string
    voiceSpeed: number
  }
  correctResponses: string[]
  timeLimit: number
  affectionReward: number
  affectionPenalty: number
}

interface TimedChallenge {
  id: string
  title: string
  type: 'connections' | 'quickfire' | 'voicematch' | 'speedtranslate'
  timeLimit: number
  description: string
  data: any
  rewards: {
    perfect: { xp: number, affection: number }
    good: { xp: number, affection: number }
    fail: { xp: number, affection: number }
  }
}

interface GameState {
  currentStreak: number
  maxStreak: number
  totalTimeSpent: number
  perfectGames: number
  voiceInteractions: number
  currentCombo: number
  lastPlayTime: Date
}

interface StoryScene {
  id: string
  title: string
  setting: string
  timeOfDay: string
  weather: string
  mood: string
  backgroundMusic?: string
  characters: string[]
  dialogue: Array<{
    character: string
    chinese: string
    pinyin: string
    english: string
    emotion: string
    voiceDelay: number
    choices?: Array<{
      chinese: string
      pinyin: string
      english: string
      affectionChange: number
      consequence: string
    }>
  }>
  voiceChallenge?: VoiceInteraction
  timedChallenge?: TimedChallenge
}

interface Episode {
  id: number
  title: string
  description: string
  theme: string
  culturalFocus: string
  estimatedTime: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  scenes: StoryScene[]
  unlocked: boolean
  completed: boolean
  stars: number
  bestTime?: number
  checkpointReward: {
    type: 'achievement' | 'item' | 'scene' | 'voice'
    content: string
    unlocks?: string[]
  }
}

// Enhanced Character Data with Voice Settings
const characters: Character[] = [
  {
    id: 'xiaoming',
    name: 'Xiao Ming',
    chineseName: '小明',
    role: 'Protagonist (You)',
    avatar: '🧑‍🎓',
    description: 'A shy but kind-hearted transfer student',
    personality: ['Introverted', 'Thoughtful', 'Loyal', 'Academic'],
    voiceSettings: { pitch: 1.0, rate: 0.9, voice: 'male' }
  },
  {
    id: 'xiaoai',
    name: 'Xiao Ai',
    chineseName: '小愛',
    role: 'Love Interest',
    avatar: '👩‍🎓',
    description: 'Popular and cheerful classmate',
    personality: ['Outgoing', 'Kind', 'Artistic', 'Popular'],
    voiceSettings: { pitch: 1.2, rate: 1.0, voice: 'female' }
  },
  {
    id: 'teacher',
    name: 'Teacher Wang',
    chineseName: '王老師',
    role: 'Homeroom Teacher',
    avatar: '👩‍🏫',
    description: 'Strict but caring homeroom teacher',
    personality: ['Authoritative', 'Fair', 'Observant'],
    voiceSettings: { pitch: 0.9, rate: 0.8, voice: 'female' }
  },
  {
    id: 'rival',
    name: 'Da Wei',
    chineseName: '大偉',
    role: 'Romantic Rival',
    avatar: '🧑‍💼',
    description: 'Confident class president',
    personality: ['Confident', 'Competitive', 'Charismatic'],
    voiceSettings: { pitch: 0.8, rate: 1.1, voice: 'male' }
  }
]

// Expanded Story Episodes with Gamified Elements
const episodes: Episode[] = [
  {
    id: 1,
    title: 'First Day Destiny',
    description: 'A transfer student meets their soulmate',
    theme: 'Introductions & Destiny',
    culturalFocus: 'Taiwanese school culture and politeness',
    estimatedTime: '15-20 min',
    difficulty: 'Easy',
    unlocked: true,
    completed: false,
    stars: 0,
    scenes: [
      {
        id: 'morning_arrival',
        title: 'Nervous Morning',
        setting: 'School Gates',
        timeOfDay: 'Early Morning',
        weather: 'Sunny with light breeze',
        mood: 'Nervous anticipation',
        characters: ['xiaoming'],
        dialogue: [
          {
            character: '小明',
            chinese: '新學校...希望一切都會順利',
            pinyin: 'Xīn xuéxiào... xīwàng yīqiè dōu huì shùnlì',
            english: 'New school... I hope everything goes smoothly',
            emotion: 'nervous',
            voiceDelay: 0
          }
        ],
        voiceChallenge: {
          type: 'greeting',
          trigger: 'First impression prep',
          aiResponse: {
            chinese: '新同學！歡迎來到我們學校！',
            pinyin: 'Xīn tóngxué! Huānyíng lái dào wǒmen xuéxiào!',
            english: 'New student! Welcome to our school!',
            emotion: 'welcoming',
            voiceSpeed: 1.0
          },
          correctResponses: ['謝謝', '你好', '很高興認識你'],
          timeLimit: 5,
          affectionReward: 10,
          affectionPenalty: -5
        }
      },
      {
        id: 'classroom_entrance',
        title: 'Fateful Meeting',
        setting: 'Classroom 3-A',
        timeOfDay: 'Morning',
        weather: 'Sunny',
        mood: 'Heart-stopping moment',
        characters: ['xiaoming', 'xiaoai', 'teacher'],
        dialogue: [
          {
            character: '王老師',
            chinese: '同學們，我們有新同學。小明，請自我介紹。',
            pinyin: 'Tóngxuémen, wǒmen yǒu xīn tóngxué. Xiǎo Míng, qǐng zìwǒ jièshào.',
            english: 'Students, we have a new classmate. Xiao Ming, please introduce yourself.',
            emotion: 'authoritative',
            voiceDelay: 1000
          },
          {
            character: '小明',
            chinese: '大家好，我是小明。請多指教。',
            pinyin: 'Dàjiā hǎo, wǒ shì Xiǎo Míng. Qǐng duō zhǐjiào.',
            english: 'Hello everyone, I\'m Xiao Ming. Please take care of me.',
            emotion: 'nervous',
            voiceDelay: 2000
          },
          {
            character: '小愛',
            chinese: '你好！我是小愛。歡迎！',
            pinyin: 'Nǐ hǎo! Wǒ shì Xiǎo Ài. Huānyíng!',
            english: 'Hello! I\'m Xiao Ai. Welcome!',
            emotion: 'cheerful',
            voiceDelay: 3000,
            choices: [
              {
                chinese: '謝謝！很高興認識你！',
                pinyin: 'Xièxie! Hěn gāoxìng rènshi nǐ!',
                english: 'Thank you! Nice to meet you!',
                affectionChange: 15,
                consequence: 'Xiao Ai blushes and smiles warmly'
              },
              {
                chinese: '嗯...',
                pinyin: 'Ēn...',
                english: 'Mm...',
                affectionChange: -5,
                consequence: 'Xiao Ai looks a bit confused by your cold response'
              },
              {
                chinese: '請多指教',
                pinyin: 'Qǐng duō zhǐjiào',
                english: 'Please guide me',
                affectionChange: 10,
                consequence: 'Xiao Ai appreciates your politeness'
              }
            ]
          }
        ],
        timedChallenge: {
          id: 'intro_quickfire',
          title: 'Introduction Quickfire',
          type: 'quickfire',
          timeLimit: 30,
          description: 'Match Chinese greetings with their English meanings as fast as possible!',
          data: {
            pairs: [
              { chinese: '你好', english: 'Hello' },
              { chinese: '謝謝', english: 'Thank you' },
              { chinese: '請多指教', english: 'Please guide me' },
              { chinese: '很高興認識你', english: 'Nice to meet you' },
              { chinese: '不客氣', english: 'You\'re welcome' },
              { chinese: '對不起', english: 'Sorry' }
            ]
          },
          rewards: {
            perfect: { xp: 200, affection: 20 },
            good: { xp: 150, affection: 10 },
            fail: { xp: 50, affection: -10 }
          }
        }
      },
      {
        id: 'seating_arrangement',
        title: 'Desk Partners',
        setting: 'Classroom 3-A',
        timeOfDay: 'Morning',
        weather: 'Sunny',
        mood: 'Excitement and nervousness',
        characters: ['xiaoming', 'xiaoai'],
        dialogue: [
          {
            character: '小愛',
            chinese: '看起來我們是同桌！',
            pinyin: 'Kàn qǐlái wǒmen shì tóngzhuō!',
            english: 'Looks like we\'re desk partners!',
            emotion: 'excited',
            voiceDelay: 0
          }
        ],
        voiceChallenge: {
          type: 'response',
          trigger: 'Respond to becoming desk partners',
          aiResponse: {
            chinese: '我很期待和你一起學習！',
            pinyin: 'Wǒ hěn qīdài hé nǐ yīqǐ xuéxí!',
            english: 'I\'m looking forward to studying together with you!',
            emotion: 'excited',
            voiceSpeed: 1.0
          },
          correctResponses: ['我也是', '太好了', '一起加油'],
          timeLimit: 8,
          affectionReward: 15,
          affectionPenalty: -8
        }
      }
    ],
    checkpointReward: {
      type: 'achievement',
      content: '🌟 First Day Survivor - You made it through your first day and caught Xiao Ai\'s attention!',
      unlocks: ['voice_chat_mode', 'afternoon_scenes']
    }
  },
  {
    id: 2,
    title: 'Secret Messages',
    description: 'The art of classroom communication',
    theme: 'Communication & Risk',
    culturalFocus: 'Indirect communication and classroom dynamics',
    estimatedTime: '20-25 min',
    difficulty: 'Medium',
    unlocked: false,
    completed: false,
    stars: 0,
    scenes: [
      {
        id: 'math_class_boredom',
        title: 'Boring Math Class',
        setting: 'Mathematics Classroom',
        timeOfDay: 'Late Morning',
        weather: 'Overcast',
        mood: 'Boredom turning to mischief',
        characters: ['xiaoming', 'xiaoai', 'teacher'],
        dialogue: [
          {
            character: '小明',
            chinese: '數學課好無聊...',
            pinyin: 'Shùxué kè hǎo wúliáo...',
            english: 'Math class is so boring...',
            emotion: 'bored',
            voiceDelay: 0
          }
        ],
        timedChallenge: {
          id: 'note_writing_speed',
          title: 'Secret Note Challenge',
          type: 'speedtranslate',
          timeLimit: 45,
          description: 'Write the perfect note to ask Xiao Ai to lunch! Translate these romantic phrases quickly!',
          data: {
            phrases: [
              { english: 'Do you want to have lunch together?', chinese: '你想一起吃午餐嗎？' },
              { english: 'I think you\'re really nice', chinese: '我覺得你人很好' },
              { english: 'Would you like to be friends?', chinese: '你想當朋友嗎？' },
              { english: 'See you after class', chinese: '下課後見' }
            ]
          },
          rewards: {
            perfect: { xp: 300, affection: 25 },
            good: { xp: 200, affection: 15 },
            fail: { xp: 100, affection: -15 }
          }
        }
      },
      {
        id: 'note_passing',
        title: 'The Great Note Pass',
        setting: 'Mathematics Classroom',
        timeOfDay: 'Late Morning',
        weather: 'Overcast',
        mood: 'Suspense and risk',
        characters: ['xiaoming', 'xiaoai', 'teacher'],
        dialogue: [
          {
            character: '小明',
            chinese: '現在！',
            pinyin: 'Xiànzài!',
            english: 'Now!',
            emotion: 'determined',
            voiceDelay: 0
          }
        ],
        voiceChallenge: {
          type: 'emotion',
          trigger: 'Whisper the note passing',
          aiResponse: {
            chinese: '什麼？',
            pinyin: 'Shénme?',
            english: 'What?',
            emotion: 'confused_whisper',
            voiceSpeed: 0.7
          },
          correctResponses: ['紙條', '給你', '午餐'],
          timeLimit: 3,
          affectionReward: 20,
          affectionPenalty: -20
        }
      }
    ],
    checkpointReward: {
      type: 'scene',
      content: '💕 Lunch Date Unlocked - Xiao Ai said yes to lunch! New romantic scenes available!',
      unlocks: ['lunch_scenes', 'romance_vocabulary']
    }
  },
  {
    id: 3,
    title: 'Lunch Date Destiny',
    description: 'Your first real conversation alone',
    theme: 'Romance & Connection',
    culturalFocus: 'Dating culture and emotional expression',
    estimatedTime: '25-30 min',
    difficulty: 'Hard',
    unlocked: false,
    completed: false,
    stars: 0,
    scenes: [
      {
        id: 'cafeteria_meeting',
        title: 'Cafeteria Rendezvous',
        setting: 'School Cafeteria',
        timeOfDay: 'Lunch Time',
        weather: 'Sunny',
        mood: 'Nervous excitement',
        characters: ['xiaoming', 'xiaoai'],
        dialogue: [
          {
            character: '小愛',
            chinese: '你喜歡什麼食物？',
            pinyin: 'Nǐ xǐhuān shénme shíwù?',
            english: 'What food do you like?',
            emotion: 'curious',
            voiceDelay: 0,
            choices: [
              {
                chinese: '我喜歡台灣菜',
                pinyin: 'Wǒ xǐhuān Táiwān cài',
                english: 'I like Taiwanese food',
                affectionChange: 20,
                consequence: 'Xiao Ai\'s eyes light up with excitement'
              },
              {
                chinese: '什麼都可以',
                pinyin: 'Shénme dōu kěyǐ',
                english: 'Anything is fine',
                affectionChange: 5,
                consequence: 'Xiao Ai thinks you\'re not very decisive'
              },
              {
                chinese: '我想知道你喜歡什麼',
                pinyin: 'Wǒ xiǎng zhīdào nǐ xǐhuān shénme',
                english: 'I want to know what you like',
                affectionChange: 25,
                consequence: 'Xiao Ai blushes at your thoughtfulness'
              }
            ]
          }
        ],
        timedChallenge: {
          id: 'food_connections',
          title: 'Taiwanese Food Culture',
          type: 'connections',
          timeLimit: 60,
          description: 'Group these Taiwanese foods by category to impress Xiao Ai with your cultural knowledge!',
          data: {
            words: ['珍珠奶茶', '牛肉麵', '小籠包', '臭豆腐', '芒果冰', '鳳梨酥', '蚵仔煎', '刨冰', '魯肉飯', '夜市', '茶葉蛋', '紅豆湯'],
            groups: [
              { category: 'Drinks', items: ['珍珠奶茶', '茶葉蛋', '紅豆湯', '芒果冰'], color: 'blue' },
              { category: 'Main Dishes', items: ['牛肉麵', '魯肉飯', '蚵仔煎', '臭豆腐'], color: 'green' },
              { category: 'Snacks', items: ['小籠包', '鳳梨酥', '茶葉蛋', '夜市'], color: 'yellow' },
              { category: 'Desserts', items: ['芒果冰', '刨冰', '紅豆湯', '鳳梨酥'], color: 'pink' }
            ]
          },
          rewards: {
            perfect: { xp: 400, affection: 30 },
            good: { xp: 250, affection: 20 },
            fail: { xp: 150, affection: -25 }
          }
        }
      }
    ],
    checkpointReward: {
      type: 'voice',
      content: '🎤 Voice Date Mode Unlocked - Have real voice conversations with Xiao Ai anytime!',
      unlocks: ['free_voice_chat', 'advanced_scenarios']
    }
  }
]

// Voice Recognition Hook
const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'zh-TW'

      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0]
        setTranscript(result.transcript)
        setConfidence(result.confidence)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      setTranscript('')
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  return { isListening, transcript, confidence, startListening, stopListening }
}

// Text-to-Speech Hook
const useTextToSpeech = () => {
  const speak = (text: string, character?: Character) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)

      if (character) {
        utterance.pitch = character.voiceSettings.pitch
        utterance.rate = character.voiceSettings.rate
      }

      // Try to use Chinese voice
      const voices = speechSynthesis.getVoices()
      const chineseVoice = voices.find(voice => voice.lang.includes('zh'))
      if (chineseVoice) {
        utterance.voice = chineseVoice
      }

      speechSynthesis.speak(utterance)
    }
  }

  const stop = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
    }
  }

  return { speak, stop }
}

// Enhanced Components

const AffectionMeter = ({
  currentAffection,
  maxAffection = 100,
  recentChange
}: {
  currentAffection: number
  maxAffection?: number
  recentChange?: number
}) => {
  const percentage = (currentAffection / maxAffection) * 100
  const [showChange, setShowChange] = useState(false)

  useEffect(() => {
    if (recentChange && recentChange !== 0) {
      setShowChange(true)
      setTimeout(() => setShowChange(false), 2000)
    }
  }, [recentChange])

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium text-gray-700">Affection Level</span>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-pink-600 font-bold">{currentAffection}/{maxAffection}</span>
          {showChange && recentChange && (
            <div className={`text-xs font-bold animate-bounce ${
              recentChange > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {recentChange > 0 ? '+' : ''}{recentChange}
            </div>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 relative overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 relative ${
            percentage >= 80 ? 'bg-gradient-to-r from-pink-400 to-red-500' :
            percentage >= 50 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
            'bg-gradient-to-r from-gray-400 to-gray-500'
          }`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white bg-opacity-30 animate-pulse"></div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>😐</span>
        <span>😊</span>
        <span>😍</span>
        <span>💕</span>
      </div>

      {/* Affection Status */}
      <div className="mt-2 text-center">
        <span className={`text-xs px-2 py-1 rounded-full ${
          percentage >= 80 ? 'bg-red-100 text-red-600' :
          percentage >= 60 ? 'bg-pink-100 text-pink-600' :
          percentage >= 40 ? 'bg-yellow-100 text-yellow-600' :
          percentage >= 20 ? 'bg-gray-100 text-gray-600' :
          'bg-red-100 text-red-800'
        }`}>
          {percentage >= 80 ? '💕 In Love' :
           percentage >= 60 ? '😍 Interested' :
           percentage >= 40 ? '😊 Friendly' :
           percentage >= 20 ? '😐 Neutral' :
           '😒 Annoyed'}
        </span>
      </div>
    </div>
  )
}

const GameStats = ({ gameState }: { gameState: GameState }) => {
  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border">
      <h3 className="font-semibold mb-3 text-sm sm:text-base flex items-center gap-2">
        <Trophy className="w-4 h-4 text-yellow-500" />
        Game Stats
      </h3>
      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
        <div className="text-center p-2 bg-yellow-50 rounded">
          <div className="font-bold text-yellow-600">{gameState.currentStreak}</div>
          <div className="text-yellow-700">Current Streak</div>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="font-bold text-blue-600">{gameState.perfectGames}</div>
          <div className="text-blue-700">Perfect Games</div>
        </div>
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="font-bold text-green-600">{gameState.voiceInteractions}</div>
          <div className="text-green-700">Voice Chats</div>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded">
          <div className="font-bold text-purple-600">{Math.round(gameState.totalTimeSpent / 60)}m</div>
          <div className="text-purple-700">Time Played</div>
        </div>
      </div>
    </div>
  )
}

const TimedChallengeInterface = ({
  challenge,
  onComplete
}: {
  challenge: TimedChallenge
  onComplete: (success: boolean, score: number, timeLeft: number) => void
}) => {
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameStarted && !gameEnded && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameStarted && !gameEnded) {
      endGame()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameStarted, gameEnded])

  const endGame = () => {
    setGameEnded(true)
    const percentage = (score / challenge.data.pairs?.length || challenge.data.phrases?.length || 1) * 100
    const success = percentage >= 70
    onComplete(success, percentage, timeLeft)
  }

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(challenge.timeLimit)
  }

  if (challenge.type === 'quickfire') {
    return (
      <div className="bg-white rounded-lg p-4 sm:p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg sm:text-xl font-bold flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            {challenge.title}
          </h3>
          <p className="text-sm text-gray-600">{challenge.description}</p>
        </div>

        {!gameStarted ? (
          <div className="text-center">
            <div className="bg-red-50 rounded-lg p-4 mb-4">
              <Timer className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">{challenge.timeLimit}s</div>
              <div className="text-sm text-red-700">Time Limit</div>
            </div>
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:from-red-600 hover:to-orange-600 transition-all"
            >
              🚀 Start Challenge!
            </button>
          </div>
        ) : gameEnded ? (
          <div className="text-center">
            <div className="text-4xl mb-4">
              {score >= challenge.data.pairs.length * 0.8 ? '🌟' :
               score >= challenge.data.pairs.length * 0.6 ? '👍' : '😅'}
            </div>
            <div className="text-2xl font-bold mb-2">
              {score}/{challenge.data.pairs.length} Correct
            </div>
            <div className="text-lg text-gray-600 mb-4">
              {score >= challenge.data.pairs.length * 0.8 ? 'Perfect! Amazing work!' :
               score >= challenge.data.pairs.length * 0.6 ? 'Good job! Keep practicing!' :
               'Keep trying! You\'ll get it!'}
            </div>
          </div>
        ) : (
          <div>
            {/* Timer */}
            <div className="flex items-center justify-center mb-4">
              <div className={`text-2xl font-bold ${
                timeLeft <= 5 ? 'text-red-500 animate-pulse' :
                timeLeft <= 10 ? 'text-orange-500' : 'text-green-500'
              }`}>
                <Timer className="w-6 h-6 inline mr-2" />
                {timeLeft}s
              </div>
            </div>

            {/* Current Question */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4 text-center">
              <div className="text-2xl font-bold mb-2">
                {challenge.data.pairs[currentQuestion]?.chinese}
              </div>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {challenge.data.pairs.length}
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-2">
              {challenge.data.pairs.map((pair: any, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index === currentQuestion) {
                      setScore(score + 1)
                    }
                    if (currentQuestion < challenge.data.pairs.length - 1) {
                      setCurrentQuestion(currentQuestion + 1)
                    } else {
                      endGame()
                    }
                  }}
                  className="p-3 bg-gray-100 hover:bg-blue-100 rounded-lg text-left transition-colors"
                >
                  {pair.english}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Other challenge types would go here...
  return <div>Challenge type not implemented yet</div>
}

const VoiceInteractionInterface = ({
  interaction,
  character,
  onComplete
}: {
  interaction: VoiceInteraction
  character: Character
  onComplete: (success: boolean, affectionChange: number) => void
}) => {
  const { isListening, transcript, confidence, startListening, stopListening } = useVoiceRecognition()
  const { speak, stop } = useTextToSpeech()
  const [timeLeft, setTimeLeft] = useState(interaction.timeLimit)
  const [hasStarted, setHasStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (hasStarted && !isComplete && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && hasStarted && !isComplete) {
      handleTimeout()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, hasStarted, isComplete])

  useEffect(() => {
    if (transcript && hasStarted && !isComplete) {
      checkResponse(transcript)
    }
  }, [transcript])

  const startInteraction = () => {
    setHasStarted(true)
    speak(interaction.aiResponse.chinese, character)
    setTimeout(() => {
      setTimeLeft(interaction.timeLimit)
    }, 2000)
  }

  const checkResponse = (response: string) => {
    const isCorrect = interaction.correctResponses.some(correct =>
      response.includes(correct)
    )

    setIsComplete(true)

    if (isCorrect) {
      onComplete(true, interaction.affectionReward)
    } else {
      onComplete(false, interaction.affectionPenalty)
    }
  }

  const handleTimeout = () => {
    setIsComplete(true)
    onComplete(false, interaction.affectionPenalty)
  }

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg sm:text-xl font-bold flex items-center justify-center gap-2">
          <Mic className="w-5 h-5 text-blue-500" />
          Voice Challenge
        </h3>
        <p className="text-sm text-gray-600">{interaction.trigger}</p>
      </div>

      {!hasStarted ? (
        <div className="text-center">
          <div className="text-6xl mb-4">{character.avatar}</div>
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="text-lg font-medium mb-2">Get ready to respond to:</div>
            <div className="text-sm text-gray-600 mb-2">{character.name}</div>
            <div className="text-base">{interaction.aiResponse.english}</div>
          </div>
          <button
            onClick={startInteraction}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            🎤 Start Voice Challenge
          </button>
        </div>
      ) : !isComplete ? (
        <div className="text-center">
          {/* Timer */}
          <div className={`text-3xl font-bold mb-4 ${
            timeLeft <= 2 ? 'text-red-500 animate-pulse' :
            timeLeft <= 5 ? 'text-orange-500' : 'text-blue-500'
          }`}>
            <Clock className="w-8 h-8 inline mr-2" />
            {timeLeft}s
          </div>

          {/* AI Character Speaking */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="text-4xl mb-2">{character.avatar}</div>
            <div className="text-lg font-medium">{interaction.aiResponse.chinese}</div>
            <div className="text-sm text-blue-600">({interaction.aiResponse.pinyin})</div>
            <div className="text-sm text-gray-600">{interaction.aiResponse.english}</div>
          </div>

          {/* Voice Input */}
          <div className="mb-4">
            <button
              onMouseDown={startListening}
              onMouseUp={stopListening}
              onTouchStart={startListening}
              onTouchEnd={stopListening}
              className={`w-full py-8 rounded-lg font-bold text-lg transition-all ${
                isListening
                  ? 'bg-red-500 text-white scale-105 shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Mic className={`w-8 h-8 mx-auto mb-2 ${isListening ? 'animate-pulse' : ''}`} />
              {isListening ? 'Listening...' : 'Hold to Speak'}
            </button>
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="bg-yellow-50 rounded-lg p-3 mb-4">
              <div className="text-sm text-gray-600">You said:</div>
              <div className="font-medium">{transcript}</div>
              <div className="text-xs text-gray-500">Confidence: {Math.round(confidence * 100)}%</div>
            </div>
          )}

          {/* Hints */}
          <div className="text-xs text-gray-500">
            Try saying: {interaction.correctResponses.join(', ')}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-4xl mb-4">
            {interaction.affectionReward > 0 ? '🌟' : '😅'}
          </div>
          <div className="text-lg font-bold mb-2">
            {interaction.affectionReward > 0 ? 'Perfect Response!' : 'Try Again Next Time!'}
          </div>
          <div className="text-sm text-gray-600">
            {interaction.affectionReward > 0
              ? `+${interaction.affectionReward} Affection`
              : `${interaction.affectionPenalty} Affection`}
          </div>
        </div>
      )}
    </div>
  )
}

const StoryScenePlayer = ({
  scene,
  onComplete
}: {
  scene: StoryScene
  onComplete: (affectionChange: number) => void
}) => {
  const [currentDialogue, setCurrentDialogue] = useState(0)
  const [showChoices, setShowChoices] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<any>(null)
  const { speak } = useTextToSpeech()

  const currentLine = scene.dialogue[currentDialogue]
  const character = characters.find(c => c.chineseName === currentLine.character)

  useEffect(() => {
    // Auto-play voice for AI characters
    if (character && character.id !== 'xiaoming') {
      setTimeout(() => {
        speak(currentLine.chinese, character)
      }, currentLine.voiceDelay)
    }
  }, [currentDialogue])

  const nextDialogue = () => {
    if (currentLine.choices) {
      setShowChoices(true)
    } else if (currentDialogue < scene.dialogue.length - 1) {
      setCurrentDialogue(currentDialogue + 1)
    } else {
      onComplete(0) // No affection change for regular dialogue
    }
  }

  const handleChoice = (choice: any) => {
    setSelectedChoice(choice)
    setShowChoices(false)
    onComplete(choice.affectionChange)
  }

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6">
      {/* Scene Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg sm:text-xl font-bold">{scene.title}</h3>
        <div className="text-sm text-gray-600 flex items-center justify-center gap-4">
          <span>📍 {scene.setting}</span>
          <span>🕐 {scene.timeOfDay}</span>
          <span>🌤️ {scene.weather}</span>
        </div>
        <div className={`text-xs px-3 py-1 rounded-full mt-2 inline-block ${
          scene.mood.includes('nervous') ? 'bg-yellow-100 text-yellow-700' :
          scene.mood.includes('romantic') ? 'bg-pink-100 text-pink-700' :
          scene.mood.includes('excited') ? 'bg-green-100 text-green-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {scene.mood}
        </div>
      </div>

      {/* Current Dialogue */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl">{character?.avatar}</div>
          <div>
            <div className="font-semibold">{character?.name}</div>
            <div className="text-sm text-gray-600">{currentLine.character}</div>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => speak(currentLine.chinese, character)}
              className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
            >
              <Volume2 className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-lg font-medium">{currentLine.chinese}</div>
          <div className="text-sm text-blue-600">({currentLine.pinyin})</div>
          <div className="text-gray-700">{currentLine.english}</div>
        </div>
      </div>

      {/* Choices or Continue */}
      {showChoices && currentLine.choices ? (
        <div className="space-y-3">
          <div className="text-center font-semibold text-gray-700">Choose your response:</div>
          {currentLine.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              className={`w-full p-3 rounded-lg text-left transition-all border-2 ${
                choice.affectionChange > 0
                  ? 'border-green-200 bg-green-50 hover:bg-green-100'
                  : choice.affectionChange < 0
                  ? 'border-red-200 bg-red-50 hover:bg-red-100'
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="font-medium">{choice.chinese}</div>
              <div className="text-sm text-blue-600">({choice.pinyin})</div>
              <div className="text-sm text-gray-600">{choice.english}</div>
              <div className={`text-xs mt-1 ${
                choice.affectionChange > 0 ? 'text-green-600' :
                choice.affectionChange < 0 ? 'text-red-600' :
                'text-gray-500'
              }`}>
                {choice.affectionChange > 0 ? `+${choice.affectionChange} ❤️` :
                 choice.affectionChange < 0 ? `${choice.affectionChange} 💔` :
                 'Neutral'}
              </div>
            </button>
          ))}
        </div>
      ) : selectedChoice ? (
        <div className="text-center">
          <div className="bg-yellow-50 rounded-lg p-4 mb-4">
            <div className="font-semibold">Result:</div>
            <div className="text-sm">{selectedChoice.consequence}</div>
          </div>
          <button
            onClick={() => onComplete(0)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Story
          </button>
        </div>
      ) : (
        <button
          onClick={nextDialogue}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
        >
          {currentDialogue < scene.dialogue.length - 1 ? 'Continue' : 'Complete Scene'}
        </button>
      )}

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Scene Progress</span>
          <span>{currentDialogue + 1} / {scene.dialogue.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentDialogue + 1) / scene.dialogue.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// Main Gamified Learning Path Component
const GamifiedRomanceLearningPath: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentEpisode, setCurrentEpisode] = useState(0)
  const [currentScene, setCurrentScene] = useState(0)
  const [showSceneContent, setShowSceneContent] = useState(false)
  const [userProgress, setUserProgress] = useState({
    xp: 0,
    affection: 25,
    completedEpisodes: [] as number[],
    completedScenes: [] as string[]
  })
  const [gameState, setGameState] = useState<GameState>({
    currentStreak: 0,
    maxStreak: 0,
    totalTimeSpent: 0,
    perfectGames: 0,
    voiceInteractions: 0,
    currentCombo: 0,
    lastPlayTime: new Date()
  })
  const [recentAffectionChange, setRecentAffectionChange] = useState(0)

  const episode = episodes[currentEpisode]
  const scene = episode?.scenes[currentScene]

  const handleAffectionChange = (change: number) => {
    setRecentAffectionChange(change)
    setUserProgress(prev => ({
      ...prev,
      affection: Math.max(0, Math.min(100, prev.affection + change))
    }))
  }

  const handleSceneComplete = (affectionChange: number) => {
    handleAffectionChange(affectionChange)

    if (scene) {
      setUserProgress(prev => ({
        ...prev,
        completedScenes: [...prev.completedScenes, scene.id]
      }))
    }

    // Move to next scene or complete episode
    if (currentScene < episode.scenes.length - 1) {
      setCurrentScene(currentScene + 1)
    } else {
      // Episode completed
      alert(`🎉 Episode ${episode.id} completed! ${episode.checkpointReward.content}`)
      setCurrentScene(0)
    }

    setShowSceneContent(false)
  }

  const startScene = (sceneIndex: number) => {
    setCurrentScene(sceneIndex)
    setShowSceneContent(true)
  }

  if (showSceneContent && scene) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowSceneContent(false)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>

            <div className="text-center flex-1 mx-4">
              <h1 className="text-lg font-bold text-gray-800 truncate">
                {scene.title}
              </h1>
              <p className="text-xs text-gray-600">Episode {episode.id}: {episode.title}</p>
            </div>

            <div className="text-right text-xs">
              <div className="text-gray-600">💕 {userProgress.affection}</div>
              <div className="text-blue-600">⚡ {gameState.currentStreak}</div>
            </div>
          </div>

          {/* Scene Content */}
          <StoryScenePlayer
            scene={scene}
            onComplete={handleSceneComplete}
          />

          {/* Voice Challenge */}
          {scene.voiceChallenge && (
            <div className="mt-4">
              <VoiceInteractionInterface
                interaction={scene.voiceChallenge}
                character={characters.find(c => c.chineseName === '小愛') || characters[1]}
                onComplete={(success, affectionChange) => {
                  handleAffectionChange(affectionChange)
                  setGameState(prev => ({
                    ...prev,
                    voiceInteractions: prev.voiceInteractions + 1
                  }))
                }}
              />
            </div>
          )}

          {/* Timed Challenge */}
          {scene.timedChallenge && (
            <div className="mt-4">
              <TimedChallengeInterface
                challenge={scene.timedChallenge}
                onComplete={(success, score, timeLeft) => {
                  const reward = success ? scene.timedChallenge!.rewards.perfect : scene.timedChallenge!.rewards.fail
                  setUserProgress(prev => ({
                    ...prev,
                    xp: prev.xp + reward.xp
                  }))
                  handleAffectionChange(reward.affection)

                  if (success && score >= 90) {
                    setGameState(prev => ({
                      ...prev,
                      perfectGames: prev.perfectGames + 1,
                      currentStreak: prev.currentStreak + 1
                    }))
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Arcs
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
            🎭 Voice-Powered Romance Drama
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 mb-4">
            Talk to AI characters, complete timed challenges, and build real relationships!
          </p>

          {/* Game Features Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
              <div className="text-center">
                <Mic className="w-6 h-6 mx-auto mb-1" />
                <div>Voice Chat</div>
              </div>
              <div className="text-center">
                <Timer className="w-6 h-6 mx-auto mb-1" />
                <div>Timed Games</div>
              </div>
              <div className="text-center">
                <Heart className="w-6 h-6 mx-auto mb-1" />
                <div>Real Stakes</div>
              </div>
              <div className="text-center">
                <Trophy className="w-6 h-6 mx-auto mb-1" />
                <div>Achievements</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <AffectionMeter
            currentAffection={userProgress.affection}
            recentChange={recentAffectionChange}
          />
          <GameStats gameState={gameState} />
          <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border">
            <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Progress
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span>Total XP:</span>
                <span className="font-bold text-blue-600">{userProgress.xp}</span>
              </div>
              <div className="flex justify-between">
                <span>Scenes:</span>
                <span className="font-bold text-green-600">{userProgress.completedScenes.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Episodes:</span>
                <span className="font-bold text-purple-600">{userProgress.completedEpisodes.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Episodes */}
        <div className="space-y-4">
          {episodes.map((episodeItem, index) => (
            <div
              key={episodeItem.id}
              className={`bg-white rounded-lg p-4 shadow-sm border ${
                index === currentEpisode ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold">
                      Episode {episodeItem.id}: {episodeItem.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      episodeItem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      episodeItem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {episodeItem.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{episodeItem.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>🎯 {episodeItem.theme}</span>
                    <span>⏱️ {episodeItem.estimatedTime}</span>
                    <span>🌏 {episodeItem.culturalFocus}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    episodeItem.completed ? 'bg-green-500 text-white' :
                    episodeItem.unlocked ? 'bg-blue-500 text-white' :
                    'bg-gray-300 text-gray-500'
                  }`}>
                    {episodeItem.completed ? <Check size={20} /> :
                     !episodeItem.unlocked ? <Lock size={20} /> :
                     episodeItem.id}
                  </div>
                  {episodeItem.stars > 0 && (
                    <div className="flex justify-center">
                      {[...Array(3)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < episodeItem.stars ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Scenes Grid */}
              {episodeItem.unlocked && (
                <div className="grid gap-2">
                  {episodeItem.scenes.map((sceneItem, sceneIndex) => {
                    const isCompleted = userProgress.completedScenes.includes(sceneItem.id)
                    const isUnlocked = sceneIndex === 0 || userProgress.completedScenes.includes(episodeItem.scenes[sceneIndex - 1]?.id)

                    return (
                      <div
                        key={sceneItem.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          isCompleted ? 'bg-green-50 border-green-200' :
                          isUnlocked ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' :
                          'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                        }`}
                        onClick={() => isUnlocked && !isCompleted && startScene(sceneIndex)}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          isCompleted ? 'bg-green-500 text-white' :
                          isUnlocked ? 'bg-blue-500 text-white' :
                          'bg-gray-300 text-gray-500'
                        }`}>
                          {isCompleted ? <Check size={12} /> :
                           !isUnlocked ? <Lock size={12} /> :
                           sceneIndex + 1}
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{sceneItem.title}</h4>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-500">📍 {sceneItem.setting}</span>
                            {sceneItem.voiceChallenge && (
                              <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                                🎤 Voice
                              </span>
                            )}
                            {sceneItem.timedChallenge && (
                              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                ⏱️ Timed
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          {isCompleted && (
                            <div className="text-green-600 text-xs font-bold">✓ Done</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GamifiedRomanceLearningPath