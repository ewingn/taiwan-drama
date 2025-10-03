// src/lib/firebase/firestore-operations.ts
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  Timestamp 
} from 'firebase/firestore'
import { db } from './config'

// ============================================================
// TYPES
// ============================================================

export interface UserProfile {
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
  createdAt: Timestamp
  lastLogin: Timestamp
  preferences: {
    showPinyin: boolean
    autoPlayAudio: boolean
    voiceSpeed: number
  }
}

export interface GameProgress {
  userId: string
  currentChapter: number
  totalAffection: number
  chaptersCompleted: number[]
  gamesCompleted: string[]
  perfectChapters: number[]
  storyEnding: 'incomplete' | 'bad' | 'okay' | 'good' | 'perfect' | 'failed'
  lastPlayed: Timestamp
  totalPlayTime: number // minutes
  streakDays: number
  updatedAt: Timestamp
}

export interface ConversationHistory {
  userId: string
  chapterId: number
  messages: Array<{
    type: 'user' | 'ai'
    content: string
    pinyin?: string
    english?: string
    timestamp: Timestamp
    affectionEarned?: number
  }>
  totalAffection: number
  phrasesUsed: string[]
  completed: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ============================================================
// USER PROFILE OPERATIONS
// ============================================================

export async function createUserProfile(
  uid: string, 
  email: string, 
  displayName?: string | null
): Promise<UserProfile> {
  const userRef = doc(db, 'users', uid)
  
  const profile: UserProfile = {
    uid,
    email,
    displayName: displayName || null,
    photoURL: null,
    createdAt: Timestamp.now(),
    lastLogin: Timestamp.now(),
    preferences: {
      showPinyin: true,
      autoPlayAudio: true,
      voiceSpeed: 1.0,
    }
  }
  
  await setDoc(userRef, profile)
  return profile
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)
  
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile
  }
  
  return null
}

export async function updateUserProfile(
  uid: string, 
  updates: Partial<UserProfile>
): Promise<void> {
  const userRef = doc(db, 'users', uid)
  await updateDoc(userRef, {
    ...updates,
    lastLogin: serverTimestamp(),
  })
}

// ============================================================
// GAME PROGRESS OPERATIONS
// ============================================================

export async function getGameProgress(userId: string): Promise<GameProgress | null> {
  const progressRef = doc(db, 'gameProgress', userId)
  const progressSnap = await getDoc(progressRef)
  
  if (progressSnap.exists()) {
    return progressSnap.data() as GameProgress
  }
  
  return null
}

export async function createGameProgress(userId: string): Promise<GameProgress> {
  const progressRef = doc(db, 'gameProgress', userId)
  
  const progress: GameProgress = {
    userId,
    currentChapter: 1,
    totalAffection: 15,
    chaptersCompleted: [],
    gamesCompleted: [],
    perfectChapters: [],
    storyEnding: 'incomplete',
    lastPlayed: Timestamp.now(),
    totalPlayTime: 0,
    streakDays: 0,
    updatedAt: Timestamp.now(),
  }
  
  await setDoc(progressRef, progress)
  return progress
}

export async function updateGameProgress(
  userId: string,
  updates: Partial<GameProgress>
): Promise<void> {
  const progressRef = doc(db, 'gameProgress', userId)
  await updateDoc(progressRef, {
    ...updates,
    lastPlayed: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function incrementAffection(
  userId: string,
  amount: number
): Promise<number> {
  const progress = await getGameProgress(userId)
  if (!progress) throw new Error('Game progress not found')
  
  const newTotal = progress.totalAffection + amount
  await updateGameProgress(userId, { totalAffection: newTotal })
  
  return newTotal
}

// ============================================================
// CONVERSATION HISTORY OPERATIONS
// ============================================================

export async function saveConversationHistory(
  userId: string,
  chapterId: number,
  messages: ConversationHistory['messages'],
  phrasesUsed: string[],
  totalAffection: number,
  completed: boolean = false
): Promise<void> {
  const conversationId = `${userId}_${chapterId}_${Date.now()}`
  const conversationRef = doc(db, 'conversations', conversationId)
  
  const conversation: ConversationHistory = {
    userId,
    chapterId,
    messages,
    totalAffection,
    phrasesUsed,
    completed,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  }
  
  await setDoc(conversationRef, conversation)
}

export async function getConversationHistory(
  userId: string,
  chapterId: number
): Promise<ConversationHistory[]> {
  const conversationsRef = collection(db, 'conversations')
  const q = query(
    conversationsRef,
    where('userId', '==', userId),
    where('chapterId', '==', chapterId)
  )
  
  const querySnapshot = await getDocs(q)
  const conversations: ConversationHistory[] = []
  
  querySnapshot.forEach((doc) => {
    conversations.push(doc.data() as ConversationHistory)
  })
  
  return conversations
}

// ============================================================
// ANALYTICS OPERATIONS
// ============================================================

export async function logLearningEvent(
  userId: string,
  eventType: string,
  eventData: Record<string, any>
): Promise<void> {
  const eventsRef = collection(db, 'learningEvents')
  
  await setDoc(doc(eventsRef), {
    userId,
    eventType,
    eventData,
    timestamp: serverTimestamp(),
  })
}