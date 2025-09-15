// src/components/games/VoicePracticeComponent.tsx
import React, { useState } from 'react'

interface VoicePracticeProps {
  chapter: any // Define proper interface
  onComplete: (affectionReward: number) => void
}

const VoicePracticeComponent: React.FC<VoicePracticeProps> = ({ chapter, onComplete }) => {
  // Voice practice logic here
  return <div>Voice Practice Component</div>
}

export default VoicePracticeComponent

// ===========================================
// src/data/storyChapters.ts
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

  dialogue: Array<{
    character: string
    avatar: string
    chinese: string
    pinyin: string
    english: string
    emotion: string
    internalThought?: string
  }>

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

  voicePractice: {
    scenario: string
    objective: string
    keyPhrases: string[]
    culturalContext: string[]
    aiCharacterPrompt: string
    successCriteria: string[]
    affectionReward: number
  }

  requiredAffection: number
  perfectAffection: number
}

export const storyChapters: StoryChapter[] = [
  // Chapter data moved here
]

// ===========================================