// src/lib/firebase/text-to-speech.ts
// Google Cloud Text-to-Speech for AI voice output

export interface TTSOptions {
  languageCode?: string
  voiceName?: string
  speakingRate?: number
  pitch?: number
}

/**
 * Convert Chinese text to speech using Google Cloud TTS
 * Uses Firebase Cloud Function as proxy
 */
export async function synthesizeSpeech(
  text: string,
  options: TTSOptions = {}
): Promise<string> {
  const defaultOptions: TTSOptions = {
    languageCode: 'zh-CN',
    voiceName: 'zh-CN-Wavenet-A', // Female voice (Xiao Ai)
    speakingRate: 1.0,
    pitch: 0,
    ...options,
  }
  
  try {
    const response = await fetch('/api/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        ...defaultOptions,
      }),
    })
    
    if (!response.ok) {
      throw new Error('Speech synthesis failed')
    }
    
    const result = await response.json()
    
    // Return audio URL (base64 data URL or Cloud Storage URL)
    return result.audioUrl
    
  } catch (error) {
    console.error('TTS error:', error)
    throw new Error('Failed to synthesize speech')
  }
}

/**
 * Play audio from URL
 */
export function playAudio(audioUrl: string, onEnd?: () => void): HTMLAudioElement {
  const audio = new Audio(audioUrl)
  
  if (onEnd) {
    audio.onended = onEnd
  }
  
  audio.play().catch(error => {
    console.error('Audio playback error:', error)
  })
  
  return audio
}

/**
 * Cache for TTS audio to reduce API calls
 */
class TTSCache {
  private cache: Map<string, string> = new Map()
  private maxSize: number = 100
  
  getCacheKey(text: string, options: TTSOptions): string {
    return `${text}-${options.voiceName}-${options.speakingRate}`
  }
  
  get(text: string, options: TTSOptions): string | null {
    const key = this.getCacheKey(text, options)
    return this.cache.get(key) || null
  }
  
  set(text: string, options: TTSOptions, audioUrl: string): void {
    const key = this.getCacheKey(text, options)
    
// Implement LRU cache
    if (this.cache.size >= this.maxSize) {
      // FIX: Use the non-null assertion operator (!) because 'size >= maxSize' guarantees the key exists.
      const firstKey = this.cache.keys().next().value! 
      
      this.cache.delete(firstKey)
    }
    
    this.cache.set(key, audioUrl)
  }
  
  clear(): void {
    this.cache.clear()
  }
}

export const ttsCache = new TTSCache()

/**
 * Synthesize speech with caching
 */
export async function synthesizeSpeechCached(
  text: string,
  options: TTSOptions = {}
): Promise<string> {
  // Check cache first
  const cached = ttsCache.get(text, options)
  if (cached) {
    return cached
  }
  
  // Generate new audio
  const audioUrl = await synthesizeSpeech(text, options)
  
  // Cache it
  ttsCache.set(text, options, audioUrl)
  
  return audioUrl
}