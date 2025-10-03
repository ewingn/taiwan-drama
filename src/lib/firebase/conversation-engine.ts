// src/lib/firebase/conversation-engine.ts
// Firebase-powered conversation engine for TaiwanScript

import { storyChapters } from '@/data/storyChapters'
import type { StoryChapter } from '@/types'
import { generateAIResponse, type ConversationRequest, type ConversationResponse } from './ai-conversation'
import { synthesizeSpeechCached } from './text-to-speech'
import { getAuth } from 'firebase/auth'
import { 
  saveConversationHistory, 
  incrementAffection,
  logLearningEvent 
} from './firestore-operations'

// ============================================================
// TYPES
// ============================================================

export interface ConversationConfig {
  chapterId: number
  enableVoice?: boolean
  enableAnalytics?: boolean
}

export interface AIMessage {
  type: 'ai'
  content: string
  pinyin?: string
  english?: string
  timestamp: Date
  emotion?: string
  audioUrl?: string
  affectionEarned?: number
}

interface ConversationContext {
  chapter: StoryChapter
  history: AIMessage[]
  userStats: {
    phrasesUsed: Set<string>
    phrasesUsedThisTurn: string[]
    culturalScore: number
    conversationDepth: number
    totalAffectionEarned: number
  }
}

// ============================================================
// FIREBASE CONVERSATION ENGINE
// ============================================================

export class FirebaseConversationEngine {
  private config: ConversationConfig
  private context: ConversationContext
  private userId: string | null = null
  
  constructor(config: ConversationConfig) {
    this.config = {
      enableVoice: true,
      enableAnalytics: true,
      ...config
    }
    
    // Get current user
    const auth = getAuth()
    this.userId = auth.currentUser?.uid || null
    
    // Initialize context
    const chapter = storyChapters.find(c => c.id === config.chapterId)
    if (!chapter) throw new Error(`Chapter ${config.chapterId} not found`)
    
    this.context = {
      chapter,
      history: [],
      userStats: {
        phrasesUsed: new Set(),
        phrasesUsedThisTurn: [],
        culturalScore: 0,
        conversationDepth: 0,
        totalAffectionEarned: 0,
      }
    }
  }
  
  // ============================================================
  // PUBLIC API
  // ============================================================
  
  /**
   * Get initial AI greeting
   */
  async getInitialGreeting(): Promise<AIMessage> {
    const greeting: AIMessage = {
      type: 'ai',
      content: '嗨！我是小愛。很高興見到你！你是新來的轉學生對吧？',
      pinyin: 'hāi! wǒ shì xiǎo ài. hěn gāoxìng jiàn dào nǐ! nǐ shì xīn lái de zhuǎn xuéshēng duì ba?',
      english: 'Hi! I\'m Xiao Ai. Nice to meet you! You\'re the new transfer student, right?',
      timestamp: new Date(),
      emotion: 'friendly',
      affectionEarned: 0,
    }
    
    // Generate voice if enabled
    if (this.config.enableVoice) {
      try {
        greeting.audioUrl = await synthesizeSpeechCached(greeting.content)
      } catch (error) {
        console.error('TTS failed for greeting:', error)
      }
    }
    
    this.context.history.push(greeting)
    return greeting
  }
  
  /**
   * Send user message and get AI response
   */
  async sendMessage(userMessage: string): Promise<AIMessage> {
    // Analyze user message
    const analysis = this.analyzeUserMessage(userMessage)
    
    // Update stats
    this.updateUserStats(analysis)
    
    // Build request for AI
    const request: ConversationRequest = {
      chapterId: this.config.chapterId,
      chapter: this.context.chapter,
      userMessage,
      conversationHistory: this.context.history.map(msg => ({
        role: 'model' as const,
        content: msg.content,
      })),
      userStats: this.context.userStats,
    }
    
    // Get AI response
    const aiResponse = await generateAIResponse(request)
    
    // Convert to message format
    const message: AIMessage = {
      type: 'ai',
      content: aiResponse.content,
      pinyin: aiResponse.pinyin,
      english: aiResponse.english,
      timestamp: new Date(),
      emotion: aiResponse.emotion,
      affectionEarned: aiResponse.affectionEarned,
    }
    
    // Generate voice if enabled
    if (this.config.enableVoice) {
      try {
        message.audioUrl = await synthesizeSpeechCached(message.content)
      } catch (error) {
        console.error('TTS failed:', error)
      }
    }
    
    // Update affection in Firestore
    if (this.userId && message.affectionEarned) {
      try {
        await incrementAffection(this.userId, message.affectionEarned)
        this.context.userStats.totalAffectionEarned += message.affectionEarned
      } catch (error) {
        console.error('Failed to update affection:', error)
      }
    }
    
    // Log analytics
    if (this.config.enableAnalytics && this.userId) {
      try {
        await logLearningEvent(this.userId, 'conversation_message', {
          chapterId: this.config.chapterId,
          phrasesUsed: analysis.phrasesFound,
          affectionEarned: message.affectionEarned,
          messageLength: userMessage.length,
        })
      } catch (error) {
        console.error('Failed to log analytics:', error)
      }
    }
    
    // Add to history
    this.context.history.push(message)
    
    return message
  }
  
