// src/lib/firebase/speech-to-text.ts
// Google Cloud Speech-to-Text for Chinese voice input

/**
 * Speech-to-Text Service
 * Uses Google Cloud Speech-to-Text API for Mandarin Chinese recognition
 */

export interface TranscriptionResult {
  text: string
  confidence: number
  alternatives?: Array<{
    text: string
    confidence: number
  }>
}

/**
 * Convert audio blob to text using Google Cloud Speech-to-Text
 * This uses a Firebase Cloud Function as a proxy to avoid exposing API keys
 */
export async function transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult> {
  try {
    // Convert blob to base64
    const base64Audio = await blobToBase64(audioBlob)
    
    // Call Firebase Cloud Function
    const response = await fetch('/api/speech-to-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audio: base64Audio,
        languageCode: 'zh-CN', // Mandarin Chinese
        enableAutomaticPunctuation: true,
      }),
    })
    
    if (!response.ok) {
      throw new Error('Speech recognition failed')
    }
    
    const result = await response.json()
    return result
    
  } catch (error) {
    console.error('Transcription error:', error)
    throw new Error('Failed to transcribe audio')
  }
}

/**
 * Start real-time speech recognition
 * For live transcription during conversation
 */
export class RealtimeSpeechRecognizer {
  private mediaRecorder: MediaRecorder | null = null
  private audioChunks: Blob[] = []
  private onTranscript: (text: string) => void
  private isRecording: boolean = false
  
  constructor(onTranscript: (text: string) => void) {
    this.onTranscript = onTranscript
  }
  
  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000, // Optimal for speech recognition
        } 
      })
      
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      })
      
      this.audioChunks = []
      
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data)
        }
      }
      
      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' })
        
        try {
          const result = await transcribeAudio(audioBlob)
          this.onTranscript(result.text)
        } catch (error) {
          console.error('Transcription failed:', error)
        }
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }
      
      this.mediaRecorder.start()
      this.isRecording = true
      
    } catch (error) {
      console.error('Microphone access error:', error)
      throw new Error('Microphone access denied')
    }
  }
  
  stopRecording(): void {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop()
      this.isRecording = false
    }
  }
  
  isActive(): boolean {
    return this.isRecording
  }
}

// Helper function
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1]
      resolve(base64String)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}