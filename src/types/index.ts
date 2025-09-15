// src/types/index.ts
export interface VocabularyItem {
  chinese: string
  pinyin: string
  english: string
  context: string
}

export interface SentencePattern {
  pattern: string
  explanation: string
  examples: Array<{
    chinese: string
    pinyin: string
    english: string
  }>
}

export interface DialogueLine {
  character: string
  avatar: string
  chinese: string
  pinyin: string
  english: string
  emotion: string
  internalThought?: string
}

export interface VoicePractice {
  scenario: string
  objective: string
  keyPhrases: string[]
  culturalContext: string[]
  aiCharacterPrompt: string
  successCriteria: string[]
  affectionReward: number
}

export interface StoryChapter {
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
  keyVocabulary: VocabularyItem[]
  sentencePatterns: SentencePattern[]
  dialogue: DialogueLine[]
  miniGames: MiniGame[]
  voicePractice: VoicePractice
  requiredAffection: number
  perfectAffection: number
}

export interface GameProgress {
  currentChapter: number
  totalAffection: number
  chaptersCompleted: number[]
  gamesCompleted: string[]
  perfectChapters: number[]
  storyEnding: 'incomplete' | 'bad' | 'good' | 'perfect' | 'failed'
}

export interface AffectionStatus {
  emoji: string
  text: string
  color: string
}

export const STORY_ENDINGS = {
  PERFECT: 200,
  GOOD: 150,
  OKAY: 100,
  BAD: 50,
  FAILED: 0
} as const
