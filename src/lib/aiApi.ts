// src/lib/aiApi.ts
import type { StoryChapter } from '../types'

interface AiResponse {
  type: 'ai'
  content: string
  timestamp: Date
  emotion?: string
}

interface ApiContext {
  prompt: string
  conversationHistory: any[]
}

// NOTE: Replace with your actual OpenAI API key. 
// For production, use environment variables to keep this secure.
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY" 

// This function simulates an API call and response. 
// You'll need to replace this with your actual fetch logic to an AI service.
export async function getAiResponseFromAudio(audioBlob: Blob, context: ApiContext): Promise<AiResponse> {
  // 1. Transcribe the audio using a speech-to-text API (e.g., OpenAI's Whisper)
  // For now, we'll use a simulated transcription.
  const simulatedTranscription = "你好，很高興認識你！ (nǐ hǎo, hěn gāoxìng rènshi nǐ!)"

  // 2. Construct a detailed prompt for the AI model
  const systemPrompt = `
    You are 小愛 (Xiao Ai), a 17-year-old Taiwanese high school student. You are warm, genuinely helpful, and culturally proud. Your current conversation is with Xiao Ming, a new transfer student from America. You are impressed by his sincerity and want to help him feel welcome.

    Current Story Context:
    The user is in Chapter ${1}, "First Day Destiny," at Zhongshan High School. The mood is electric anticipation mixed with cultural overwhelm.
    Your objective is to build genuine rapport with Xiao Ming while showing humility and cultural appreciation.

    Your current conversation history is:
    ${context.conversationHistory.map(msg => `${msg.type}: ${msg.content}`).join('\n')}

    Please respond naturally and continue the conversation, staying in character.
  `;

  // 3. Send the prompt and transcription to a conversational AI model (e.g., OpenAI's GPT-4o)
  // For now, we'll use a simulated response.
  console.log("Sending prompt to AI:", systemPrompt)
  console.log("User's transcription:", simulatedTranscription)

  const simulatedResponse = {
    content: "你好，我也很高興認識你！你的中文說得很好呢！(nǐ hǎo, wǒ yě hěn gāoxìng rènshi nǐ! nǐ de zhōngwén shuō de hěn hǎo ne!)",
    emotion: "genuinely welcoming"
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        type: 'ai',
        content: simulatedResponse.content,
        timestamp: new Date(),
        emotion: simulatedResponse.emotion
      });
    }, 1500); // Simulate network latency
  });
}