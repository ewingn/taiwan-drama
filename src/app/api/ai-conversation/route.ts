import { NextRequest, NextResponse } from 'next/server'
// FIX 1: Use the default import as required by the TypeScript compiler.
import VertexAI from '@google-cloud/aiplatform' 

// FIX 2: Instantiate by accessing the constructable class from the default-imported namespace.
// This resolves the "not constructable" error that follows the default import.
const vertexAI = new VertexAI.VertexAI({ 
  project: process.env.GOOGLE_CLOUD_PROJECT_ID!,
  location: 'us-central1',
})

export async function POST(request: NextRequest) {
  try {
    const { prompt, temperature = 0.8 } = await request.json()
    
    // The vertexAI object now has the correct type.
    const model = vertexAI.preview.getGenerativeModel({
      model: 'gemini-pro',
      generation_config: {
        temperature,
        max_output_tokens: 500,
      },
    })
    
    const result = await model.generateContent(prompt)
    const response = result.response.text()
    
    return NextResponse.json({ response })
  } catch (error) {
    console.error('AI error:', error)
    return NextResponse.json(
      { error: 'AI generation failed' },
      { status: 500 }
    )
  }
}