  /**
   * Get conversation statistics
   */
  getConversationStats() {
    return {
      phrasesUsed: this.context.userStats.phrasesUsed.size,
      totalPhrases: this.context.chapter.voicePractice.keyPhrases.length,
      phrasesUsedThisTurn: this.context.userStats.phrasesUsedThisTurn,
      culturalScore: this.context.userStats.culturalScore,
      conversationDepth: this.context.userStats.conversationDepth,
      estimatedAffection: this.calculateAffection(),
    }
  }
  
  /**
   * Save conversation to Firestore
   */
  async saveConversation(completed: boolean = false): Promise<void> {
    if (!this.userId) return
    
    try {
      await saveConversationHistory(
        this.userId,
        this.config.chapterId,
        this.context.history.map(msg => ({
          type: msg.type,
          content: msg.content,
          pinyin: msg.pinyin,
          english: msg.english,
          timestamp: msg.timestamp as any,
          affectionEarned: msg.affectionEarned,
        })),
        Array.from(this.context.userStats.phrasesUsed),
        this.context.userStats.totalAffectionEarned,
        completed
      )
    } catch (error) {
      console.error('Failed to save conversation:', error)
    }
  }
  
  // ============================================================
  // PRIVATE METHODS
  // ============================================================
  
  private analyzeUserMessage(message: string) {
    const { chapter } = this.context
    const analysis = {
      phrasesFound: [] as string[],
      culturalAwareness: 0,
      messageType: 'general' as 'general' | 'question' | 'key_phrase_usage',
    }
    
    // Check for key phrases
    chapter.voicePractice.keyPhrases.forEach(phrase => {
      const chinesePart = phrase.split('(')[0].trim()
      if (message.includes(chinesePart)) {
        analysis.phrasesFound.push(chinesePart)
      }
    })
    
    // Score cultural awareness
    const culturalMarkers = ['請', '謝謝', '對不起', '沒關係', '不好意思']
    culturalMarkers.forEach(marker => {
      if (message.includes(marker)) {
        analysis.culturalAwareness += 10
      }
    })
    
    // Detect message type
    if (message.includes('?') || message.includes('嗎')) {
      analysis.messageType = 'question'
    } else if (analysis.phrasesFound.length > 0) {
      analysis.messageType = 'key_phrase_usage'
    }
    
    return analysis
  }
  
  private updateUserStats(analysis: ReturnType<typeof this.analyzeUserMessage>): void {
    this.context.userStats.phrasesUsedThisTurn = []
    
    analysis.phrasesFound.forEach(phrase => {
      if (!this.context.userStats.phrasesUsed.has(phrase)) {
        this.context.userStats.phrasesUsed.add(phrase)
        this.context.userStats.phrasesUsedThisTurn.push(phrase)
      }
    })
    
    this.context.userStats.culturalScore += analysis.culturalAwareness
    this.context.userStats.conversationDepth += 1
  }
  
  private calculateAffection(): number {
    const { userStats, chapter } = this.context
    const phraseBonus = (userStats.phrasesUsed.size / chapter.voicePractice.keyPhrases.length) * 30
    const culturalBonus = Math.min(userStats.culturalScore, 20)
    const depthBonus = Math.min(userStats.conversationDepth * 2, 10)
    
    return Math.round(phraseBonus + culturalBonus + depthBonus + userStats.totalAffectionEarned)
  }
}

// ============================================================
// FACTORY FUNCTION
// ============================================================

export function createFirebaseConversationEngine(
  config: ConversationConfig
): FirebaseConversationEngine {
  return new FirebaseConversationEngine(config)
}