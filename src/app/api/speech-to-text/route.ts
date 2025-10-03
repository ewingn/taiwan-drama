import { NextRequest, NextResponse } from 'next/server'
import { SpeechClient } from '@google-cloud/speech'

const client = new SpeechClient()

export async function POST(request: NextRequest) {
  try {
    const { audio, languageCode = 'zh-CN' } = await request.json()
    
    const [response] = await client.recognize({
      audio: { content: audio },
      config: {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 16000,
        languageCode,
        enableAutomaticPunctuation: true,
      },
    })
    
    const transcription = response.results
      ?.map(result => result.alternatives?.[0])
      .filter(Boolean)
    
    return NextResponse.json({
      text: transcription?.[0]?.transcript || '',
      confidence: transcription?.[0]?.confidence || 0,
    })
  } catch (error) {
    console.error('Speech-to-text error:', error)
    return NextResponse.json(
      { error: 'Speech recognition failed' },
      { status: 500 }
    )
  }
}