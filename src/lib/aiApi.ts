// src/lib/aiApi.ts
import { storyChapters } from '../data/storyChapters';
import type { DialogueLine } from '../types';

interface AiResponse {
  type: 'ai';
  content: string;
  timestamp: Date;
  emotion?: string;
  audioUrl?: string;
}

interface ApiContext {
  chapterId: number;
  conversationHistory: DialogueLine[];
  userTranscription: string;
}

// Check for a mock flag to switch between real and mock data.
// For a local version with your API key, make sure this is set to 'false'
// in your .env.local file. For a public demo, set it to 'true'.
const isMocking = process.env.NEXT_PUBLIC_MOCK_API === 'true';

export async function getAiResponse(context: ApiContext): Promise<AiResponse> {
  const chapter = storyChapters.find(c => c.id === context.chapterId);

  if (!chapter) {
    throw new Error('Chapter not found for AI context.');
  }

  // --- Start of Prompting and Grounding Logic ---
  // A. Define the bot's persona and tone based on story data.
  // This helps the AI act like Xiao Ai.
  const personaPrompt = `
    You are roleplaying as 小愛 (Xiao Ai), a 17-year-old Taiwanese high school student.
    Your persona is similar to Shen Chia Yi from "You Are the Apple of My Eye" in that you are kind, smart, and a little playful. You are genuinely impressed and find the new transfer student endearing. You are patient, encouraging, and appreciate sincerity over perfect language skills.
    
    Current Scene Context:
    Setting: ${chapter.setting}
    Mood: ${chapter.mood}
    Objective: Your goal is to guide the user to express interest in Taiwanese culture and to build a genuine friendship.
  `;

  // B. Analyze user input to account for grammar and vocabulary usage.
  // This makes the AI "aware" of the learning objectives.
  const userPerformanceFeedback = `
    User Performance Analysis:
    - User's input: "${context.userTranscription}"
    - The user needs to use key phrases like: ${chapter.voicePractice.keyPhrases.map(p => p.split('(')[0]).join(', ')}
    - When the user uses a key phrase, give a positive and encouraging response.
  `;

  // C. Combine all elements into the final system prompt.
  // This is the core instruction set sent to the AI.
  const systemPrompt = `
    ${personaPrompt.trim()}
    
    ${userPerformanceFeedback.trim()}
    
    Conversation History:
    ${context.conversationHistory.map(msg => `${msg.character}: ${msg.chinese}`).join('\n')}
    
    Based on the above context, respond as 小愛. Your reply should be in fluent, natural Mandarin Chinese, with a hint of playfulness and warmth. Do not directly correct the user's grammar, but gently model the correct usage in your response.
  `;
  // --- End of Prompting and Grounding Logic ---


  if (isMocking) {
    console.log("MOCKING AI RESPONSE. System Prompt:", systemPrompt);
    const mockResponses = {
      1: [
        "你的中文說得不錯！我很impressed！(nǐ de zhōngwén shuō de bú cuò! wǒ hěn impressed!)",
        "真的嗎？你覺得台灣怎麼樣？(zhēn de ma? nǐ juéde Táiwān zěnme yàng?)",
        "我很樂意幫你！我們可以一起練習中文。(wǒ hěn lèyì bāng nǐ! wǒmen kěyǐ yìqǐ liànxí Zhōngwén.)",
      ]
    };
    const responsePool = mockResponses[chapter.id as keyof typeof mockResponses] || [];
    const randomResponse = responsePool[Math.floor(Math.random() * responsePool.length)];
    return new Promise(resolve => setTimeout(() => resolve({
      type: 'ai',
      content: randomResponse,
      timestamp: new Date(),
      emotion: 'happy'
    }), 1000));
  }

  // --- Start of Live API Integration ---
  // NOTE: You'll need to replace 'YOUR_OPENAI_API_ENDPOINT' with the correct
  // endpoint for the specific service you are using (e.g., speech-to-text, chat, and text-to-speech).
  // This is a simplified example of how the call would look.
  try {
    const apiResponse = await fetch('YOUR_OPENAI_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // This is a secure way to access your key from the .env file.
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: context.userTranscription },
        ],
      })
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(`API call failed with status ${apiResponse.status}: ${errorData.error.message}`);
    }

    const data = await apiResponse.json();
    return {
      type: 'ai',
      content: data.text_response,
      timestamp: new Date(),
      emotion: data.emotion,
      audioUrl: data.audio_url
    };
  } catch (error) {
    console.error("Real AI API call failed:", error);
    throw error;
  }
  // --- End of Live API Integration ---
}