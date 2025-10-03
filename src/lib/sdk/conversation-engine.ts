// src/lib/sdk/conversation-engine.ts
// TaiwanScript Conversation AI SDK
// A production-ready abstraction layer for educational Chinese conversation

import { storyChapters } from '@/data/storyChapters'
import type { DialogueLine, StoryChapter } from '@/types'

// ============================================================
// TYPES & INTERFACES
// ============================================================

export interface ConversationConfig {
  chapterId: number
  enableCaching?: boolean
  enableAnalytics?: boolean
  apiKey?: string
}

export interface AIResponse {
  type: 'ai'
  content: string
  pinyin?: string
  english?: string
  timestamp: Date
  emotion?: string
  audioUrl?: string
  affectionEarned?: number
}

interface MessageAnalysis {
  phrasesFound: string[]
  culturalAwareness: number
  messageType: 'general' | 'question' | 'key_phrase_usage' | 'greeting'
  sentiment: 'positive' | 'neutral' | 'negative'
}

interface ConversationContext {
  chapter: StoryChapter
  history: AIResponse[]
  userStats: {
    phrasesUsed: Set<string>
    phrasesUsedThisTurn: string[]
    culturalScore: number
    conversationDepth: number
    totalAffectionEarned: number
  }
}

interface CacheEntry {
  response: AIResponse
  timestamp: number
  hits: number
}

// ============================================================
// MAIN CONVERSATION ENGINE CLASS
// ============================================================

export class TaiwanScriptConversationEngine {
  private cache: Map<string, CacheEntry>
  private config: ConversationConfig
  private context: ConversationContext
  private analytics: ConversationAnalytics
  
  constructor(config: ConversationConfig) {
    this.cache = new Map()
    this.config = {
      enableCaching: true,
      enableAnalytics: true,
      ...config
    }
    
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
    
    this.analytics = new ConversationAnalytics(this.config.enableAnalytics || false)
  }
  
  // ============================================================
  // PUBLIC API
  // ============================================================
  
  /**
   * Get initial AI greeting to start the conversation
   */
  async getInitialGreeting(): Promise<AIResponse> {
    const greeting = this.generateContextualGreeting()
    this.context.history.push(greeting)
    return greeting
  }
  
  /**
   * Send a user message and get AI response
   */
  async sendMessage(userMessage: string): Promise<AIResponse> {
    // 1. Analyze user message
    const analysis = this.analyzeUserMessage(userMessage)
    
    // 2. Update stats
    this.updateUserStats(analysis)
    
    // 3. Check cache first (if enabled)
    if (this.config.enableCaching) {
      const cached = this.checkCache(userMessage, analysis)
      if (cached) {
        this.analytics.recordCacheHit()
        return this.enhanceResponse(cached, analysis)
      }
    }
    
    // 4. Generate AI response
    const response = await this.generateAIResponse(userMessage, analysis)
    
    // 5. Cache response (if enabled)
    if (this.config.enableCaching) {
      this.cacheResponse(userMessage, response)
    }
    
    // 6. Update history
    this.context.history.push(response)
    
    // 7. Track analytics
    this.analytics.recordMessage(userMessage, response, analysis)
    
    return response
  }
  
  /**
   * Get current conversation statistics
   */
  getConversationStats() {
    return {
      phrasesUsed: this.context.userStats.phrasesUsed.size,
      totalPhrases: this.context.chapter.voicePractice.keyPhrases.length,
      phrasesUsedThisTurn: this.context.userStats.phrasesUsedThisTurn,
      culturalScore: this.context.userStats.culturalScore,
      conversationDepth: this.context.userStats.conversationDepth,
      estimatedAffection: this.calculateAffection(),
      analytics: this.analytics.getStats(),
    }
  }
  
  /**
   * Get conversation history
   */
  getHistory(): AIResponse[] {
    return [...this.context.history]
  }
  
  // ============================================================
  // PRIVATE METHODS - ANALYSIS
  // ============================================================
  
