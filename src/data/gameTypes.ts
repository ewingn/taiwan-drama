// ===========================================
// src/types/gameTypes.ts
export interface AffectionImpact {
  perfect: number
  good: number
  poor: number
}

export interface MatchingGameData {
  pairs: Array<{
    chinese: string
    pinyin: string
    english: string
  }>
  timeLimit: number
}

export interface ConnectionsGroup {
  category: string
  items: string[]
  color: string
  culturalNote?: string
}

export interface ConnectionsGameData {
  words: string[]
  groups: ConnectionsGroup[]
  timeLimit: number
}

export interface QuickfireGameData {
  pairs: Array<{
    chinese: string
    english: string
  }>
  timeLimit: number
}

export type GameData = MatchingGameData | ConnectionsGameData | QuickfireGameData

export interface MiniGame {
  id: string
  type: 'connections' | 'matching' | 'quickfire'
  title: string
  description: string
  data: GameData
  affectionImpact: AffectionImpact
}

export interface GameComponentProps {
  game: MiniGame
  onComplete: (success: boolean, score: number) => void
}