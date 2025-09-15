// src/data/storyChapters.ts
import { StoryChapter } from '../types'

export const storyChapters: StoryChapter[] = [
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
          perfect: 20,
          good: 12,
          poor: -8
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
          perfect: 25,
          good: 15,
          poor: -12
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

    requiredAffection: 35,
    perfectAffection: 55
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

  // Additional chapters can be added here...
  // For brevity, I'm only including the first 2 chapters in this example
]
