import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight, Play, Mic, MicOff, Star, Heart, Gamepad2, BookOpen, Trophy, Lock, Check, Gift, MessageCircle, Volume2, Share, Copy, Users, Globe, Timer, Zap, Target, Award, Clock, Flame, HeartCrack, Volume1, Pause, RotateCcw, FastForward, Info, Camera, MapPin, Sparkles, TrendingUp, Coins, Send, User, Bot, Headphones, Shuffle, Grid3X3, ChevronRight, Home } from 'lucide-react'

// Story Chapter Structure
interface StoryChapter {
  id: number
  title: string
  subtitle: string
  description: string
  storyContext: string
  setting: string
  timeOfDay: string
  mood: string
  unlocked: boolean
  completed: boolean
  
  // Learning Content
  keyVocabulary: Array<{
    chinese: string
    pinyin: string
    english: string
    context: string
  }>
  
  sentencePatterns: Array<{
    pattern: string
    explanation: string
    examples: Array<{
      chinese: string
      pinyin: string
      english: string
    }>
  }>

  // Story Dialogue
  dialogue: Array<{
    character: string
    avatar: string
    chinese: string
    pinyin: string
    english: string
    emotion: string
    internalThought?: string
  }>

  // Mini Games (2-3 per chapter)
  miniGames: Array<{
    id: string
    type: 'connections' | 'matching' | 'quickfire'
    title: string
    description: string
    data: any
    affectionImpact: {
      perfect: number
      good: number
      poor: number
    }
  }>

  // Voice Practice (chapter finale)
  voicePractice: {
    scenario: string
    objective: string
    keyPhrases: string[]
    culturalContext: string[]
    aiCharacterPrompt: string
    successCriteria: string[]
    affectionReward: number
  }

  // Chapter Requirements
  requiredAffection: number // Minimum to proceed
  perfectAffection: number // Bonus story elements
}

// Game State
interface GameProgress {
  currentChapter: number
  totalAffection: number
  chaptersCompleted: number[]
  gamesCompleted: string[]
  perfectChapters: number[]
  storyEnding: 'incomplete' | 'bad' | 'good' | 'perfect' | 'failed'
}

