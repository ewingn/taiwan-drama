// src/lib/adk-client/agent-client.ts
/**
 * Client for communicating with Vertex AI Agent Service
 */

import type { StoryChapter } from '@/types'

const AGENT_SERVICE_URL = process.env.NEXT_PUBLIC_AGENT_SERVICE_URL || 'http://localhost:8080'

export interface AgentSession {
  sessionId: string
  sendMessage: (message: string) => Promise<AgentResponse>
  getHistory: () => Promise<any[]>
  end: () => Promise<void>
}

export interface AgentResponse {
  text: string
  tool_calls?: any[]
  tool_results?: any[]
}

export class AgentClient {
  /**
   * Start a new conversation with Xiao Ai agent
   */
  static async startConversation(
    userId: string,
    chapter: StoryChapter
  ): Promise<AgentSession> {
    const response = await fetch(`${AGENT_SERVICE_URL}/agent/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        chapter_id: chapter.id,
        chapter_context: {
          id: chapter.id,
          title: chapter.title,
          scenario: chapter.voicePractice.scenario,
          objective: chapter.voicePractice.objective,
          key_phrases: chapter.voicePractice.keyPhrases,
          cultural_context: chapter.voicePractice.culturalContext,
        },
      }),
    })
    
    const data = await response.json()
    
    const session: AgentSession = {
      sessionId: data.session_id,
      
      sendMessage: async (message: string) => {
        const res = await fetch(`${AGENT_SERVICE_URL}/agent/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: data.session_id,
            message,
          }),
        })
        return res.json()
      },
      
      getHistory: async () => {
        const res = await fetch(
          `${AGENT_SERVICE_URL}/agent/history?session_id=${data.session_id}`
        )
        const json = await res.json()
        return json.history
      },
      
      end: async () => {
        await fetch(`${AGENT_SERVICE_URL}/agent/end`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: data.session_id }),
        })
      },
    }
    
    return session
  }
}