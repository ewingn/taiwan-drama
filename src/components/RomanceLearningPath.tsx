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
    description: "Your first day at Zhongshan High School. Will you make the right first impression?",
    storyContext: "You're a nervous American-Taiwanese student starting at a traditional Taiwanese high school. Your Chinese is basic, your cultural knowledge limited, but your heart is open to new experiences. Today, you'll meet someone who will change your life forever.",
    setting: "Zhongshan High School, Classroom 3-A",
    timeOfDay: "Early Morning (8:00 AM)",
    mood: "Nervous anticipation, cultural overwhelm",
    unlocked: true,
    completed: false,
    
    keyVocabulary: [
      {
        chinese: "請多指教",
        pinyin: "qǐng duō zhǐjiào", 
        english: "Please guide me / Please take care of me",
        context: "Essential humble greeting when meeting new people in Taiwan"
      },
      {
        chinese: "新同學",
        pinyin: "xīn tóngxué",
        english: "new classmate",
        context: "How you'll be introduced to the class"
      },
      {
        chinese: "很高興認識你",
        pinyin: "hěn gāoxìng rènshi nǐ",
        english: "Very happy to meet you",
        context: "Polite way to respond when introduced"
      },
      {
        chinese: "我來自美國",
        pinyin: "wǒ láizì Měiguó",
        english: "I come from America", 
        context: "How to explain your background"
      },
      {
        chinese: "同桌",
        pinyin: "tóngzhuō",
        english: "desk partner",
        context: "Your seating arrangement partner - very important relationship!"
      }
    ],

    sentencePatterns: [
      {
        pattern: "我是... (wǒ shì...)",
        explanation: "I am... - Basic self-introduction pattern",
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
          }
        ]
      },
      {
        pattern: "很... (hěn...)",
        explanation: "Very... - Used to intensify adjectives and show enthusiasm",
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
          }
        ]
      }
    ],

    dialogue: [
      {
        character: "老師",
        avatar: "👩‍🏫",
        chinese: "同學們，我們今天有一位新同學。小明，請你自我介紹一下。",
        pinyin: "Tóngxuémen, wǒmen jīntiān yǒu yīwèi xīn tóngxué. Xiǎo Míng, qǐng nǐ zìwǒ jièshào yīxià.",
        english: "Students, today we have a new classmate. Xiao Ming, please introduce yourself.",
        emotion: "authoritative but encouraging"
      },
      {
        character: "小明",
        avatar: "🧑‍🎓", 
        chinese: "大家好，我是小明。我來自美國。我的中文不太好，請大家多多指教。",
        pinyin: "Dàjiā hǎo, wǒ shì Xiǎo Míng. Wǒ láizì Měiguó. Wǒ de zhōngwén bùtài hǎo, qǐng dàjiā duōduō zhǐjiào.",
        english: "Hello everyone, I'm Xiao Ming. I come from America. My Chinese isn't very good, please guide me.",
        emotion: "nervous but sincere",
        internalThought: "Did I say that right? Everyone seems friendly..."
      },
      {
        character: "小愛",
        avatar: "👩‍🎓",
        chinese: "哇！美國來的！歡迎你！我是小愛，很高興認識你！",
        pinyin: "Wā! Měiguó lái de! Huānyíng nǐ! Wǒ shì Xiǎo Ài, hěn gāoxìng rènshi nǐ!",
        english: "Wow! From America! Welcome! I'm Xiao Ai, very happy to meet you!",
        emotion: "excited and welcoming",
        internalThought: "He seems so sincere and humble. I want to help him feel welcome here."
      }
    ],

    miniGames: [
      {
        id: "intro_vocabulary_matching",
        type: "matching",
        title: "Introduction Vocabulary Matching",
        description: "Match the key introduction phrases with their English meanings!",
        data: {
          pairs: [
            { chinese: "請多指教", english: "Please guide me", pinyin: "qǐng duō zhǐjiào" },
            { chinese: "新同學", english: "new classmate", pinyin: "xīn tóngxué" },
            { chinese: "很高興認識你", english: "happy to meet you", pinyin: "hěn gāoxìng rènshi nǐ" },
            { chinese: "我來自美國", english: "I come from America", pinyin: "wǒ láizì Měiguó" },
            { chinese: "同桌", english: "desk partner", pinyin: "tóngzhuō" },
            { chinese: "自我介紹", english: "self introduction", pinyin: "zìwǒ jièshào" }
          ],
          timeLimit: 90
        },
        affectionImpact: {
          perfect: 15, // 90%+ correct
          good: 10,   // 70%+ correct  
          poor: -5    // <70% correct
        }
      },
      {
        id: "classroom_connections", 
        type: "connections",
        title: "Taiwanese Classroom Culture",
        description: "Group these classroom-related terms to show your cultural understanding!",
        data: {
          words: [
            "老師", "同學", "黑板", "課本",
            "尊敬", "禮貌", "認真", "努力", 
            "上課", "下課", "考試", "功課"
          ],
          groups: [
            {
              category: "People",
              items: ["老師", "同學", "黑板", "課本"],
              color: "bg-blue-100 border-blue-300"
            },
            {
              category: "Values", 
              items: ["尊敬", "禮貌", "認真", "努力"],
              color: "bg-green-100 border-green-300"
            },
            {
              category: "Activities",
              items: ["上課", "下課", "考試", "功課"], 
              color: "bg-purple-100 border-purple-300"
            }
          ],
          timeLimit: 120
        },
        affectionImpact: {
          perfect: 20,
          good: 12,
          poor: -8
        }
      }
    ],

    voicePractice: {
      scenario: "You're having your first conversation with Xiao Ai after class. She wants to help you feel welcome and learn about your background.",
      objective: "Use introduction vocabulary naturally and show interest in Taiwanese culture",
      keyPhrases: [
        "謝謝你的幫助 (Thank you for your help)",
        "台灣很美 (Taiwan is beautiful)", 
        "我想學中文 (I want to learn Chinese)",
        "你可以教我嗎 (Can you teach me?)"
      ],
      culturalContext: [
        "Showing humility about your Chinese level earns respect",
        "Complimenting Taiwan and its culture is always appreciated", 
        "Asking for help shows you value the relationship"
      ],
      aiCharacterPrompt: `You are 小愛 (Xiao Ai), a warm 17-year-old Taiwanese high school student. The new American transfer student just introduced himself to the class. You're excited to help him and learn about his background.

PERSONALITY: Enthusiastic, helpful, culturally proud, slightly shy but outgoing
RELATIONSHIP STATUS: First meeting, interested in being friends
SPEAKING STYLE: Clear Chinese with English translations, encouraging about his learning

You should:
- Welcome him warmly and offer help
- Ask about his experience in Taiwan so far
- Share interesting things about Taiwanese culture
- Encourage his Chinese learning efforts
- Be friendly but not too forward (this is your first conversation)

Respond in format:
Chinese: [Chinese response]
Pinyin: [pinyin]
English: [English translation]
Emotion: [your current feeling]`,
      successCriteria: [
        "Use at least 3 key phrases naturally",
        "Ask questions about Taiwan/culture", 
        "Show appreciation for Xiao Ai's help",
        "Maintain conversation for at least 5 exchanges"
      ],
      affectionReward: 25
    },

    requiredAffection: 30,
    perfectAffection: 50
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

  if (!sessionStarted) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">🎤 {chapter.title} - Voice Practice</h3>
        <p className="text-gray-600 mb-4">{chapter.voicePractice.scenario}</p>
        
        <div className="bg-yellow-50 rounded-lg p-4 mb-4">
          <h4 className="font-bold mb-2">Key Phrases to Use:</h4>
          {chapter.voicePractice.keyPhrases.map((phrase: string, index: number) => (
            <div key={index} className="text-sm">{phrase}</div>
          ))}
        </div>

        <button
          onClick={() => setSessionStarted(true)}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold"
        >
          Start Conversation with Xiao Ai
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="bg-purple-600 text-white p-4 rounded-t-lg mb-4">
        <h3 className="font-bold">Talking with 小愛</h3>
      </div>

      <div className="h-64 bg-gray-50 rounded p-4 mb-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded ${
              msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your response in Chinese..."
          className="flex-1 p-2 border rounded"
        />
        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>

      <button
        onClick={() => onComplete(chapter.voicePractice.affectionReward)}
        className="w-full bg-green-600 text-white py-3 rounded-lg mt-4"
      >
        Complete Chapter
      </button>
    </div>
  )
}