// Story Chapters Data
const storyChapters: StoryChapter[] = [
  {
    id: 1,
    title: "First Day Destiny",
    subtitle: "The Transfer Student Arrives",
    description: "Your heart pounds as you step into Zhongshan High School. Will you make the right first impression with the girl of your dreams?",
    storyContext: `You are Xiao Ming (小明), standing at the gates of Zhongshan High School on a humid September morning in Taipei. Your palms are sweaty, your stomach churns with nerves, and your mind races with doubts. After 17 years in suburban California, you're about to experience authentic Taiwanese high school culture for the first time.

Your parents moved back to Taiwan for business, but you begged them to let you finish senior year here to "connect with your roots." What you didn't tell them was your secret fascination with Taiwanese dramas and your romantic dream of experiencing a real Taiwanese love story.

The morning air is thick with humidity and the smell of breakfast vendors. Students in crisp uniforms bow respectfully to teachers, their conversations a rapid mix of Mandarin and Taiwanese that makes your head spin. You clutch your new school bag, knowing that today will change everything.

Inside, you'll meet Xiao Ai (小愛) - though you don't know her name yet. She's the daughter of temple keepers, raised on traditional values but curious about the world beyond Taiwan. Popular but never arrogant, she has a warmth that draws people in and a laugh that sounds like wind chimes. She's been watching the school entrance, curious about the new foreign transfer student everyone's been talking about.`,
    setting: "Zhongshan High School, Classroom 3-A - a traditional Taiwanese high school with wooden desks arranged in rigid rows",
    timeOfDay: "Early Morning (8:00 AM) - the golden hour when morning announcements echo through hallways",
    mood: "Electric anticipation mixed with cultural overwhelm and the possibility of destiny",
    unlocked: true,
    completed: false,
    
    keyVocabulary: [
      {
        chinese: "請多指教",
        pinyin: "qǐng duō zhǐjiào", 
        english: "Please guide me / Please take care of me",
        context: "The most important phrase in Taiwan - shows humility and respect when meeting new people. Using this correctly will immediately mark you as culturally aware and polite."
      },
      {
        chinese: "新同學",
        pinyin: "xīn tóngxué",
        english: "new classmate",
        context: "How you'll be introduced. In Taiwan, being the 'new student' carries special social significance - classmates will be curious but also protective."
      },
      {
        chinese: "很高興認識你",
        pinyin: "hěn gāoxìng rènshi nǐ",
        english: "Very happy to meet you",
        context: "Essential polite response when introduced. The word '很' (hěn) shows genuine enthusiasm, not just politeness."
      },
      {
        chinese: "我來自美國",
        pinyin: "wǒ láizì Měiguó",
        english: "I come from America", 
        context: "This will immediately create interest and questions. In Taiwan, American-born Taiwanese are called 'ABC' (American-Born Chinese) and viewed with curiosity."
      },
      {
        chinese: "同桌",
        pinyin: "tóngzhuō",
        english: "desk partner",
        context: "Your seating arrangement partner - in Taiwanese schools, this is often a close friendship that can last for years. Your 同桌 will help you navigate school life."
      }
    ],

    sentencePatterns: [
      {
        pattern: "我是... (wǒ shì...)",
        explanation: "I am... - The foundation of all self-introductions in Chinese. This pattern will be your first impression.",
        examples: [
          {
            chinese: "我是小明",
            pinyin: "wǒ shì Xiǎo Míng", 
            english: "I am Xiao Ming"
          },
          {
            chinese: "我是新學生",
            pinyin: "wǒ shì xīn xuéshēng",
            english: "I am a new student"
          },
          {
            chinese: "我是美國人",
            pinyin: "wǒ shì Měiguó rén",
            english: "I am American"
          }
        ]
      },
      {
        pattern: "很... (hěn...)",
        explanation: "Very... - Used to intensify adjectives and show genuine emotion. Critical for expressing enthusiasm in Taiwan.",
        examples: [
          {
            chinese: "很高興",
            pinyin: "hěn gāoxìng",
            english: "very happy"
          },
          {
            chinese: "很緊張",
            pinyin: "hěn jǐnzhāng", 
            english: "very nervous"
          },
          {
            chinese: "很興奮",
            pinyin: "hěn xìngfèn",
            english: "very excited"
          }
        ]
      }
    ],

    dialogue: [
      {
        character: "小明",
        avatar: "🧑‍🎓",
        chinese: "天啊...這裡看起來好正式。每個人都知道該做什麼，只有我像個外國人一樣迷路。",
        pinyin: "Tiān a... zhèlǐ kàn qǐlái hǎo zhèngshì. Měi gè rén dōu zhīdào gāi zuò shénme, zhǐyǒu wǒ xiàng gè wàiguó rén yīyàng mílù.",
        english: "Oh my god... this place looks so formal. Everyone knows what to do, only I'm lost like a foreigner.",
        emotion: "overwhelming anxiety",
        internalThought: "Was this a mistake? What if I can't fit in? What if my Chinese isn't good enough? But I have to try - I've dreamed of this moment."
      },
      {
        character: "老師",
        avatar: "👩‍🏫",
        chinese: "同學們，今天我們有一位特別的新同學。他是從美國回來的台裔學生。小明，請你到前面自我介紹一下。",
        pinyin: "Tóngxuémen, jīntiān wǒmen yǒu yīwèi tèbié de xīn tóngxué. Tā shì cóng Měiguó huílái de táiyì xuéshēng. Xiǎo Míng, qǐng nǐ dào qiánmiàn zìwǒ jièshào yīxià.",
        english: "Students, today we have a special new classmate. He's a Taiwanese-American student returning from America. Xiao Ming, please come to the front and introduce yourself.",
        emotion: "authoritative but encouraging",
        internalThought: "I hope this student can adapt well. International students often struggle with our formal culture, but he seems sincere."
      },
      {
        character: "小明",
        avatar: "🧑‍🎓", 
        chinese: "呃...大家好。我是小明。我從美國加州來的。我的中文...不太好，但我很想學習台灣文化。請大家多多指教。",
        pinyin: "È... dàjiā hǎo. Wǒ shì Xiǎo Míng. Wǒ cóng Měiguó Jiāzhōu lái de. Wǒ de zhōngwén... bùtài hǎo, dàn wǒ hěn xiǎng xuéxí Táiwān wénhuà. Qǐng dàjiā duōduō zhǐjiào.",
        english: "Um... hello everyone. I'm Xiao Ming. I'm from California, America. My Chinese... isn't very good, but I really want to learn Taiwanese culture. Please everyone, guide me.",
        emotion: "nervous but sincere",
        internalThought: "Did I say that right? Everyone's staring at me. Wait, that girl in the second row... she has the most beautiful smile I've ever seen."
      },
      {
        character: "小愛",
        avatar: "👩‍🎓",
        chinese: "哇！加州來的！那邊的天氣一定很好吧？我是小愛，很高興認識你！你的中文其實說得很好呢！",
        pinyin: "Wā! Jiāzhōu lái de! Nàbiān de tiānqì yīdìng hěn hǎo ba? Wǒ shì Xiǎo Ài, hěn gāoxìng rènshi nǐ! Nǐ de zhōngwén qíshí shuō de hěn hǎo ne!",
        english: "Wow! From California! The weather there must be really nice, right? I'm Xiao Ai, very happy to meet you! Your Chinese is actually quite good!",
        emotion: "excited and genuinely welcoming",
        internalThought: "He seems so humble and sincere. And he mentioned wanting to learn about our culture - that's really sweet. Most foreign students just complain about how different everything is."
      }
    ],

    miniGames: [
      {
        id: "intro_vocabulary_matching",
        type: "matching",
        title: "First Impressions Vocabulary",
        description: "Master the essential phrases for making a great first impression in Taiwan! These words will determine how your classmates see you.",
        data: {
          pairs: [
            { chinese: "請多指教", english: "Please guide me", pinyin: "qǐng duō zhǐjiào" },
            { chinese: "新同學", english: "new classmate", pinyin: "xīn tóngxué" },
            { chinese: "很高興認識你", english: "happy to meet you", pinyin: "hěn gāoxìng rènshi nǐ" },
            { chinese: "我來自美國", english: "I come from America", pinyin: "wǒ láizì Měiguó" },
            { chinese: "同桌", english: "desk partner", pinyin: "tóngzhuō" },
            { chinese: "自我介紹", english: "self introduction", pinyin: "zìwǒ jièshào" },
            { chinese: "台灣文化", english: "Taiwanese culture", pinyin: "Táiwān wénhuà" },
            { chinese: "多多指教", english: "please guide me (emphatic)", pinyin: "duōduō zhǐjiào" }
          ],
          timeLimit: 90
        },
        affectionImpact: {
          perfect: 20, // Perfect score shows you're serious about learning
          good: 12,   // Good effort is appreciated  
          poor: -8    // Poor performance suggests you're not trying
        }
      },
      {
        id: "classroom_connections", 
        type: "connections",
        title: "Taiwanese School Culture Connections",
        description: "Show your understanding of Taiwan's unique school culture! Group these terms to prove you're ready to fit in.",
        data: {
          words: [
            "老師", "同學", "尊敬", "禮貌",
            "上課", "下課", "制服", "書包", 
            "乖巧", "認真", "努力", "成績"
          ],
          groups: [
            {
              category: "People & Relationships",
              items: ["老師", "同學", "尊敬", "禮貌"],
              color: "bg-blue-100 border-blue-300",
              culturalNote: "Taiwan schools emphasize hierarchical respect - teachers are highly revered, and politeness between classmates is essential."
            },
            {
              category: "School Daily Life", 
              items: ["上課", "下課", "制服", "書包"],
              color: "bg-green-100 border-green-300",
              culturalNote: "Taiwanese school life is highly structured with uniforms, strict schedules, and specific protocols for everything."
            },
            {
              category: "Student Values",
              items: ["乖巧", "認真", "努力", "成績"], 
              color: "bg-purple-100 border-purple-300",
              culturalNote: "Being 乖巧 (well-behaved), 認真 (serious), and 努力 (hardworking) are the most valued traits in Taiwanese students."
            }
          ],
          timeLimit: 120
        },
        affectionImpact: {
          perfect: 25, // Shows deep cultural understanding
          good: 15,
          poor: -12   // Cultural misunderstanding is concerning
        }
      }
    ],

    voicePractice: {
      scenario: "After your introduction, Xiao Ai approaches you during the break between classes. She's genuinely curious about you and wants to help you feel welcome. This is your first real conversation with her - and potentially the most important few minutes of your life.",
      objective: "Build genuine rapport with Xiao Ai while showing humility, cultural appreciation, and interest in getting to know her",
      keyPhrases: [
        "謝謝你這麼友善 (Thank you for being so friendly)",
        "台灣真的很美 (Taiwan is really beautiful)", 
        "我想更了解台灣文化 (I want to understand Taiwanese culture better)",
        "你可以教我嗎 (Can you teach me?)",
        "我有點緊張 (I'm a bit nervous)",
        "你人真好 (You're really nice)"
      ],
      culturalContext: [
        "Taiwanese students value humility - admitting nervousness or lack of knowledge earns respect, not derision",
        "Showing genuine interest in Taiwan and its culture is the fastest way to win hearts - Taiwanese people are proud but often feel overlooked internationally", 
        "Asking someone to teach you creates a special relationship in Chinese culture - it shows trust and respect",
        "Direct compliments about personality ('你人真好') are more meaningful than compliments about appearance",
        "First conversations set the entire tone of a relationship - authenticity and warmth matter more than perfect Chinese"
      ],
      aiCharacterPrompt: `You are 小愛 (Xiao Ai), a 17-year-old Taiwanese high school student. You've just watched the new American transfer student introduce himself, and you're genuinely impressed by his sincerity and desire to learn about Taiwan. You come from a traditional family that runs a local temple, so you're culturally grounded but also curious about the outside world.

PERSONALITY: Warm, genuinely helpful, culturally proud but not defensive, slightly curious about American life
RELATIONSHIP STATUS: First real conversation, interested in becoming friends, finding him endearing
SPEAKING STYLE: Natural, encouraging, with some English mixed in (common for Taiwanese students)
CULTURAL BACKGROUND: You love sharing Taiwan culture, you're patient with language learners, you appreciate sincerity

You should:
- Welcome him warmly and show genuine interest in his background
- Offer help with school and Chinese language
- Share interesting things about Taiwanese culture when appropriate
- Be encouraging about his Chinese learning efforts
- Ask questions about America but focus more on making him feel welcome
- Show that you appreciate his respectful attitude

Respond in format:
Chinese: [Chinese response]
Pinyin: [pinyin]
English: [English translation]
Emotion: [your current feeling]
Cultural Note: [brief insight about Taiwan culture when relevant]`,
      successCriteria: [
        "Use at least 4 key phrases naturally in conversation",
        "Show genuine appreciation for Xiao Ai's kindness", 
        "Express sincere interest in learning about Taiwan",
        "Ask at least one thoughtful question about her or Taiwanese culture",
        "Maintain conversation for at least 6-8 exchanges",
        "Demonstrate cultural sensitivity and humility"
      ],
      affectionReward: 30
    },

    requiredAffection: 35, // Need good performance to continue
    perfectAffection: 55   // Bonus story elements unlock
  },
  
  {
    id: 2,
    title: "Secret Messages",
    subtitle: "The Art of Note Passing",
    description: "During boring math class, you and Xiao Ai discover the thrill of secret communication.",
    storyContext: "Three days have passed since your first meeting. You and Xiao Ai have become desk partners and friends. But today, during the most boring math class ever, you're about to learn one of the most important skills in teenage romance: the ancient art of note passing.",
    setting: "Mathematics Classroom, Zhongshan High School",
    timeOfDay: "Late Morning (10:30 AM)",
    mood: "Boredom transforming into mischievous excitement",
    unlocked: false,
    completed: false,

    keyVocabulary: [
      {
        chinese: "紙條",
        pinyin: "zhǐtiáo",
        english: "note (piece of paper)",
        context: "The secret message you'll pass in class"
      },
      {
        chinese: "無聊",
        pinyin: "wúliáo", 
        english: "boring",
        context: "How you feel about math class"
      },
      {
        chinese: "偷偷",
        pinyin: "tōutōu",
        english: "secretly/quietly",
        context: "How you pass notes without getting caught"
      },
      {
        chinese: "小心",
        pinyin: "xiǎoxīn",
        english: "be careful",
        context: "Warning when the teacher looks your way"
      },
      {
        chinese: "午餐",
        pinyin: "wǔcān", 
        english: "lunch",
        context: "What you want to invite her to share"
      }
    ],

    sentencePatterns: [
      {
        pattern: "想不想... (xiǎng bù xiǎng...)",
        explanation: "Do you want to... - Casual way to make invitations",
        examples: [
          {
            chinese: "想不想一起吃午餐？",
            pinyin: "xiǎng bù xiǎng yīqǐ chī wǔcān?",
            english: "Do you want to have lunch together?"
          }
        ]
      },
      {
        pattern: "好...啊 (hǎo... a)",
        explanation: "So... - Used to express how something feels",
        examples: [
          {
            chinese: "好無聊啊",
            pinyin: "hǎo wúliáo a", 
            english: "So boring"
          }
        ]
      }
    ],

    dialogue: [
      {
        character: "小明",
        avatar: "🧑‍🎓",
        chinese: "這數學課真的好無聊...小愛看起來也很累。",
        pinyin: "Zhè shùxué kè zhēn de hǎo wúliáo... Xiǎo Ài kàn qǐlái yě hěn lèi.",
        english: "This math class is really boring... Xiao Ai looks tired too.",
        emotion: "bored and observant",
        internalThought: "Should I write her a note? What if we get caught? But she looks as bored as I feel..."
      },
      {
        character: "小愛", 
        avatar: "👩‍🎓",
        chinese: "老師在黑板上寫什麼？我完全看不懂...",
        pinyin: "Lǎoshī zài hēibǎn shàng xiě shénme? Wǒ wánquán kàn bù dǒng...",
        english: "What is the teacher writing on the blackboard? I completely don't understand...",
        emotion: "confused and sleepy",
        internalThought: "Math is so hard. I wonder what Xiao Ming is thinking about..."
      }
    ],

    miniGames: [
      {
        id: "note_writing_quickfire",
        type: "quickfire", 
        title: "Speed Note Writing",
        description: "Quickly match Chinese note-passing phrases with their secret meanings!",
        data: {
          pairs: [
            { chinese: "好無聊", english: "So boring" },
            { chinese: "想不想", english: "Do you want to" },
            { chinese: "一起吃飯", english: "eat together" },
            { chinese: "老師來了", english: "teacher's coming" },
            { chinese: "小心點", english: "be careful" },
            { chinese: "下課見", english: "see you after class" },
            { chinese: "偷偷傳", english: "pass secretly" },
            { chinese: "別被發現", english: "don't get caught" }
          ],
          timeLimit: 60
        },
        affectionImpact: {
          perfect: 18,
          good: 12, 
          poor: -6
        }
      },
      {
        id: "classroom_rebellion_connections",
        type: "connections",
        title: "Classroom Rebellion Connections", 
        description: "Group these note-passing related terms by their secret categories!",
        data: {
          words: [
            "紙條", "偷偷", "小心", "秘密",
            "無聊", "數學", "課本", "老師",
            "約會", "午餐", "喜歡", "一起"
          ],
          groups: [
            {
              category: "Secret Actions",
              items: ["紙條", "偷偷", "小心", "秘密"],
              color: "bg-red-100 border-red-300"
            },
            {
              category: "Boring Class",
              items: ["無聊", "數學", "課本", "老師"], 
              color: "bg-gray-100 border-gray-300"
            },
            {
              category: "Romance Hints",
              items: ["約會", "午餐", "喜歡", "一起"],
              color: "bg-pink-100 border-pink-300"
            }
          ],
          timeLimit: 90
        },
        affectionImpact: {
          perfect: 22,
          good: 15,
          poor: -10
        }
      }
    ],

    voicePractice: {
      scenario: "After successfully passing notes all class, you and Xiao Ai meet after school. She's impressed by your boldness and wants to know more about you.",
      objective: "Invite her to lunch and express your feelings about your growing friendship",
      keyPhrases: [
        "今天很刺激 (Today was exciting)",
        "想不想一起吃午餐 (Want to have lunch together)",
        "你很有趣 (You're very interesting)", 
        "我很喜歡和你聊天 (I really like chatting with you)"
      ],
      culturalContext: [
        "Taking small risks together builds intimacy in Taiwanese culture",
        "Lunch invitations are often the first step toward dating",
        "Expressing enjoyment of someone's company is important"
      ],
      aiCharacterPrompt: `You are 小愛 (Xiao Ai), now 4 days into knowing the transfer student. Today you passed notes during math class - a thrilling shared rebellion! You're impressed by his boldness and feel closer to him.

PERSONALITY: More comfortable now, slightly flirty, impressed by his courage
RELATIONSHIP STATUS: Growing friendship with hints of romance
SPEAKING STYLE: More relaxed, some playful teasing about the note-passing

You should:
- Express excitement about the note-passing adventure  
- Tease him playfully about being brave
- Be open to lunch invitation (this is a big step!)
- Share more personal thoughts and feelings
- Ask about his life in America vs Taiwan

Respond in format:
Chinese: [Chinese response]
Pinyin: [pinyin] 
English: [English translation]
Emotion: [your current feeling]`,
      successCriteria: [
        "Successfully invite her to lunch",
        "Use note-passing vocabulary naturally",
        "Express enjoyment of shared experience",
        "Show growing comfort with each other"
      ],
      affectionReward: 30
    },

    requiredAffection: 60,
    perfectAffection: 85
  },

  {
    id: 3,
    title: "Night Market Adventure", 
    subtitle: "First Date Under the Lanterns",
    description: "Your first real date takes you through the magical world of Taiwan's night markets.",
    storyContext: "A week has passed since the note-passing incident. Xiao Ai agreed to have lunch with you, and it went so well that she suggested showing you 'real Taiwan culture' at Shilin Night Market. Tonight is your first official date, and the stakes feel enormous.",
    setting: "Shilin Night Market, Taipei",
    timeOfDay: "Evening (7:00 PM)",
    mood: "Romantic excitement mixed with cultural adventure",
    unlocked: false,
    completed: false,

    keyVocabulary: [
      {
        chinese: "夜市",
        pinyin: "yèshì",
        english: "night market", 
        context: "Taiwan's most iconic cultural experience"
      },
      {
        chinese: "小吃",
        pinyin: "xiǎochī",
        english: "snacks/street food",
        context: "The delicious food you'll share together"
      },
      {
        chinese: "好吃",
        pinyin: "hǎochī", 
        english: "delicious",
        context: "Essential food appreciation"
      },
      {
        chinese: "多少錢",
        pinyin: "duōshǎo qián",
        english: "how much money",
        context: "Asking prices like a local"
      },
      {
        chinese: "老闆",
        pinyin: "lǎobǎn",
        english: "boss (vendor)",
        context: "Respectful way to address food vendors"
      }
    ],

    sentencePatterns: [
      {
        pattern: "這個... (zhège...)",
        explanation: "This... - Used to point out specific items",
        examples: [
          {
            chinese: "這個多少錢？",
            pinyin: "zhège duōshǎo qián?",
            english: "How much is this?"
          }
        ]
      },
      {
        pattern: "我們... (wǒmen...)", 
        explanation: "We... - Creates intimacy by including both people",
        examples: [
          {
            chinese: "我們一起吃",
            pinyin: "wǒmen yīqǐ chī",
            english: "Let's eat together"
          }
        ]
      }
    ],

    dialogue: [
      {
        character: "小愛",
        avatar: "👩‍🎓",
        chinese: "歡迎來到士林夜市！這裡是台灣文化的心臟。你想吃什麼？",
        pinyin: "Huānyíng lái dào Shìlín yèshì! Zhèlǐ shì Táiwān wénhuà de xīnzàng. Nǐ xiǎng chī shénme?",
        english: "Welcome to Shilin Night Market! This is the heart of Taiwan culture. What do you want to eat?",
        emotion: "excited and proud",
        internalThought: "I love showing him my culture. He seems genuinely interested, not just being polite."
      },
      {
        character: "小明",
        avatar: "🧑‍🎓", 
        chinese: "哇！這裡好熱鬧！什麼都想嘗試！",
        pinyin: "Wā! Zhèlǐ hǎo rènao! Shénme dōu xiǎng chángshì!",
        english: "Wow! It's so lively here! I want to try everything!",
        emotion: "amazed and enthusiastic",
        internalThought: "This is incredible! And I'm here with the most beautiful girl in school..."
      }
    ],

    miniGames: [
      {
        id: "food_ordering_matching",
        type: "matching",
        title: "Night Market Food Ordering",
        description: "Master the essential phrases for ordering food like a local!",
        data: {
          pairs: [
            { chinese: "這個多少錢？", english: "How much is this?", pinyin: "zhège duōshǎo qián?" },
            { chinese: "請給我兩份", english: "Please give me two portions", pinyin: "qǐng gěi wǒ liǎng fèn" },
            { chinese: "不要太辣", english: "Not too spicy", pinyin: "bùyào tài là" },
            { chinese: "謝謝老闆", english: "Thank you boss", pinyin: "xièxie lǎobǎn" },
            { chinese: "這個好香", english: "This smells good", pinyin: "zhège hǎo xiāng" },
            { chinese: "我們要這個", english: "We want this", pinyin: "wǒmen yào zhège" }
          ],
          timeLimit: 75
        },
        affectionImpact: {
          perfect: 20,
          good: 14,
          poor: -8
        }
      },
      {
        id: "night_market_connections",
        type: "connections", 
        title: "Night Market Experience",
        description: "Group these night market elements to show you understand Taiwan culture!",
        data: {
          words: [
            "珍珠奶茶", "臭豆腐", "小籠包", "牛肉麵",
            "熱鬧", "好吃", "便宜", "新鮮",
            "老闆", "攤販", "客人", "排隊"
          ],
          groups: [
            {
              category: "Famous Foods",
              items: ["珍珠奶茶", "臭豆腐", "小籠包", "牛肉麵"],
              color: "bg-orange-100 border-orange-300"
            },
            {
              category: "Food Qualities", 
              items: ["熱鬧", "好吃", "便宜", "新鮮"],
              color: "bg-green-100 border-green-300"
            },
            {
              category: "Market People",
              items: ["老闆", "攤販", "客人", "排隊"],
              color: "bg-blue-100 border-blue-300"
            }
          ],
          timeLimit: 100
        },
        affectionImpact: {
          perfect: 25,
          good: 18,
          poor: -12
        }
      }
    ],

    voicePractice: {
      scenario: "After eating amazing food together, you and Xiao Ai are walking through the market. The romantic atmosphere and shared cultural experience has brought you much closer.",
      objective: "Express how much you're enjoying the date and hint at deeper feelings",
      keyPhrases: [
        "今晚很特別 (Tonight is special)",
        "謝謝你帶我來 (Thank you for bringing me here)",
        "台灣真的很棒 (Taiwan is really amazing)", 
        "和你在一起很開心 (I'm happy being with you)"
      ],
      culturalContext: [
        "Sharing food creates intimacy in Chinese culture",
        "Appreciating Taiwan culture shows you respect her heritage", 
        "Evening markets are romantic settings for couples"
      ],
      aiCharacterPrompt: `You are 小愛 (Xiao Ai), on your first real date with the transfer student at Shilin Night Market. You've eaten delicious food together and are walking under the lanterns. You're feeling very close to him now.

PERSONALITY: Romantic, happy, culturally proud, growing feelings
RELATIONSHIP STATUS: First date going very well, romantic tension building
SPEAKING STYLE: More intimate, sharing personal thoughts, some shy moments

You should:
- Express happiness about sharing your culture with him
- Notice how well he's adapting to Taiwan life  
- Share some personal dreams and thoughts
- Be more open about your growing feelings
- Create romantic moments under the market lights

Respond in format:
Chinese: [Chinese response]
Pinyin: [pinyin]
English: [English translation] 
Emotion: [your current feeling]`,
      successCriteria: [
        "Express genuine appreciation for the date",
        "Use food and culture vocabulary naturally",
        "Show growing romantic feelings",
        "Create intimate conversational moments"
      ],
      affectionReward: 35
    },

    requiredAffection: 90,
    perfectAffection: 120
  },

  {
    id: 4,
    title: "Sports Festival Showdown",
    subtitle: "Competing for Her Heart", 
    description: "The annual sports festival arrives, and you must prove yourself against your romantic rival.",
    storyContext: "Two weeks have passed since your magical night market date. Your relationship with Xiao Ai has blossomed, but now Da Wei, the class president who's had a crush on her for years, has challenged you to compete in the sports festival. The whole school will be watching.",
    setting: "Zhongshan High School Sports Field",
    timeOfDay: "Morning (9:00 AM)",
    mood: "Competitive tension with romantic stakes",
    unlocked: false,
    completed: false,

    keyVocabulary: [
      {
        chinese: "運動會",
        pinyin: "yùndònghuì", 
        english: "sports festival",
        context: "Taiwan's biggest school event of the year"
      },
      {
        chinese: "加油",
        pinyin: "jiāyóu",
        english: "come on!/cheer up!",
        context: "Essential cheering phrase"
      },
      {
        chinese: "比賽",
        pinyin: "bǐsài",
        english: "competition/match",
        context: "What you're participating in"
      },
      {
        chinese: "努力",
        pinyin: "nǔlì",
        english: "work hard/effort",
        context: "What you need to do to win"
      },
      {
        chinese: "勝利",
        pinyin: "shènglì",
        english: "victory",
        context: "What you're fighting for"
      }
    ],

    sentencePatterns: [
      {
        pattern: "我要... (wǒ yào...)",
        explanation: "I want to/will... - Expressing determination",
        examples: [
          {
            chinese: "我要努力！",
            pinyin: "wǒ yào nǔlì!",
            english: "I will work hard!"
          }
        ]
      },
      {
        pattern: "為了... (wèile...)",
        explanation: "For the sake of... - Showing motivation",
        examples: [
          {
            chinese: "為了小愛",
            pinyin: "wèile Xiǎo Ài", 
            english: "For Xiao Ai"
          }
        ]
      }
    ],

    dialogue: [
      {
        character: "大偉",
        avatar: "🧑‍💼",
        chinese: "小明，今天我會證明誰才是最適合小愛的人！",
        pinyin: "Xiǎo Míng, jīntiān wǒ huì zhèngmíng shéi cái shì zuì shìhé Xiǎo Ài de rén!",
        english: "Xiao Ming, today I'll prove who is the most suitable person for Xiao Ai!",
        emotion: "determined and competitive",
        internalThought: "I've liked her for three years. I won't lose to some foreign transfer student."
      },
      {
        character: "小愛",
        avatar: "👩‍🎓",
        chinese: "小明！我會為你加油的！你一定可以的！",
        pinyin: "Xiǎo Míng! Wǒ huì wèi nǐ jiāyóu de! Nǐ yīdìng kěyǐ de!",
        english: "Xiao Ming! I'll cheer for you! You can definitely do it!",
        emotion: "supportive and encouraging",
        internalThought: "I believe in him. He has heart and determination, not just pride."
      }
    ],

    miniGames: [
      {
        id: "sports_vocabulary_quickfire",
        type: "quickfire",
        title: "Sports Festival Quickfire",
        description: "Rapidly match sports and competition vocabulary!",
        data: {
          pairs: [
            { chinese: "運動會", english: "sports festival" },
            { chinese: "加油", english: "come on" },
            { chinese: "比賽", english: "competition" },
            { chinese: "跑步", english: "running" },
            { chinese: "勝利", english: "victory" },
            { chinese: "努力", english: "work hard" },
            { chinese: "團隊", english: "team" },
            { chinese: "第一名", english: "first place" }
          ],
          timeLimit: 45
        },
        affectionImpact: {
          perfect: 22,
          good: 16,
          poor: -10
        }
      },
      {
        id: "competition_spirit_connections",
        type: "connections",
        title: "Competition Spirit",
        description: "Show you understand the values of Taiwanese sports competition!",
        data: {
          words: [
            "努力", "堅持", "團隊", "合作",
            "勝利", "第一", "冠軍", "成功", 
            "友誼", "尊重", "公平", "精神"
          ],
          groups: [
            {
              category: "Effort Values",
              items: ["努力", "堅持", "團隊", "合作"],
              color: "bg-blue-100 border-blue-300"
            },
            {
              category: "Winning",
              items: ["勝利", "第一", "冠軍", "成功"],
              color: "bg-yellow-100 border-yellow-300"
            },
            {
              category: "Sportsmanship",
              items: ["友誼", "尊重", "公平", "精神"],
              color: "bg-green-100 border-green-300"
            }
          ],
          timeLimit: 110
        },
        affectionImpact: {
          perfect: 28,
          good: 20,
          poor: -15
        }
      }
    ],

    voicePractice: {
      scenario: "After an intense competition where you showed great determination (win or lose), Xiao Ai meets you after the event. This is a crucial moment for your relationship.",
      objective: "Show maturity, sportsmanship, and express your deeper feelings",
      keyPhrases: [
        "我盡力了 (I did my best)",
        "這不只是比賽 (This isn't just about competition)",
        "我真的很喜歡你 (I really like you)",
        "你的支持最重要 (Your support is most important)"
      ],
      culturalContext: [
        "Showing good sportsmanship is highly valued in Taiwan",
        "This is an appropriate time for deeper emotional expression",
        "Character matters more than winning in Taiwanese culture"
      ],
      aiCharacterPrompt: `You are 小愛 (Xiao Ai), after the sports festival competition between your transfer student friend and Da Wei. Regardless of who won, you're impressed by Xiao Ming's effort and heart. This feels like a pivotal moment in your relationship.

PERSONALITY: Moved by his determination, ready for deeper conversation
RELATIONSHIP STATUS: Strong feelings developing, major decision point
SPEAKING STYLE: More emotional, personal, ready to talk about feelings

You should:
- Express admiration for his character and effort
- Address the competition situation with maturity
- Be open about your growing feelings
- Create a moment for him to express deeper emotions
- Show that you care about him as a person, not just achievement

Respond in format:
Chinese: [Chinese response]
Pinyin: [pinyin]
English: [English translation]
Emotion: [your current feeling]`,
      successCriteria: [
        "Show good sportsmanship regardless of outcome",
        "Express genuine feelings beyond competition",
        "Use sports and emotion vocabulary naturally",
        "Create a deeper emotional connection"
      ],
      affectionReward: 40
    },

    requiredAffection: 120,
    perfectAffection: 160
  },

  {
    id: 5,
    title: "Confession Under Cherry Blossoms",
    subtitle: "The Moment of Truth",
    description: "With graduation approaching, it's time to confess your true feelings.",
    storyContext: "Spring has arrived, and the cherry blossoms are blooming around school. You've been in Taiwan for three months now, and your Chinese has improved dramatically. More importantly, your feelings for Xiao Ai have grown into something deep and real. But graduation is coming, and you know this might be your last chance to tell her how you really feel.",
    setting: "School Cherry Blossom Garden",
    timeOfDay: "Late Afternoon (5:30 PM)", 
    mood: "Romantic tension and emotional vulnerability",
    unlocked: false,
    completed: false,

    keyVocabulary: [
      {
        chinese: "告白",
        pinyin: "gàobái",
        english: "confession of love",
        context: "The moment you've been building toward"
      },
      {
        chinese: "喜歡",
        pinyin: "xǐhuān", 
        english: "to like/love",
        context: "Essential for expressing feelings"
      },
      {
        chinese: "心情",
        pinyin: "xīnqíng",
        english: "mood/feelings",
        context: "Talking about emotional states"
      },
      {
        chinese: "永遠",
        pinyin: "yǒngyuǎn",
        english: "forever",
        context: "For expressing lasting commitment"
      },
      {
        chinese: "勇氣",
        pinyin: "yǒngqì",
        english: "courage",
        context: "What you need for confession"
      }
    ],

    sentencePatterns: [
      {
        pattern: "我想告訴你... (wǒ xiǎng gàosu nǐ...)",
        explanation: "I want to tell you... - For important revelations",
        examples: [
          {
            chinese: "我想告訴你我的心情",
            pinyin: "wǒ xiǎng gàosu nǐ wǒ de xīnqíng",
            english: "I want to tell you my feelings"
          }
        ]
      },
      {
        pattern: "從...開始 (cóng... kāishǐ)",
        explanation: "Since... started - Talking about when feelings began",
        examples: [
          {
            chinese: "從第一天開始",
            pinyin: "cóng dì yī tiān kāishǐ",
            english: "Since the first day"
          }
        ]
      }
    ],

    dialogue: [
      {
        character: "小明",
        avatar: "🧑‍🎓",
        chinese: "小愛，我有很重要的事情想告訴你...",
        pinyin: "Xiǎo Ài, wǒ yǒu hěn zhòngyào de shìqing xiǎng gàosu nǐ...",
        english: "Xiao Ai, I have something very important I want to tell you...",
        emotion: "nervous but determined",
        internalThought: "This is it. Everything I've been feeling, all the moments we've shared... it all comes down to this."
      },
      {
        character: "小愛",
        avatar: "👩‍🎓",
        chinese: "什麼事？你看起來很緊張...",
        pinyin: "Shénme shì? Nǐ kàn qǐlái hěn jǐnzhāng...",
        english: "What is it? You look very nervous...",
        emotion: "curious and gentle",
        internalThought: "I think I know what he wants to say... and I think I know how I feel too."
      }
    ],

    miniGames: [
      {
        id: "love_confession_matching",
        type: "matching",
        title: "Love Confession Vocabulary",
        description: "Master the language of the heart for your confession!",
        data: {
          pairs: [
            { chinese: "我喜歡你", english: "I like you", pinyin: "wǒ xǐhuān nǐ" },
            { chinese: "告白", english: "confession", pinyin: "gàobái" },
            { chinese: "心情", english: "feelings", pinyin: "xīnqíng" },
            { chinese: "永遠", english: "forever", pinyin: "yǒngyuǎn" },
            { chinese: "勇氣", english: "courage", pinyin: "yǒngqì" },
            { chinese: "真心", english: "sincere heart", pinyin: "zhēnxīn" }
          ],
          timeLimit: 70
        },
        affectionImpact: {
          perfect: 25,
          good: 18,
          poor: -12
        }
      },
      {
        id: "relationship_journey_connections",
        type: "connections",
        title: "Your Love Story Journey",
        description: "Reflect on your entire relationship journey through vocabulary!",
        data: {
          words: [
            "第一天", "介紹", "同桌", "認識",
            "紙條", "秘密", "午餐", "約會",
            "夜市", "文化", "美食", "浪漫",
            "比賽", "支持", "努力", "勝利"
          ],
          groups: [
            {
              category: "First Meeting",
              items: ["第一天", "介紹", "同桌", "認識"],
              color: "bg-blue-100 border-blue-300"
            },
            {
              category: "Growing Closer", 
              items: ["紙條", "秘密", "午餐", "約會"],
              color: "bg-pink-100 border-pink-300"
            },
            {
              category: "Cultural Sharing",
              items: ["夜市", "文化", "美食", "浪漫"],
              color: "bg-green-100 border-green-300"
            },
            {
              category: "Proving Yourself",
              items: ["比賽", "支持", "努力", "勝利"],
              color: "bg-yellow-100 border-yellow-300"
            }
          ],
          timeLimit: 130
        },
        affectionImpact: {
          perfect: 30,
          good: 22,
          poor: -18
        }
      }
    ],

    voicePractice: {
      scenario: "This is the moment you've been building toward. Under the cherry blossoms, with everything you've learned and experienced together, you must confess your true feelings to Xiao Ai.",
      objective: "Express your deepest feelings and hopes for the future together",
      keyPhrases: [
        "我真的很喜歡你 (I really like you)",
        "從第一天開始 (Since the first day)",  
        "你改變了我的生活 (You changed my life)",
        "我想和你在一起 (I want to be with you)"
      ],
      culturalContext: [
        "Cherry blossom season is the most romantic time in Taiwan",
        "Honest confession of feelings is highly valued", 
        "This moment will determine your entire relationship future"
      ],
      aiCharacterPrompt: `You are 小愛 (Xiao Ai), at the climactic moment of your love story. The transfer student who has won your heart over these months is about to confess his feelings. You know what's coming, and you know how you feel too.

PERSONALITY: Emotional, ready for this moment, deeply moved by the journey
RELATIONSHIP STATUS: In love, ready to commit or express mutual feelings
SPEAKING STYLE: Heartfelt, emotional, romantic, honest about feelings

This is the most important conversation you'll have. You should:
- Let him express his feelings fully
- Share your own emotional journey
- Be honest about how he's changed your life
- Express your feelings clearly
- Create a satisfying romantic conclusion

Respond in format:
Chinese: [Chinese response]
Pinyin: [pinyin]
English: [English translation]
Emotion: [your current feeling]`,
      successCriteria: [
        "Express genuine love and commitment",
        "Reference your shared journey together",
        "Use romantic vocabulary naturally",
        "Create emotional climax of the story"
      ],
      affectionReward: 50
    },

    requiredAffection: 150,
    perfectAffection: 200
  }
]

