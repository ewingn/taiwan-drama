import * as functions from 'firebase-functions'
import { SpeechClient } from '@google-cloud/speech'
import { TextToSpeechClient } from '@google-cloud/text-to-speech'
import { VertexAI } from '@google-cloud/aiplatform'

// Initialize clients
const speechClient = new SpeechClient()
const ttsClient = new TextToSpeechClient()
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID!,
  location: 'us-central1',
})

// ============================================================
// SPEECH-TO-TEXT ENDPOINT
// ============================================================
export const speechToText = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Must be authenticated to use speech recognition'
    )
  }
  
  const { audio, languageCode = 'zh-CN' } = data
  
  const request = {
    audio: {
      content: audio,
    },
    config: {
      encoding: 'WEBM_OPUS' as const,
      sampleRateHertz: 16000,
      languageCode,
      enableAutomaticPunctuation: true,
      model: 'default',
    },
  }
  
  try {
    const [response] = await speechClient.recognize(request)
    const transcription = response.results
      ?.map(result => result.alternatives?.[0])
      .filter(Boolean)
    
    return {
      text: transcription?.[0]?.transcript || '',
      confidence: transcription?.[0]?.confidence || 0,
      alternatives: transcription?.slice(1).map(alt => ({
        text: alt?.transcript || '',
        confidence: alt?.confidence || 0,
      })),
    }
  } catch (error) {
    console.error('Speech recognition error:', error)
    throw new functions.https.HttpsError('internal', 'Speech recognition failed')
  }
})

// ============================================================
// TEXT-TO-SPEECH ENDPOINT
// ============================================================
export const textToSpeech = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Must be authenticated'
    )
  }
  
  const { 
    text, 
    languageCode = 'zh-CN',
    voiceName = 'zh-CN-Wavenet-A',
    speakingRate = 1.0,
    pitch = 0,
  } = data
  
  const request = {
    input: { text },
    voice: {
      languageCode,
      name: voiceName,
    },
    audioConfig: {
      audioEncoding: 'MP3' as const,
      speakingRate,
      pitch,
    },
  }
  
  try {
    const [response] = await ttsClient.synthesizeSpeech(request)
    
    // Convert to base64 data URL
    const audioContent = response.audioContent as Buffer
    const base64Audio = audioContent.toString('base64')
    const dataUrl = `data:audio/mp3;base64,${base64Audio}`
    
    return { audioUrl: dataUrl }
  } catch (error) {
    console.error('TTS error:', error)
    throw new functions.https.HttpsError('internal', 'Speech synthesis failed')
  }
})

// ============================================================
// AI CONVERSATION ENDPOINT (Vertex AI / Gemini)
// ============================================================
export const aiConversation = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Must be authenticated'
    )
  }
  
  const { prompt, temperature = 0.8, maxTokens = 500 } = data
  
  try {
    // Use Gemini Pro model
    const model = vertexAI.preview.getGenerativeModel({
      model: 'gemini-pro',
      generation_config: {
        temperature,
        max_output_tokens: maxTokens,
        top_p: 0.95,
      },
    })
    
    const result = await model.generateContent(prompt)
    const response = result.response.text()
    
    return { response }
  } catch (error) {
    console.error('AI conversation error:', error)
    throw new functions.https.HttpsError('internal', 'AI generation failed')
  }
})