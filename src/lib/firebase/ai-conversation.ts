// src/lib/firebase/ai-conversation.ts
// Google Vertex AI / Gemini for intelligent conversation

import type { StoryChapter } from '@/types'

export interface ConversationRequest {
  chapterId: number
  chapter: StoryChapter
  userMessage: string
  conversationHistory: Array<{
    role: 'user' | 'model'
    content: string
  }>
  userStats: {
    phrasesUsed: Set<string>
    culturalScore: number
    conversationDepth: number
  }
}

export interface ConversationResponse {
  content: string
  pinyin: string
  english: string
  emotion: string
  affectionEarned: number
  culturalFeedback?: string
}

/**
 * Generate AI response using Google Vertex AI (Gemini)
 * This uses a Firebase Cloud Function to securely access Vertex AI
 */
export async function generateAIResponse(
  request: ConversationRequest
): Promise<ConversationResponse> {
  try {
    // Build the prompt with cultural context
    const prompt = buildConversationPrompt(request)
    
    // Call Firebase Cloud Function that interfaces with Vertex AI
    const response = await fetch('/api/ai-conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        chapterId: request.chapterId,
        conversationHistory: request.conversationHistory,
        temperature: 0.8, // More creative/varied responses
        maxTokens: 500,
      }),
    })
    
    if (!response.ok) {
      throw new Error('AI conversation generation failed')
    }
    
    const result = await response.json()
    return parseAIResponse(result, request)
    
  } catch (error) {
    console.error('AI conversation error:', error)
    // Fallback to mock response
    return generateMockResponse(request)
  }
}

/**
 * Build contextual prompt for Vertex AI
 */
function buildConversationPrompt(request: ConversationRequest): string {
  const { chapter, userMessage, userStats } = request
  
  const phrasesUsedList = Array.from(userStats.phrasesUsed).join(', ')
  const phrasesRemaining = chapter.voicePractice.keyPhrases.filter(
    phrase => !userStats.phrasesUsed.has(phrase.split('(')[0].trim())
  )
  
  return `
You are 小愛 (Xiǎo Ài), a 17-year-old Taiwanese high school student in this roleplay scenario:

SCENE: ${chapter.title}
${chapter.voicePractice.scenario}

YOUR CHARACTER:
- Warm, culturally grounded, helpful but not patronizing
- Curious about different perspectives
- Patient with language learners
- Genuinely interested in getting to know the transfer student

OBJECTIVE: ${chapter.voicePractice.objective}

CULTURAL CONTEXT:
${chapter.voicePractice.culturalContext.join('\n')}

KEY PHRASES THE USER SHOULD USE:
${chapter.voicePractice.keyPhrases.join('\n')}

USER'S PROGRESS:
- Phrases used: ${phrasesUsedList || 'none yet'}
- Cultural awareness: ${userStats.culturalScore}/100
- Conversation depth: ${userStats.conversationDepth} exchanges

USER'S MESSAGE: "${userMessage}"

YOUR TASK:
1. Respond naturally as 小愛 would in this scenario
2. If user used a key phrase correctly, acknowledge it warmly
3. Guide conversation toward helping user practice remaining phrases
4. Provide gentle cultural feedback when appropriate
5. Keep response authentic and emotionally resonant
6. Vary your responses - don't be repetitive

RESPONSE FORMAT (respond ONLY with valid JSON):
{
  "chinese": "Your response in Chinese",
  "pinyin": "Full pinyin with tone marks",
  "english": "English translation",
  "emotion": "Your current feeling (happy/curious/supportive/etc)",
  "affectionPoints": 0-10,
  "culturalNote": "Optional brief cultural insight if relevant"
}
`.trim()
}

/**
 * Parse AI response and calculate affection
 */
function parseAIResponse(
  apiResponse: any,
  request: ConversationRequest
): ConversationResponse {
  try {
    // Try to parse JSON response
    const parsed = typeof apiResponse.response === 'string' 
      ? JSON.parse(apiResponse.response)
      : apiResponse.response
    
    // Calculate affection based on user's phrase usage
    let affectionEarned = parsed.affectionPoints || 0
    
    // Bonus for using key phrases
    const newPhrasesUsed = request.chapter.voicePractice.keyPhrases.filter(phrase => {
      const chinesePart = phrase.split('(')[0].trim()
      return request.userMessage.includes(chinesePart) && 
             !request.userStats.phrasesUsed.has(chinesePart)
    })
    
    affectionEarned += newPhrasesUsed.length * 8
    
    return {
      content: parsed.chinese,
      pinyin: parsed.pinyin,
      english: parsed.english,
      emotion: parsed.emotion || 'neutral',
      affectionEarned,
      culturalFeedback: parsed.culturalNote,
    }
    
  } catch (error) {
    console.error('Failed to parse AI response:', error)
    return generateMockResponse(request)
  }
}

/**
 * Fallback mock responses when API unavailable
 */
function generateMockResponse(request: ConversationRequest): ConversationResponse {
  const { userMessage, chapter } = request
  
  // Check if user used a key phrase
  const usedPhrases = chapter.voicePractice.keyPhrases.filter(phrase => {
    const chinesePart = phrase.split('(')[0].trim()
    return userMessage.includes(chinesePart)
  })
  
  if (usedPhrases.length > 0) {
    const phrase = usedPhrases[0].split('(')[0].trim()
    return {
      content: `哇！你說「${phrase}」說得很自然耶！我很開心你這麼用心學習。`,
      pinyin: `wā! nǐ shuō "${phrase}" shuō de hěn zìrán yē! wǒ hěn kāixīn nǐ zhème yòngxīn xuéxí.`,
      english: `Wow! You said "${phrase}" so naturally! I'm happy you're learning so earnestly.`,
      emotion: 'happy',
      affectionEarned: 8,
    }
  }
  
  // Default encouraging response
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
  ]
  
  const selected = responses[Math.floor(Math.random() * responses.length)]
  
  return {
    ...selected,
    affectionEarned: 2,
  }
}