// src/lib/aiApi.ts
import { storyChapters } from '../data/storyChapters';
import type { DialogueLine } from '../types';

interface AiResponse {
  type: 'ai';
  content: string;
  pinyin?: string;
  english?: string;
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
    const mockResponses: { [key: number]: { [key: string]: Array<{ chinese: string, pinyin: string, english: string }> } } = {
      1: {
        "你好": [
          { chinese: "你好，很高興認識你！你的中文其實說得很好呢！", pinyin: "nǐ hǎo, hěn gāoxìng rènshi nǐ! nǐ de zhōngwén qíshí shuō de hěn hǎo ne!", english: "Hello, very happy to meet you! Your Chinese is actually pretty good!" },
          { chinese: "嗨！我叫小愛，很高興認識你！你從美國來的，那邊的天氣一定很好吧？", pinyin: "hāi! wǒ jiào xiǎo ài, hěn gāoxìng rènshi nǐ! nǐ cóng měiguó lái de, nàbiān de tiānqì yīdìng hěn hǎo ba?", english: "Hi! My name is Xiao Ai, very happy to meet you! You're from America, the weather there must be great, right?" },
          { chinese: "你好，不用緊張！我會很樂意幫你熟悉學校的生活。", pinyin: "nǐ hǎo, búyòng jǐnzhāng! wǒ huì hěn lèyì bāng nǐ shúxī xuéxiào de shēnghuó.", english: "Hello, no need to be nervous! I'd be very happy to help you get used to school life." }
        ],
        "謝謝": [
          { chinese: "不客氣！我希望你在台灣過得開心。", pinyin: "bú kèqi! wǒ xīwàng nǐ zài Táiwān guòde kāixīn.", english: "You're welcome! I hope you have a good time in Taiwan." },
          { chinese: "不用客氣，這是我的榮幸！", pinyin: "búyòng kèqì, zhè shì wǒ de róngxìng!", english: "No need to be polite, it's my honor!" }
        ],
        "了解台灣文化": [
          { chinese: "哇，你人真好！我很樂意跟你分享台灣文化，我們可以從美食開始！", pinyin: "wā, nǐ rén zhēn hǎo! wǒ hěn lèyì gēn nǐ fēnxiǎng Táiwān wénhuà, wǒmen kěyǐ cóng měishí kāishǐ!", english: "Wow, you're really nice! I'd be very happy to share Taiwanese culture with you, we can start with food!" },
          { chinese: "太棒了！我很喜歡你的態度，我們有很多東西可以聊喔！", pinyin: "tài bàngle! wǒ hěn xǐhuān nǐ de tàidù, wǒmen yǒu hěnduō dōngxī kěyǐ liáo o!", english: "That's great! I really like your attitude, we have a lot of things to talk about!" }
        ],
        "教我嗎": [
          { chinese: "當然可以！我會教你一些有趣的台灣話，保證讓你學得開心！", pinyin: "dāngrán kěyǐ! wǒ huì jiāo nǐ yīxiē yǒuqù de Táiwānhuà, bǎozhèng ràng nǐ xuéde kāixīn!", english: "Of course! I'll teach you some interesting Taiwanese phrases, I promise you'll have fun learning!" },
          { chinese: "沒問題！有任何問題都可以問我。", pinyin: "méi wèntí! yǒu rènhé wèntí dōu kěyǐ wèn wǒ.", english: "No problem! You can ask me any questions you have." }
        ],
        "緊張": [
          { chinese: "不用緊張啦！你的中文真的很好，我相信你一定學得很快！", pinyin: "búyòng jǐnzhāng la! nǐ de zhōngwén zhēnde hěn hǎo, wǒ xiāngxìn nǐ yīdìng xuéde hěn kuài!", english: "Don't be nervous! Your Chinese is really good, I believe you'll learn very quickly!" },
          { chinese: "沒關係，慢慢來就好。每個人剛開始都會有一點緊張的！", pinyin: "méiguānxi, mànmàn lái jiù hǎo. měi gèrén gāng kāishǐ dōu huì yǒu yīdiǎn jǐnzhāng de!", english: "It's okay, just take your time. Everyone gets a little nervous when they first start!" }
        ],
        "default": [
          { chinese: "哈哈，這很有趣！你還有什麼想學的嗎？", pinyin: "hā hā, zhè hěn yǒuqù! nǐ hái yǒu shé me xiǎng xué de ma?", english: "Haha, this is very interesting! Is there anything else you want to learn?" },
          { chinese: "嗯，我不太懂。你可以再說一次嗎？", pinyin: "ng4, wǒ bù tàidǒng. nǐ kěyǐ zài shuō yīcì ma?", english: "Hmm, I don't quite understand. Could you say that again?" },
          { chinese: "哇，你很棒耶！繼續加油！", pinyin: "wā, nǐ hěn bàng yē! jìxù jiāyóu!", english: "Wow, you're awesome! Keep up the good work!" }
        ],
      },
      2: {
        "無聊": [
          { chinese: "哈哈，對呀！我也覺得數學課很無聊。你寫紙條的想法很酷耶！", pinyin: "hāhā, duì ya! wǒ yě juéde shùxué kè hěn wúliáo. nǐ xiě zhǐtiáo de xiǎngfǎ hěn kù yē!", english: "Haha, yes! I also think math class is boring. Your idea of passing notes is so cool!" },
          { chinese: "對啊，這堂課真的很漫長。還好有你傳紙條給我！", pinyin: "duì a, zhè táng kè zhēn de hěn màncháng. hái hǎo yǒu nǐ chuán zhǐtiáo gěi wǒ!", english: "Yeah, this class is really long. It's a good thing you passed me a note!" }
        ],
        "一起吃飯": [
          { chinese: "好啊！你喜歡吃什麼？學校旁邊有一家很好吃的雞排喔！", pinyin: "hǎo a! nǐ xǐhuān chī shéme? xuéxiào pángbiān yǒu yījiā hěn hào chī de jī pái o!", english: "Okay! What do you like to eat? There's a really good chicken cutlet place next to the school!" },
          { chinese: "可以呀，我很樂意！我們中午一起去吃午餐吧！", pinyin: "kěyǐ ya, wǒ hěn lèyì! wǒmen zhōngwǔ yīqǐ qù chī wǔcān ba!", english: "Sure, I'd be happy to! Let's go eat lunch together!" }
        ],
        "今天很刺激": [
          { chinese: "對呀！老師差點就發現了，真的嚇死我了！", pinyin: "duì ya! lǎoshī chàdiǎn jiù fāxiànle, zhēn de xiàsǐ wǒle!", english: "Right! The teacher almost found us, it really scared me to death!" },
          { chinese: "沒錯！我心臟都快跳出來了，但真的很有趣！", pinyin: "méi cuò! wǒ xīnzàng dōu kuài tiào chūláile, dàn zhēn de hěn yǒuqù!", english: "That's right! My heart almost jumped out of my chest, but it was really fun!" }
        ],
        "default": [
          { chinese: "哇，這很有趣！你還有什麼想說的嗎？", pinyin: "wā, zhè hěn yǒuqù! nǐ hái yǒu shé me xiǎng shuō de ma?", english: "Wow, that's interesting! Is there anything else you want to say?" },
          { chinese: "好啊，我很樂意跟你聊這些！", pinyin: "hǎo a, wǒ hěn lèyì gēn nǐ liáo zhèxiē!", english: "Sure, I'm very happy to chat with you about these things!" }
        ],
      },
    };
    