// Main Component
const TaiwanRomanceStoryChapters: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    currentChapter: 1,
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
    setGameProgress(prev => ({
      ...prev,
      totalAffection: Math.max(0, prev.totalAffection + affectionChange),
      gamesCompleted: [...prev.gamesCompleted, gameData.id]
    }))

    setCurrentView('chapter')
  }

  const handleVoiceComplete = (affectionReward: number) => {
    setRecentAffectionChange(affectionReward)
    setGameProgress(prev => {
      const newAffection = prev.totalAffection + affectionReward
      const newCompleted = [...prev.chaptersCompleted, selectedChapter!.id]
      
      return {
        ...prev,
        totalAffection: newAffection,
        chaptersCompleted: newCompleted,
        currentChapter: selectedChapter!.id + 1
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

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎭 Taiwan Romance Drama Story
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Follow your complete love story from nervous transfer student to romantic confession!
          </p>
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
          <h2 className="text-2xl font-bold text-center mb-6">📚 Your Love Story Chapters</h2>
          
          {storyChapters.map((chapter, index) => {
            const isUnlocked = chapter.id <= gameProgress.currentChapter
            const isCompleted = gameProgress.chaptersCompleted.includes(chapter.id)
            const isPerfect = gameProgress.perfectChapters.includes(chapter.id)
            const canAccess = isUnlocked && (chapter.id === 1 || gameProgress.chaptersCompleted.includes(chapter.id - 1))

            return (
              <div
                key={chapter.id}
                className={`bg-white rounded-xl p-6 shadow-lg border-2 cursor-pointer transition-all ${
                  isCompleted ? 'border-green-300' :
                  canAccess ? 'border-blue-300 hover:border-blue-400' :
                  'border-gray-200 opacity-60'
                }`}
                onClick={() => canAccess && setSelectedChapter(chapter) && setCurrentView('chapter')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                        isCompleted ? 'bg-green-500' :
                        canAccess ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`}>
                        {isCompleted ? '✓' : chapter.id}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Chapter {chapter.id}: {chapter.title}</h3>
                        <p className="text-gray-600">{chapter.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{chapter.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📍 {chapter.setting}</span>
                      <span>🕐 {chapter.timeOfDay}</span>
                      <span>🎯 Min: {chapter.requiredAffection} ❤️</span>
                    </div>
                  </div>

                  <div className="text-center ml-4">
                    {isPerfect && (
                      <div className="text-yellow-500 text-2xl mb-2">⭐</div>
                    )}
                    {isCompleted && (
                      <div className="text-green-600 font-bold text-sm">Completed</div>
                    )}
                    {canAccess && !isCompleted && (
                      <div className="text-blue-600 font-bold text-sm">Available</div>
                    )}
                    {!canAccess && (
                      <div className="text-gray-400 text-sm">🔒 Locked</div>
                    )}
                  </div>
                </div>

                {/* Chapter Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-blue-50 rounded p-2">
                    <div className="font-medium text-blue-800">Vocabulary</div>
                    <div className="text-blue-600">{chapter.keyVocabulary.length} new words</div>
                  </div>
                  <div className="bg-purple-50 rounded p-2">
                    <div className="font-medium text-purple-800">Mini-Games</div>
                    <div className="text-purple-600">{chapter.miniGames.length} challenges</div>
                  </div>
                  <div className="bg-pink-50 rounded p-2">
                    <div className="font-medium text-pink-800">Voice Practice</div>
                    <div className="text-pink-600">+{chapter.voicePractice.affectionReward} ❤️ reward</div>
                  </div>
                </div>

                {/* Affection Requirement Warning */}
                {gameProgress.totalAffection < chapter.requiredAffection && canAccess && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3">
                    <div className="text-yellow-800 text-sm">
                      ⚠️ Warning: You need {chapter.requiredAffection} affection to continue the story after this chapter. 
                      Current: {gameProgress.totalAffection} ❤️
                    </div>
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