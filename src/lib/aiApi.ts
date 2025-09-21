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

// NOTE: Set this to 'true' for your YouTube demo to use high-quality mock responses
// without relying on a live API.
const DEMO_MODE = true;

// For live API calls, ensure this is a valid key and endpoint.
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const API_ENDPOINT = 'YOUR_OPENAI_API_ENDPOINT';

let isApiAvailable = OPENAI_API_KEY && API_ENDPOINT ? true : false;

export function getAiResponse(context: ApiContext): Promise<AiResponse> {
  const chapter = storyChapters.find(c => c.id === context.chapterId);

  if (!chapter) {
    return Promise.reject(new Error('Chapter not found for AI context.'));
  }

  // --- Start of Mocking Logic (for DEMO_MODE) ---
  if (DEMO_MODE) {
    // These mock responses are designed to be more "thoughtful" and contextual
    const mockResponses: { [key: number]: { [key: string]: string[] } } = {
      1: {
        "你好": [
          "你好，很高興認識你！你的中文其實說得很好呢！",
          "嗨！我叫小愛，很高興認識你！你從美國來的，那邊的天氣一定很好吧？",
          "你好，不用緊張！我會很樂意幫你熟悉學校的生活。"
        ],
        "謝謝": [
          "不客氣！我希望你在台灣過得開心。",
          "不用客氣，這是我的榮幸！"
        ],
        "了解台灣文化": [
          "哇，你人真好！我很樂意跟你分享台灣文化，我們可以從美食開始！",
          "太棒了！我很喜歡你的態度，我們有很多東西可以聊喔！"
        ],
        "教我嗎": [
          "當然可以！我會教你一些有趣的台灣話，保證讓你學得開心！",
          "沒問題！有任何問題都可以問我。"
        ],
        "緊張": [
          "不用緊張啦！你的中文真的很好，我相信你一定學得很快！",
          "沒關係，慢慢來就好。每個人剛開始都會有一點緊張的！"
        ],
        " default": [
          "哈哈，這很有趣！你還有什麼想學的嗎？",
          "嗯，我不太懂。你可以再說一次嗎？",
          "哇，你很棒耶！繼續加油！"
        ],
      },
      2: {
        "無聊": [
          "哈哈，對呀！我也覺得數學課很無聊。你寫紙條的想法很酷耶！",
          "對啊，這堂課真的很漫長。還好有你傳紙條給我！"
        ],
        "一起吃飯": [
          "好啊！你喜歡吃什麼？學校旁邊有一家很好吃的雞排喔！",
          "可以呀，我很樂意！我們中午一起去吃午餐吧！"
        ],
        "今天很刺激": [
          "對呀！老師差點就發現了，真的嚇死我了！",
          "沒錯！我心臟都快跳出來了，但真的很有趣！"
        ],
        " default": [
          "哇，這很有趣！你還有什麼想說的嗎？",
          "嗯，我不太懂。你可以再說一次嗎？",
          "好啊，我很樂意跟你聊這些！"
        ],
      },
    };
    
    // Find a relevant mock response based on user input
    const userMessage = context.userTranscription.toLowerCase();
    const chapterResponses = mockResponses[context.chapterId];
    let responseText = '';
    
    // Check for a specific mock response based on the user's input.
    for (const key in chapterResponses) {
        if (key.trim() === "default") continue; // Skip the default key
        if (userMessage.includes(key.toLowerCase())) {
            const matchingResponses = chapterResponses[key];
            responseText = matchingResponses[Math.floor(Math.random() * matchingResponses.length)];
            break;
        }
    }

    // If no specific response is found, use the default response.
    if (!responseText && chapterResponses.default) {
        const defaultResponses = chapterResponses.default;
        responseText = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    return new Promise(resolve => setTimeout(() => resolve({
      type: 'ai',
      content: responseText,
      timestamp: new Date(),
      emotion: 'happy'
    }), 1000));
  }

  // Live API Integration
  if (!isApiAvailable) {
    return Promise.resolve({
      type: 'ai',
      content: "對不起，目前服務有點問題，請稍後再試一次！(duìbuqǐ, mùqián fúwù yǒudiǎn wèntí, qǐng shāohòu zài shì yīcì!)",
      timestamp: new Date(),
      emotion: 'sad'
    });
  }

  return new Promise(async (resolve, reject) => {
    const personaPrompt = `
      You are roleplaying as 小愛 (Xiao Ai), a 17-year-old Taiwanese high school student.
      Your persona is similar to Shen Chia Yi from "You Are the Apple of My Eye" in that you are kind, smart, and a little playful. You are genuinely impressed and find the new transfer student endearing. You are patient, encouraging, and appreciate sincerity over perfect language skills.
      
      Current Scene Context:
      Setting: ${chapter.setting}
      Mood: ${chapter.mood}
      Objective: Your goal is to guide the user to express interest in Taiwanese culture and to build a genuine friendship.
    `;

    const userPerformanceFeedback = `
      User's input: "${context.userTranscription}".
      The user needs to use key phrases like: ${chapter.voicePractice.keyPhrases.map(p => p.split('(')[0]).join(', ')}.
      When the user uses a key phrase, give a positive and encouraging response.
    `;

    const systemPrompt = `
      ${personaPrompt.trim()}
      
      ${userPerformanceFeedback.trim()}
      
      Conversation History:
      ${context.conversationHistory.map(msg => `${msg.character}: ${msg.chinese}`).join('\n')}
      
      Based on the above context, respond as 小愛. Your reply should be in fluent, natural Mandarin Chinese, with a hint of playfulness and warmth. Do not directly correct the user's grammar, but gently model the correct usage in your response.
    `;

    try {
      const apiResponse = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
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
        isApiAvailable = false;
        const errorData = await apiResponse.json();
        return reject(new Error(`API call failed with status ${apiResponse.status}: ${errorData.error.message}`));
      }

      const data = await apiResponse.json();
      return resolve({
        type: 'ai',
        content: data.text_response,
        timestamp: new Date(),
        emotion: data.emotion,
        audioUrl: data.audio_url
      });
    } catch (error) {
      console.error("Real AI API call failed:", error);
      isApiAvailable = false;
      return reject(error);
    }
  });
}

// These functions will be imported and used by the UI component
export function isApiMocked(): boolean {
  return DEMO_MODE;
}

export function shouldShowApiWarning(): boolean {
  return !DEMO_MODE;
}