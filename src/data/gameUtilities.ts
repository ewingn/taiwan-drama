// src/data/gameUtilities.ts
import { GameProgress, AffectionStatus } from '../types'

export function getAffectionStatus(affection: number): AffectionStatus {
  if (affection >= 180) return { emoji: '💕', text: 'Deeply in Love', color: 'text-red-600' }
  if (affection >= 150) return { emoji: '😍', text: 'Strong Romance', color: 'text-pink-600' }
  if (affection >= 100) return { emoji: '😊', text: 'Good Friends', color: 'text-yellow-600' }
  if (affection >= 50) return { emoji: '🙂', text: 'Getting Closer', color: 'text-blue-600' }
  return { emoji: '😐', text: 'Acquaintances', color: 'text-gray-600' }
}

export function calculateGameScore(correctAnswers: number, totalAnswers: number): number {
  return Math.round((correctAnswers / totalAnswers) * 100)
}

export function determineAffectionChange(score: number, affectionImpact: any) {
  if (score >= 90) return affectionImpact.perfect
  if (score >= 70) return affectionImpact.good
  return affectionImpact.poor
}

export function isChapterUnlocked(chapterId: number, gameProgress: GameProgress): boolean {
  return chapterId <= gameProgress.currentChapter || chapterId === 1
}

export function getNextChapterId(currentChapterId: number, maxChapters: number): number {
  return Math.min(currentChapterId + 1, maxChapters)
}