import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Progress calculation utilities
export function calculateProgress(current: number, total: number): number {
  return Math.round((current / total) * 100)
}

// Local storage helpers (for future use with user progress)
export function saveToLocalStorage(key: string, value: any): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
}

export function getFromLocalStorage(key: string): any {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  }
  return null
}

// Format learning arc data
export interface ArcProgress {
  arcId: string
  currentLesson: number
  totalLessons: number
  completedLessons: string[]
  lastAccessed: Date
}

export function formatArcProgress(progress: ArcProgress): string {
  const percentage = calculateProgress(progress.currentLesson, progress.totalLessons)
  return `${percentage}% complete`
}

// Vocabulary practice helpers
export interface VocabularyItem {
  chinese: string
  pinyin: string
  english: string
  audioUrl?: string
}

export function parseVocabulary(vocabString: string): VocabularyItem {
  // Parse strings like "對不起 (duìbuqǐ) - Sorry"
  const match = vocabString.match(/^(.+?)\s*\((.+?)\)\s*-\s*(.+)$/)
  
  if (match) {
    return {
      chinese: match[1].trim(),
      pinyin: match[2].trim(),
      english: match[3].trim()
    }
  }
  
  // Fallback for malformed strings
  return {
    chinese: vocabString,
    pinyin: '',
    english: vocabString
  }
}

// Scene progression helpers
export function getNextScene(currentScene: number, totalScenes: number): number {
  return Math.min(currentScene + 1, totalScenes - 1)
}

export function getPreviousScene(currentScene: number): number {
  return Math.max(currentScene - 1, 0)
}

// Difficulty level mapping
export const DIFFICULTY_LEVELS = {
  beginner: { label: 'Beginner', color: 'green' },
  intermediate: { label: 'Intermediate', color: 'yellow' },
  advanced: { label: 'Advanced', color: 'red' }
} as const

export type DifficultyLevel = keyof typeof DIFFICULTY_LEVELS

// Time formatting utilities
export function formatTimeSpent(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}

// Streak calculation
export function calculateStreak(dates: Date[]): number {
  if (dates.length === 0) return 0
  
  const sortedDates = dates.sort((a, b) => b.getTime() - a.getTime())
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  let streak = 0
  let currentDate = new Date(today)
  
  for (const date of sortedDates) {
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    
    if (checkDate.getTime() === currentDate.getTime()) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }
  
  return streak
}