  private analyzeUserMessage(message: string): MessageAnalysis {
    const { chapter } = this.context
    const analysis: MessageAnalysis = {
      phrasesFound: [],
      culturalAwareness: 0,
      messageType: 'general',
      sentiment: 'neutral',
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
    } else if (message.includes('你好') || message.includes('嗨')) {
      analysis.messageType = 'greeting'
    }
    
    // Sentiment analysis (simple)
    const positiveWords = ['喜歡', '開心', '好', '謝謝', '太棒了']
    const negativeWords = ['不', '沒', '對不起', '抱歉']
    
    const hasPositive = positiveWords.some(word => message.includes(word))
    const hasNegative = negativeWords.some(word => message.includes(word))
    
    if (hasPositive && !hasNegative) {
      analysis.sentiment = 'positive'
    } else if (hasNegative && !hasPositive) {
      analysis.sentiment = 'negative'
    }
    
    return analysis
  }
  
  // ============================================================
  // PRIVATE METHODS - RESPONSE GENERATION
  // ============================================================
  
  private async generateAIResponse(userMessage: string, analysis: MessageAnalysis): Promise<AIResponse> {
    // Check if we have a real API key
    if (this.config.apiKey && this.config.apiKey !== 'demo') {
      try {
        return await this.callRealAPI(userMessage, analysis)
      } catch (error) {
        console.error('API call failed, falling back to mock:', error)
      }
    }
    
    // Use intelligent mock responses
    return this.generateMockResponse(userMessage, analysis)
  }
  
  private async callRealAPI(userMessage: string, analysis: MessageAnalysis): Promise<AIResponse> {
    // TODO: Implement real Claude API integration
    // This would use Anthropic's SDK with proper prompt engineering
    
    throw new Error('Real API not implemented - using mock responses')
  }
  
  private generateMockResponse(userMessage: string, analysis: MessageAnalysis): Promise<AIResponse> {
    const { chapter, userStats } = this.context
    
    // Generate contextual response based on chapter and analysis
    let response: AIResponse
    
    // Reward key phrase usage
    if (analysis.phrasesFound.length > 0) {
      const phrase = analysis.phrasesFound[0]
      response = {
        type: 'ai',
        content: `哇！你說「${phrase}」說得很自然耶！我很開心你這麼用心學習。`,
        pinyin: `wā! nǐ shuō "${phrase}" shuō de hěn zìrán yē! wǒ hěn kāixīn nǐ zhème yòngxīn xuéxí.`,
        english: `Wow! You said "${phrase}" so naturally! I'm happy you're learning so earnestly.`,
        timestamp: new Date(),
        emotion: 'happy',
        affectionEarned: 8,
      }
    }
    // Handle questions
    else if (analysis.messageType === 'question') {
      response = {
        type: 'ai',
        content: '這是個好問題！讓我想想怎麼跟你說明...',
        pinyin: 'zhè shì gè hǎo wèntí! ràng wǒ xiǎngxiǎng zěnme gēn nǐ shuōmíng...',
        english: 'That\'s a good question! Let me think about how to explain it to you...',
        timestamp: new Date(),
        emotion: 'thoughtful',
        affectionEarned: 3,
      }
    }
    // Default encouraging response
    else {
      const responses = [
        {
          content: '嗯，我懂你的意思。繼續說吧！',
          pinyin: 'ng, wǒ dǒng nǐ de yìsi. jìxù shuō ba!',
          english: 'Mm, I understand what you mean. Keep going!',
          emotion: 'encouraging',
        },
        {
          content: '真的嗎？告訴我更多！',
          pinyin: 'zhēn de ma? gàosu wǒ gèng duō!',
          english: 'Really? Tell me more!',
          emotion: 'curious',
        },
        {
          content: '你說得很好！雖然還有進步空間，但我看得出來你很努力。',
          pinyin: 'nǐ shuō de hěn hǎo! suīrán hái yǒu jìnbù kōngjiān, dàn wǒ kàn de chūlái nǐ hěn nǔlì.',
          english: 'You\'re doing well! Although there\'s room for improvement, I can see you\'re working hard.',
          emotion: 'supportive',
        },
      ]
      
      const selected = responses[Math.floor(Math.random() * responses.length)]
      response = {
        type: 'ai',
        ...selected,
        timestamp: new Date(),
        affectionEarned: 2,
      }
    }
    
    return Promise.resolve(response)
  }
  