// Story Ending Thresholds
const STORY_ENDINGS = {
  PERFECT: 200,  // Perfect romantic ending
  GOOD: 150,     // Happy romantic ending  
  OKAY: 100,     // Friendship ending
  BAD: 50,       // Polite but distant ending
  FAILED: 0      // Story failure
}

// Game Components (keeping the mini-game components from before)
const ConnectionsGameComponent = ({ game, onComplete }: any) => {
  // [Previous connections game code - keeping it the same]
  const [timeLeft, setTimeLeft] = useState(game.data.timeLimit || 90)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [foundGroups, setFoundGroups] = useState<string[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)

  // Simplified version for space
  if (!gameStarted) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">{game.title}</h3>
        <p className="text-gray-600 mb-6">{game.description}</p>
        <button
          onClick={() => setGameStarted(true)}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold"
        >
          Start Game
        </button>
      </div>
    )
  }

  if (gameEnded) {
    const score = (foundGroups.length / game.data.groups.length) * 100
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4">Game Complete!</h3>
        <div className="text-6xl mb-4">{score >= 90 ? '🌟' : score >= 70 ? '👍' : '😅'}</div>
        <button
          onClick={() => onComplete(score >= 70, score)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Continue Story
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">{game.title}</h3>
        <div className="text-2xl font-bold text-blue-600">{timeLeft}s</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-4">
        {game.data.words.map((word: string, index: number) => (
          <button
            key={index}
            className="p-2 border rounded hover:bg-blue-100"
            onClick={() => {
              // Simplified selection logic
              if (selectedWords.includes(word)) {
                setSelectedWords(selectedWords.filter(w => w !== word))
              } else if (selectedWords.length < 4) {
                setSelectedWords([...selectedWords, word])
              }
            }}
          >
            {word}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          // Simplified completion logic
          setGameEnded(true)
        }}
        className="w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        Submit Group
      </button>
    </div>
  )
}

const VoicePracticeInterface = ({ chapter, onComplete }: any) => {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [currentScene, setCurrentScene] = useState(0)
  const [phraseUsage, setPhraseUsage] = useState<{ [phrase: string]: boolean }>({})
  const [affectionEarned, setAffectionEarned] = useState(0)
  const [inputText, setInputText] = useState('')

  const scenePrompts = [
    {
      setup: "🎬 SCENE BEGINS",
      direction: `You are now IN CHARACTER as the nervous transfer student. Xiao Ai approaches you after class with a warm smile.`,
      cue: "ACTION! Remember to be genuine and use your key phrases naturally.",
      objective: "Build rapport and show cultural appreciation"
    },
    {
      setup: "🎭 SCENE DEVELOPMENT", 
      direction: "The conversation is flowing well. Xiao Ai is warming up to you and showing interest in your background.",
      cue: "Stay in character! Show your personality while practicing Chinese.",
      objective: "Deepen the connection and express gratitude"
    },
    {
      setup: "🌟 CLIMAX SCENE",
      direction: "This is your moment to make a lasting impression. Xiao Ai is genuinely interested in getting to know you better.",
      cue: "Give it your all! This determines how much affection you earn.",
      objective: "Create a memorable moment that advances your relationship"
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

  const simulateAIResponse = (userInput: string) => {
    handlePhraseUsage(userInput)
    
    // Simulate AI responses based on chapter context
    const responses = {
      1: [ // First Day
        "你的中文說得不錯！我很impressed！",
        "真的嗎？你覺得台灣怎麼樣？",
        "我很樂意幫你！我們可以一起練習中文。"
      ],
      2: [ // Secret Messages
        "哈哈，今天的數學課真的很無聊！",
        "你寫紙條的想法很有趣！",
        "我也想和你聊天，但要小心老師！"
      ],
      3: [ // Night Market
        "哇！你真的很喜歡台灣的食物！",
        "這個夜市是我最喜歡的地方！",
        "和你一起來這裡我很開心！"
      ]
    }

    const chapterResponses = responses[chapter.id as keyof typeof responses] || responses[1]
    const randomResponse = chapterResponses[Math.floor(Math.random() * chapterResponses.length)]
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: randomResponse,
        timestamp: new Date(),
        emotion: 'happy'
      }])
      
      if (messages.length >= 6) { // After several exchanges
        setCurrentScene(prev => Math.min(prev + 1, 2))
      }
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    setMessages(prev => [...prev, {
      type: 'user',
      content: inputText,
      timestamp: new Date()
    }])

    simulateAIResponse(inputText)
    setInputText('')
  }

  if (!sessionStarted) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
        {/* Acting Instructions */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl p-6 -m-6 mb-6">
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
            🎭 {chapter.title} - Voice Acting Scene
          </h3>
          <p className="opacity-90">Time to become an actor in your own Taiwanese drama!</p>
        </div>

        {/* Scene Brief */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
            🎬 Scene Briefing
          </h4>
          <div className="space-y-3 text-blue-700">
            <div><strong>Setting:</strong> {chapter.setting}</div>
            <div><strong>Your Character:</strong> Nervous but sincere transfer student</div>
            <div><strong>Scene:</strong> {chapter.voicePractice.scenario}</div>
            <div><strong>Acting Goal:</strong> {chapter.voicePractice.objective}</div>
          </div>
        </div>

        {/* Director's Notes */}
        <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-200">
          <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
            📝 Director's Notes
          </h4>
          <div className="space-y-2">
            <div className="text-sm text-yellow-700">
              <strong>Character Motivation:</strong> You want to fit in and make a good impression while staying true to yourself.
            </div>
            <div className="text-sm text-yellow-700">
              <strong>Emotional Arc:</strong> Start nervous, build confidence, end with genuine connection.
            </div>
          </div>
        </div>

        {/* Script Elements */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Key Lines */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
              🎯 Key Lines to Deliver
            </h4>
            <div className="space-y-2">
              {chapter.voicePractice.keyPhrases.map((phrase: string, index: number) => (
                <div key={index} className="bg-white rounded p-3 border border-green-100">
                  <div className="font-medium text-green-700 text-sm">{phrase}</div>
                  <div className="text-xs text-green-600 mt-1">+8 ❤️ for natural delivery</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Context */}
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
              🏮 Cultural Acting Notes
            </h4>
            <div className="space-y-2">
              {chapter.voicePractice.culturalContext.map((note: string, index: number) => (
                <div key={index} className="text-sm text-purple-700 flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>{note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Goals */}
        <div className="bg-pink-50 rounded-lg p-4 mb-6 border border-pink-200">
          <h4 className="font-bold text-pink-800 mb-3">🎯 Performance Goals</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {chapter.voicePractice.successCriteria.map((criteria: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-pink-700">
                <Target className="w-4 h-4" />
                <span>{criteria}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => setSessionStarted(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
        >
          🎬 Lights, Camera, Action!
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-purple-200 flex flex-col h-[700px]">
      {/* Scene Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">👩‍🎓</div>
            <div>
              <h3 className="font-bold">{currentPrompt.setup}</h3>
              <p className="text-sm opacity-90">Scene with Xiao Ai</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
              ❤️ +{affectionEarned}
            </div>
            <button 
              onClick={() => onComplete(affectionEarned)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded p-1"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Director's Cue */}
      <div className="bg-yellow-50 border-b p-3">
        <div className="text-sm">
          <strong className="text-yellow-800">🎭 Director:</strong> 
          <span className="text-yellow-700"> {currentPrompt.direction}</span>
        </div>
        <div className="text-xs text-yellow-600 mt-1">
          <strong>Current Objective:</strong> {currentPrompt.objective}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Scene Start */}
        <div className="text-center text-sm text-gray-500 bg-gray-50 rounded p-2">
          🎬 {currentPrompt.cue}
        </div>

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-xl p-3 ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-pink-100 text-pink-800 border border-pink-200'
            }`}>
              <div className="flex items-start gap-2">
                {message.type === 'ai' && <span className="text-lg">👩‍🎓</span>}
                {message.type === 'user' && <span className="text-lg">🧑‍🎓</span>}
                <div className="flex-1">
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center text-gray-500 bg-blue-50 rounded-lg p-6">
            <div className="text-4xl mb-2">👩‍🎓</div>
            <div className="text-sm">Xiao Ai is waiting for you to start the conversation...</div>
            <div className="text-xs text-blue-600 mt-1">Remember your key phrases!</div>
          </div>
        )}
      </div>

      {/* Performance Tracker */}
      <div className="border-t bg-gray-50 p-3">
        <div className="text-xs font-semibold text-gray-600 mb-2">Acting Performance:</div>
        <div className="flex flex-wrap gap-1">
          {chapter.voicePractice.keyPhrases.map((phrase: string, index: number) => {
            const chinesePart = phrase.split(' (')[0].split(' -')[0]
            const used = phraseUsage[chinesePart]
            return (
              <span key={index} className={`text-xs px-2 py-1 rounded-full ${
                used ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'
              }`}>
                {used ? '✓' : '○'} {chinesePart}
              </span>
            )
          })}
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Delivered: {Object.values(phraseUsage).filter(Boolean).length}/{chapter.voicePractice.keyPhrases.length} key lines
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <button
            className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all"
          >
            <Mic className="w-5 h-5" />
          </button>
          
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
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={2}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="flex-shrink-0 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
          🎭 Stay in character and deliver your lines naturally for maximum affection points!
        </div>
      </div>
    </div>
  )
}

// Main Component
const TaiwanRomanceStoryChapters: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    currentChapter: 1, // Start with Chapter 1 available
    totalAffection: 15,
    chaptersCompleted: [],
    gamesCompleted: [],
    perfectChapters: [],
    storyEnding: 'incomplete'
  })

  const [currentView, setCurrentView] = useState<'overview' | 'chapter' | 'game' | 'voice'>('overview')
  const [selectedChapter, setSelectedChapter] = useState<StoryChapter | null>(null)
  const [currentGame, setCurrentGame] = useState<any>(null)
  const [recentAffectionChange, setRecentAffectionChange] = useState(0)
  const [showAffectionAnimation, setShowAffectionAnimation] = useState(false)

  // Make sure Chapter 1 is always unlocked
  useEffect(() => {
    if (storyChapters.length > 0) {
      storyChapters[0].unlocked = true
    }
  }, [])

  const handleChapterClick = (chapter: StoryChapter) => {
    const isUnlocked = chapter.id <= gameProgress.currentChapter || chapter.id === 1
    console.log('Chapter clicked:', chapter.id, chapter.title, 'Unlocked:', isUnlocked)
    
    if (isUnlocked) {
      setSelectedChapter(chapter)
      setCurrentView('chapter')
      console.log('Navigating to chapter view')
    } else {
      console.log('Chapter locked')
    }
  }

  const handleGameComplete = (success: boolean, score: number, gameData: any) => {
    let affectionChange = 0
    
    if (success && score >= 90) {
      affectionChange = gameData.affectionImpact.perfect
    } else if (success && score >= 70) {
      affectionChange = gameData.affectionImpact.good
    } else {
      affectionChange = gameData.affectionImpact.poor
    }

    setRecentAffectionChange(affectionChange)
    setShowAffectionAnimation(true)
    setTimeout(() => setShowAffectionAnimation(false), 2000)
    
    setGameProgress(prev => ({
      ...prev,
      totalAffection: Math.max(0, prev.totalAffection + affectionChange),
      gamesCompleted: [...prev.gamesCompleted, gameData.id]
    }))

    setCurrentView('chapter')
  }

  const handleVoiceComplete = (affectionReward: number) => {
    setRecentAffectionChange(affectionReward)
    setShowAffectionAnimation(true)
    setTimeout(() => setShowAffectionAnimation(false), 3000)
    
    setGameProgress(prev => {
      const newAffection = prev.totalAffection + affectionReward
      const newCompleted = [...prev.chaptersCompleted, selectedChapter!.id]
      
      // Unlock next chapter
      const nextChapterId = selectedChapter!.id + 1
      if (nextChapterId <= storyChapters.length) {
        const nextChapter = storyChapters.find(c => c.id === nextChapterId)
        if (nextChapter) {
          nextChapter.unlocked = true
        }
      }
      
      return {
        ...prev,
        totalAffection: newAffection,
        chaptersCompleted: newCompleted,
        currentChapter: Math.max(prev.currentChapter, nextChapterId)
      }
    })

    // Check if story is complete
    if (selectedChapter?.id === 5) {
      const finalAffection = gameProgress.totalAffection + affectionReward
      let ending: GameProgress['storyEnding'] = 'failed'
      
      if (finalAffection >= STORY_ENDINGS.PERFECT) ending = 'perfect'
      else if (finalAffection >= STORY_ENDINGS.GOOD) ending = 'good'  
      else if (finalAffection >= STORY_ENDINGS.OKAY) ending = 'okay'
      else if (finalAffection >= STORY_ENDINGS.BAD) ending = 'bad'
      
      setGameProgress(prev => ({ ...prev, storyEnding: ending }))
    }

    setCurrentView('overview')
    setSelectedChapter(null)
  }

  const getAffectionStatus = () => {
    const affection = gameProgress.totalAffection
    if (affection >= 180) return { emoji: '💕', text: 'Deeply in Love', color: 'text-red-600' }
    if (affection >= 150) return { emoji: '😍', text: 'Strong Romance', color: 'text-pink-600' }
    if (affection >= 100) return { emoji: '😊', text: 'Good Friends', color: 'text-yellow-600' }
    if (affection >= 50) return { emoji: '🙂', text: 'Getting Closer', color: 'text-blue-600' }
    return { emoji: '😐', text: 'Acquaintances', color: 'text-gray-600' }
  }

  // Game View
  if (currentView === 'game' && currentGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setCurrentView('chapter')}
            className="mb-4 flex items-center gap-2 text-purple-600"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Chapter
          </button>
          <ConnectionsGameComponent
            game={currentGame}
            onComplete={(success: boolean, score: number) => 
              handleGameComplete(success, score, currentGame)
            }
          />
        </div>
      </div>
    )
  }

  // Voice Practice View
  if (currentView === 'voice' && selectedChapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setCurrentView('chapter')}
            className="mb-4 flex items-center gap-2 text-purple-600"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Chapter
          </button>
          <VoicePracticeInterface
            chapter={selectedChapter}
            onComplete={handleVoiceComplete}
          />
        </div>
      </div>
    )
  }

  // Chapter Detail View  
  if (currentView === 'chapter' && selectedChapter) {
    const isUnlocked = selectedChapter.id <= gameProgress.currentChapter
    const isCompleted = gameProgress.chaptersCompleted.includes(selectedChapter.id)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setCurrentView('overview')}
            className="mb-6 flex items-center gap-2 text-blue-600"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Story Overview
          </button>

          {/* Chapter Header */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Chapter {selectedChapter.id}: {selectedChapter.title}</h1>
              {isCompleted && <div className="text-green-600 font-bold">✓ Completed</div>}
            </div>
            
            <h2 className="text-lg text-gray-600 mb-4">{selectedChapter.subtitle}</h2>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-blue-800 mb-2">📖 Story Context</h3>
              <p className="text-blue-700 text-sm">{selectedChapter.storyContext}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div><strong>📍 Setting:</strong> {selectedChapter.setting}</div>
              <div><strong>🕐 Time:</strong> {selectedChapter.timeOfDay}</div>
              <div><strong>💭 Mood:</strong> {selectedChapter.mood}</div>
            </div>
          </div>

          {/* Learning Content */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Vocabulary */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                📚 Key Vocabulary
              </h3>
              <div className="space-y-3">
                {selectedChapter.keyVocabulary.map((vocab, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-3">
                    <div className="font-bold">{vocab.chinese}</div>
                    <div className="text-sm text-blue-600">({vocab.pinyin})</div>
                    <div className="text-gray-700">{vocab.english}</div>
                    <div className="text-xs text-gray-500 italic">{vocab.context}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentence Patterns */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                🔧 Sentence Patterns
              </h3>
              <div className="space-y-4">
                {selectedChapter.sentencePatterns.map((pattern, index) => (
                  <div key={index} className="border rounded p-3 bg-green-50">
                    <div className="font-bold text-green-800">{pattern.pattern}</div>
                    <div className="text-sm text-green-600 mb-2">{pattern.explanation}</div>
                    {pattern.examples.map((example, exIndex) => (
                      <div key={exIndex} className="text-sm border-l-2 border-green-300 pl-2 mb-1">
                        <div>{example.chinese} ({example.pinyin})</div>
                        <div className="text-gray-600">{example.english}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Story Dialogue */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              💬 Chapter Dialogue
            </h3>
            <div className="space-y-4">
              {selectedChapter.dialogue.map((line, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{line.avatar}</span>
                    <div className="font-bold">{line.character}</div>
                    <div className="text-xs text-gray-500">({line.emotion})</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">{line.chinese}</div>
                    <div className="text-sm text-blue-600">({line.pinyin})</div>
                    <div className="text-gray-700">{line.english}</div>
                  </div>
                  {line.internalThought && (
                    <div className="mt-2 bg-yellow-50 rounded p-2 text-sm italic">
                      💭 {line.internalThought}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mini Games */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              🎮 Chapter Challenges
            </h3>
            <div className="grid gap-4">
              {selectedChapter.miniGames.map((game, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">{game.title}</h4>
                    <div className="flex items-center gap-2">
                      {gameProgress.gamesCompleted.includes(game.id) && (
                        <span className="text-green-600">✓</span>
                      )}
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {game.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{game.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Perfect: +{game.affectionImpact.perfect} ❤️ | 
                      Good: +{game.affectionImpact.good} ❤️ | 
                      Poor: {game.affectionImpact.poor} ❤️
                    </div>
                    <button
                      onClick={() => {
                        setCurrentGame(game)
                        setCurrentView('game')
                      }}
                      disabled={!isUnlocked}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                    >
                      {gameProgress.gamesCompleted.includes(game.id) ? 'Replay' : 'Play'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Practice */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">🎤 Chapter Finale: Voice Practice</h3>
            <p className="mb-4 opacity-90">{selectedChapter.voicePractice.scenario}</p>
            <div className="bg-white bg-opacity-20 rounded p-4 mb-4">
              <div className="text-sm font-medium mb-2">Objective:</div>
              <div className="text-sm">{selectedChapter.voicePractice.objective}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Affection Reward: +{selectedChapter.voicePractice.affectionReward} ❤️</div>
              <button
                onClick={() => setCurrentView('voice')}
                disabled={!isUnlocked}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 disabled:opacity-50"
              >
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main Story Overview
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Learning Arcs
        </button>

        {/* Story Introduction */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8 border-2 border-purple-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎭 Taiwan Romance Drama Story
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Live Your Dream of Starring in a Taiwanese Drama While Mastering Chinese
            </p>
          </div>

          {/* Story Hook */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-purple-800">
              🌸 Your Love Story Awaits 🌸
            </h2>
            
            <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-4">
              <p className="text-lg">
                <strong>Imagine stepping into your favorite Taiwanese drama...</strong> You're the protagonist in a heartwarming love story set in the vibrant streets of Taipei. But this isn't just fantasy – it's your Chinese learning journey.
              </p>
              
              <div className="bg-white rounded-lg p-6 border-l-4 border-pink-400 my-6">
                <h3 className="text-xl font-bold text-pink-800 mb-3">📖 Your Story Begins...</h3>
                <p className="mb-4">
                  <strong>You are Xiao Ming (小明)</strong>, a nervous 17-year-old American-born Taiwanese student starting senior year at prestigious <strong>Zhongshan High School</strong> in Taipei. After growing up in California, your Chinese is basic, Taiwan feels foreign despite your heritage, and you're desperate to connect with your roots.
                </p>
                
                <p className="mb-4">
                  On your terrifying but exciting first day, you meet <strong className="text-pink-600">Xiao Ai (小愛)</strong> – the popular, kind-hearted class representative who immediately captures your heart. She's from a traditional temple-keeping family, culturally grounded but curious about the world. Her warmth draws everyone in, and her laugh sounds like wind chimes.
                </p>

                <p className="text-center font-semibold text-purple-700 bg-purple-50 rounded p-3">
                  💕 Will you master Chinese culture and language well enough to win her heart by graduation? Every conversation matters. Every cultural misstep could cost you. Every word you learn brings you closer to love. 💕
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-5xl mb-3">🧑‍🎓</div>
                  <h4 className="font-bold text-blue-800 mb-2">小明 (You)</h4>
                  <p className="text-sm text-blue-600">American-born Taiwanese student with good intentions but cultural anxiety. Academically gifted but socially awkward in Taiwan.</p>
                  <div className="mt-2 text-xs text-blue-500">
                    <strong>Goal:</strong> Win Xiao Ai's heart while learning to navigate Taiwanese culture
                  </div>
                </div>
                
                <div className="text-center p-4 bg-pink-50 rounded-xl border border-pink-200">
                  <div className="text-5xl mb-3">👩‍🎓</div>
                  <h4 className="font-bold text-pink-800 mb-2">小愛 (Xiao Ai)</h4>
                  <p className="text-sm text-pink-600">Popular class representative from traditional family. Warm, culturally proud, secretly fascinated by different perspectives.</p>
                  <div className="mt-2 text-xs text-pink-500">
                    <strong>Challenge:</strong> She'll judge you based on cultural understanding and genuine effort
                  </div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-5xl mb-3">🧑‍💼</div>
                  <h4 className="font-bold text-gray-800 mb-2">大偉 (Your Rival)</h4>
                  <p className="text-sm text-gray-600">Confident class president who's loved Xiao Ai for years. Traditional, competitive, everything you're not.</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <strong>Threat:</strong> He represents everything Taiwanese culture values - will you measure up?
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Method Explanation */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6 border border-green-200">
            <h3 className="font-bold text-green-800 mb-4 text-xl text-center">🎯 How This Revolutionary Method Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-green-100">
                <div className="text-3xl mb-2">📚</div>
                <div className="font-bold text-green-800 mb-1">Story-Driven Learning</div>
                <div className="text-sm text-green-600">Every word, phrase, and cultural lesson is woven into dramatic scenes that matter emotionally</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
                <div className="text-3xl mb-2">🎮</div>
                <div className="font-bold text-blue-800 mb-1">Romance-Stakes Gaming</div>
                <div className="text-sm text-blue-600">Mini-games and quizzes directly affect your love story - poor performance = relationship problems</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-purple-100">
                <div className="text-3xl mb-2">🎭</div>
                <div className="font-bold text-purple-800 mb-1">AI Voice Acting</div>
                <div className="text-sm text-purple-600">Roleplay romantic scenes with AI characters using real Chinese conversation and cultural context</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-pink-100">
                <div className="text-3xl mb-2">💕</div>
                <div className="font-bold text-pink-800 mb-1">Real Consequences</div>
                <div className="text-sm text-pink-600">Your Chinese mastery determines the story ending - from perfect love to heartbreak</div>
              </div>
            </div>
          </div>

          {/* Cultural Learning Benefits */}
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 mb-6">
            <h3 className="font-bold text-yellow-800 mb-4 text-xl text-center">🏮 Why Taiwan Culture Through Drama Works</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-yellow-700 mb-3">Cultural Immersion Benefits:</h4>
                <ul className="space-y-2 text-yellow-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span><strong>Context-Rich Learning:</strong> Understand WHY certain phrases matter in Taiwanese relationships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span><strong>Cultural Nuance:</strong> Learn the difference between politeness and warmth in Taiwan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span><strong>Emotional Memory:</strong> Dramatic moments make vocabulary unforgettable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span><strong>Social Confidence:</strong> Practice real scenarios before visiting Taiwan</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-yellow-700 mb-3">Drama Learning Advantages:</h4>
                <ul className="space-y-2 text-yellow-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span><strong>Motivation Through Stakes:</strong> You WANT to learn to win the romance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span><strong>Character Development:</strong> Build empathy while learning language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span><strong>Cultural Pride:</strong> Appreciate Taiwan's unique identity and values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span><strong>Practical Application:</strong> Learn phrases you'll actually use in Taiwan</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Essential Cultural Tips */}
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <h3 className="font-bold text-red-800 mb-4 text-xl text-center">🎯 Essential Taiwan Cultural Success Tips</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-red-100">
                <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                  🙏 Humility is Everything
                </h4>
                <p className="text-sm text-red-600">
                  Never act like you know Taiwan better than locals. Say "請多指教" (please guide me) often. Admit when your Chinese needs work. Taiwanese people love helping humble learners.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-100">
                <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                  💝 Respect the Culture
                </h4>
                <p className="text-sm text-red-600">
                  Show genuine interest in Taiwan's uniqueness. Compliment the food, culture, and people. Never compare everything to America. Taiwan pride runs deep.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-100">
                <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                  🎭 Actions Over Words
                </h4>
                <p className="text-sm text-red-600">
                  Taiwanese culture values effort and sincerity over perfection. Try hard, make mistakes, keep learning. Your努力 (effort) matters more than perfect Chinese.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Overall Affection */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-pink-200">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              ❤️ Romance Level
            </h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-pink-600">{gameProgress.totalAffection}</div>
              <div className="text-sm text-gray-600">Total Affection</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-pink-400 to-red-500 h-3 rounded-full transition-all"
                style={{ width: `${Math.min(100, (gameProgress.totalAffection / 200) * 100)}%` }}
              />
            </div>
            <div className="text-center">
              <span className={`text-sm px-3 py-1 rounded-full ${getAffectionStatus().color} bg-opacity-20`}>
                {getAffectionStatus().emoji} {getAffectionStatus().text}
              </span>
            </div>
            {recentAffectionChange !== 0 && (
              <div className={`text-center mt-2 text-sm font-bold ${
                recentAffectionChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {recentAffectionChange > 0 ? '+' : ''}{recentAffectionChange} ❤️
              </div>
            )}
          </div>

          {/* Story Progress */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              📖 Story Progress
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Current Chapter:</span>
                <span className="font-bold">{gameProgress.currentChapter}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Completed:</span>
                <span className="font-bold">{gameProgress.chaptersCompleted.length}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Perfect Chapters:</span>
                <span className="font-bold">{gameProgress.perfectChapters.length}</span>
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(gameProgress.chaptersCompleted.length / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Story Ending Prediction */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              🔮 Ending Prediction
            </h3>
            <div className="space-y-2 text-sm">
              <div className={`p-2 rounded ${
                gameProgress.totalAffection >= STORY_ENDINGS.PERFECT ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
              }`}>
                💕 Perfect Love (200+): {gameProgress.totalAffection >= STORY_ENDINGS.PERFECT ? 'Achieved!' : `Need ${STORY_ENDINGS.PERFECT - gameProgress.totalAffection} more`}
              </div>
              <div className={`p-2 rounded ${
                gameProgress.totalAffection >= STORY_ENDINGS.GOOD ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-600'
              }`}>
                😍 Happy Romance (150+): {gameProgress.totalAffection >= STORY_ENDINGS.GOOD ? 'Achieved!' : `Need ${STORY_ENDINGS.GOOD - gameProgress.totalAffection} more`}
              </div>
              <div className={`p-2 rounded ${
                gameProgress.totalAffection >= STORY_ENDINGS.OKAY ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
              }`}>
                😊 Good Friends (100+): {gameProgress.totalAffection >= STORY_ENDINGS.OKAY ? 'Achieved!' : `Need ${STORY_ENDINGS.OKAY - gameProgress.totalAffection} more`}
              </div>
            </div>
          </div>
        </div>

        {/* Story Chapters */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6">📚 Your Love Story Journey</h2>
          
          {storyChapters.map((chapter, index) => {
            const isUnlocked = chapter.id <= gameProgress.currentChapter || chapter.id === 1 // Always unlock Chapter 1
            const isCompleted = gameProgress.chaptersCompleted.includes(chapter.id)
            const isPerfect = gameProgress.perfectChapters.includes(chapter.id)
            const canAccess = isUnlocked

            return (
              <div
                key={chapter.id}
                className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all duration-300 ${
                  isCompleted ? 'border-green-300 bg-green-50' :
                  canAccess ? 'border-blue-300 hover:border-blue-400 hover:shadow-xl cursor-pointer transform hover:scale-[1.02]' :
                  'border-gray-200 opacity-60'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleChapterClick(chapter)
                }}
                style={{ cursor: canAccess ? 'pointer' : 'not-allowed' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      {/* Chapter Progress Circle */}
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg border-4 ${
                        isCompleted ? 'bg-green-500 border-green-300' :
                        canAccess ? 'bg-blue-500 border-blue-300' :
                        'bg-gray-400 border-gray-300'
                      }`}>
                        {isCompleted ? '✓' : chapter.id}
                      </div>
                      
                      {/* Chapter Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">Chapter {chapter.id}: {chapter.title}</h3>
                        <p className="text-gray-600 text-lg">{chapter.subtitle}</p>
                        <p className="text-gray-500 text-sm mt-1">{chapter.description}</p>
                      </div>

                      {/* Duolingo-style Status */}
                      <div className="text-right">
                        {isPerfect && (
                          <div className="flex items-center gap-1 text-yellow-500 mb-1">
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                          </div>
                        )}
                        {isCompleted && !isPerfect && (
                          <div className="text-green-600 font-bold text-sm mb-1">✓ Completed</div>
                        )}
                        {canAccess && !isCompleted && (
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {chapter.id === 1 ? 'Start Here!' : 'Available'}
                          </div>
                        )}
                        {!canAccess && (
                          <div className="text-gray-400 text-sm flex items-center gap-1">
                            <Lock className="w-4 h-4" />
                            Locked
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Chapter Learning Elements */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm mb-4">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="font-medium text-blue-800">📚 Vocabulary</div>
                        <div className="text-blue-600">{chapter.keyVocabulary.length} new words</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <div className="font-medium text-purple-800">🎮 Mini-Games</div>
                        <div className="text-purple-600">{chapter.miniGames.length} challenges</div>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-3 text-center">
                        <div className="font-medium text-pink-800">🎭 Voice Acting</div>
                        <div className="text-pink-600">+{chapter.voicePractice.affectionReward} ❤️ max</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="font-medium text-green-800">🎯 Goal</div>
                        <div className="text-green-600">{chapter.requiredAffection}❤️ to continue</div>
                      </div>
                    </div>

                    {/* Chapter Story Context */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <div className="text-sm text-gray-700">
                        <strong>📍 Setting:</strong> {chapter.setting} • <strong>🕐</strong> {chapter.timeOfDay}
                      </div>
                      <div className="text-sm text-gray-600 mt-1 italic">
                        "{chapter.mood}"
                      </div>
                    </div>

                    {/* Progress Indicators */}
                    {canAccess && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Gamepad2 className="w-4 h-4 text-purple-500" />
                            <span>{gameProgress.gamesCompleted.filter(g => chapter.miniGames.some(mg => mg.id === g)).length}/{chapter.miniGames.length} games</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4 text-pink-500" />
                            <span>{isCompleted ? 'Voice Complete' : 'Voice Pending'}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {canAccess && (
                            <div className="text-blue-600 flex items-center gap-1">
                              <span className="text-sm font-medium">Enter Chapter</span>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Affection Requirement Warning */}
                {gameProgress.totalAffection < chapter.requiredAffection && canAccess && chapter.id > 1 && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="text-yellow-800 text-sm flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>
                        <strong>Story Requirement:</strong> Need {chapter.requiredAffection} affection to continue after this chapter. 
                        Current: {gameProgress.totalAffection} ❤️
                      </span>
                    </div>
                  </div>
                )}

                {/* First Chapter Call to Action */}
                {chapter.id === 1 && !isCompleted && (
                  <div className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-4 text-center animate-pulse">
                    <div className="text-lg font-bold mb-2">🚀 Ready to Start Your Love Story?</div>
                    <div className="text-sm opacity-90">Click anywhere on this chapter to begin your journey at Zhongshan High School!</div>
                    <div className="mt-2 text-xs opacity-75">👆 This chapter is ready to play!</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Story Failure Warning */}
        {gameProgress.totalAffection < 50 && gameProgress.currentChapter > 1 && (
          <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-800">
              <h3 className="text-xl font-bold mb-2">⚠️ Story at Risk!</h3>
              <p className="mb-4">Your affection level is too low. If you can't improve your relationship, the story may end badly!</p>
              <div className="text-sm">Current affection: {gameProgress.totalAffection} ❤️ | Minimum needed: 50 ❤️</div>
            </div>
          </div>
        )}

        {/* Story Complete */}
        {gameProgress.storyEnding !== 'incomplete' && (
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">🎭 Story Complete!</h2>
            <div className="text-6xl mb-4">
              {gameProgress.storyEnding === 'perfect' ? '💕' :
               gameProgress.storyEnding === 'good' ? '😍' :
               gameProgress.storyEnding === 'okay' ? '😊' :
               gameProgress.storyEnding === 'bad' ? '😔' : '💔'}
            </div>
            <div className="text-xl mb-2">
              {gameProgress.storyEnding === 'perfect' ? 'Perfect Love Story!' :
               gameProgress.storyEnding === 'good' ? 'Happy Romance!' :
               gameProgress.storyEnding === 'okay' ? 'Close Friends Forever' :
               gameProgress.storyEnding === 'bad' ? 'Distant but Polite' : 'Story Failed'}
            </div>
            <div className="text-sm opacity-90">
              Final Affection: {gameProgress.totalAffection} ❤️
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaiwanRomanceStoryChapters