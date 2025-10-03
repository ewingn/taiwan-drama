import { NextRequest, NextResponse } from 'next/server'
import { TextToSpeechClient } from '@google-cloud/text-to-speech'

const client = new TextToSpeechClient()

export async function POST(request: NextRequest) {
  try {
    const { text, voiceName = 'zh-CN-Wavenet-A' } = await request.json()
    
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: {
        languageCode: 'zh-CN',
        name: voiceName,
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
    })
    
    const audioContent = response.audioContent as Buffer
    const base64Audio = audioContent.toString('base64')
    const dataUrl = `data:audio/mp3;base64,${base64Audio}`
    
    return NextResponse.json({ audioUrl: dataUrl })
  } catch (error) {
    console.error('TTS error:', error)
    return NextResponse.json(
      { error: 'Speech synthesis failed' },
      { status: 500 }
    )
  }
}