    const userMessage = context.userTranscription.toLowerCase();
    const chapterResponses = mockResponses[context.chapterId];
    let response: { chinese: string, pinyin: string, english: string } | null = null;

    for (const key in chapterResponses) {
      if (key.trim() === "default") continue;
      if (userMessage.includes(key.toLowerCase())) {
        const matchingResponses = chapterResponses[key];
        response = matchingResponses[Math.floor(Math.random() * matchingResponses.length)];
        break;
      }
    }

    if (!response && chapterResponses.default) {
      const defaultResponses = chapterResponses.default;
      response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    if (!response) {
      return Promise.resolve({
        type: 'ai',
        content: "對不起，我不太懂。你可以再說一次嗎？",
        pinyin: "duìbuqǐ, wǒ bù tàidǒng. nǐ kěyǐ zài shuō yīcì ma?",
        english: "Sorry, I don't really understand. Can you say that again?",
        timestamp: new Date(),
        emotion: 'confused',
      });
    }

    return new Promise(resolve => setTimeout(() => resolve({
      type: 'ai',
      content: response!.chinese,
      pinyin: response!.pinyin,
      english: response!.english,
      timestamp: new Date(),
      emotion: 'happy'
    }), 1000));
  }

  // Live API Integration
  if (!isApiAvailable) {
    return Promise.resolve({
      type: 'ai',
      content: "對不起，目前服務有點問題，請稍後再試一次！",
      pinyin: "duìbuqǐ, mùqián fúwù yǒudiǎn wèntí, qǐng shāohòu zài shì yīcì!",
      english: "Sorry, there's a problem with the service right now, please try again later!",
      timestamp: new Date(),
      emotion: 'sad'
    });
  }

  return new Promise(async (resolve, reject) => {
    // ... API call logic remains the same ...
    const personaPrompt = `
      You are roleplaying as 小愛 (Xiao Ai), a 17-year-old Taiwanese high school student.
      Your persona is similar to Shen Chia Yi from "You Are the Apple of My Eye" in that you are kind, smart, and a little playful. You are genuinely impressed and find the new transfer student endearing. You are patient, encouraging, and appreciate sincerity over perfect language skills.
      
      Current Scene Context:
      Setting: ${chapter!.setting}
      Mood: ${chapter!.mood}
      Objective: Your goal is to guide the user to express interest in Taiwanese culture and to build a genuine friendship.
    `;

    const userPerformanceFeedback = `
      User's input: "${context.userTranscription}".
      The user needs to use key phrases like: ${chapter!.voicePractice.keyPhrases.map(p => p.split('(')[0]).join(', ')}.
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