  private generateContextualGreeting(): AIResponse {
    const { chapter } = this.context
    
    const greetings = [
      {
        content: '嗨！我是小愛。很高興見到你！你是新來的轉學生對吧？',
        pinyin: 'hāi! wǒ shì xiǎo ài. hěn gāoxìng jiàn dào nǐ! nǐ shì xīn lái de zhuǎn xuéshēng duì ba?',
        english: 'Hi! I\'m Xiao Ai. Nice to meet you! You\'re the new transfer student, right?',
        emotion: 'friendly',
      },
      {
        content: '你好！我聽說你是從美國來的？那一定很有趣！',
        pinyin: 'nǐ hǎo! wǒ tīngshuō nǐ shì cóng měiguó lái de? nà yīdìng hěn yǒuqù!',
        english: 'Hello! I heard you\'re from America? That must be interesting!',
        emotion: 'curious',
      },
    ]
    
    const selected = greetings[Math.floor(Math.random() * greetings.length)]
    
    return {
      type: 'ai',
      ...selected,
      timestamp: new Date(),
      affectionEarned: 0,
    }
  }
  
  // ============================================================
  // PRIVATE METHODS - STATE MANAGEMENT
  // ============================================================
  
  private updateUserStats(analysis: MessageAnalysis): void {
    // Track newly used phrases
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
  
  // ============================================================
  // PRIVATE METHODS - CACHING
  // ============================================================
  
  private checkCache(message: string, analysis: MessageAnalysis): AIResponse | null {
    const cacheKey = this.getCacheKey(message, analysis)
    const cached = this.cache.get(cacheKey)
    
    if (cached) {
      // Check if cache is still valid (1 hour)
      const age = Date.now() - cached.timestamp
      if (age < 3600000) {
        cached.hits++
        return cached.response
      } else {
        this.cache.delete(cacheKey)
      }
    }
    
    return null
  }
  
  private cacheResponse(message: string, response: AIResponse): void {
    const analysis = this.analyzeUserMessage(message)
    const cacheKey = this.getCacheKey(message, analysis)
    
    this.cache.set(cacheKey, {
      response,
      timestamp: Date.now(),
      hits: 0,
    })
    
    // Limit cache size
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
  }
  
  private getCacheKey(message: string, analysis: MessageAnalysis): string {
    return `${this.context.chapter.id}-${analysis.messageType}-${analysis.phrasesFound.join(',')}`
  }
  
  private enhanceResponse(cached: AIResponse, analysis: MessageAnalysis): AIResponse {
    // Add fresh timestamp and calculate affection for this specific turn
    let affectionEarned = cached.affectionEarned || 0
    
    // Bonus for newly used key phrases
    if (analysis.phrasesFound.length > 0) {
      const newPhrases = analysis.phrasesFound.filter(
        p => !this.context.userStats.phrasesUsed.has(p)
      )
      affectionEarned += newPhrases.length * 8
    }
    
    return {
      ...cached,
      timestamp: new Date(),
      affectionEarned,
    }
  }
}

// ============================================================
// ANALYTICS CLASS
// ============================================================

class ConversationAnalytics {
  private enabled: boolean
  private events: any[]
  private stats: {
    totalMessages: number
    cacheHits: number
    averageResponseTime: number
    phrasesUsedCount: number
  }
  
  constructor(enabled: boolean) {
    this.enabled = enabled
    this.events = []
    this.stats = {
      totalMessages: 0,
      cacheHits: 0,
      averageResponseTime: 0,
      phrasesUsedCount: 0,
    }
  }
  
  recordMessage(userMessage: string, aiResponse: AIResponse, analysis: MessageAnalysis): void {
    if (!this.enabled) return
    
    this.stats.totalMessages++
    this.stats.phrasesUsedCount += analysis.phrasesFound.length
    
    this.events.push({
      type: 'message',
      timestamp: new Date(),
      analysis,
      affectionEarned: aiResponse.affectionEarned || 0,
    })
  }
  
  recordCacheHit(): void {
    if (!this.enabled) return
    this.stats.cacheHits++
  }
  
  getStats() {
    return { ...this.stats }
  }
}

// ============================================================
// FACTORY FUNCTION (Primary Export)
// ============================================================

export function createConversationEngine(config: ConversationConfig): TaiwanScriptConversationEngine {
  return new TaiwanScriptConversationEngine(config)
}