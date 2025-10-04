import Navigation from '@/components/Navigation'
import { CheckCircle, Zap, Shield, Code, Server } from 'lucide-react'
import Link from 'next/link'

// Mock Data for demonstration
const techFeatures = [
    { icon: Shield, title: "Secure ADK Access (Priority 1)", description: "Backend Flask API validates Firebase ID Tokens (JWTs) on every request using the Firebase Admin SDK, ensuring secure, cross-service communication and preventing unauthorized AI usage." },
    { icon: Zap, title: "ADK Tooling / RAG Pattern", description: "The core AI Agent is augmented with a custom Python function (Taiwanese Slang Lookup) to execute a Retrieval Augmented Generation (RAG) pattern, providing factually grounded, non-hallucinated cultural definitions directly during conversation." },
    { icon: Server, title: "Polyglot Architecture", description: "Next.js/TypeScript frontend communicates with a Python/Flask backend service, demonstrating professional decoupling of client logic and high-performance server-side AI processing." },
    { icon: Code, title: "Focus & Velocity (MVP Scope)", description: "Adopted a focused MVP scope strategy, dedicating all resources to perfecting the 'TV Drama Arc' before developing secondary features (Taipei, KTV), demonstrating key project management discipline." },
]

export const metadata = {
  title: 'Tech Stack & Architecture - TaiwanScript',
  description: 'Detailed architecture of the RAG platform using Next.js, Firebase, and a Python ADK Agent.',
}

export default function TechStack() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* NOTE: Navigation Component should be updated to include this link. */}
      <Navigation /> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Platform Architecture & ADK Implementation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This page serves as a documentation artifact showcasing key technical design decisions for the AI platform.
          </p>
        </header>

        <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Key Portfolio Highlights
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                {techFeatures.map((feature, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                            <feature.icon className="w-8 h-8 text-red-600 mr-4" />
                            <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                        </div>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Architectural Data Flow
          </h2>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <p className="text-lg text-gray-700">
                **Data Flow: Client $\rightarrow$ Secure API $\rightarrow$ ADK Agent**
              </p>
              <ul className="text-left mt-4 max-w-2xl mx-auto space-y-3 list-disc list-inside text-gray-600">
                  <li>Client fetches Firebase **ID Token** (JWT).</li>
                  {/* 👇 FIXED SYNTAX */}
                  <li>Client calls Flask API (`/agent/start`) with the **Authorization: Bearer** header.</li>
                  <li>Flask API uses **Firebase Admin SDK** (`auth.verify_id_token`) to securely get the user's UID.</li>
                  <li>Flask passes clean context + UID to the **ADK Agent** session.</li>
                  <li>ADK Agent uses custom **Python tool** (`taiwanese_slang_lookup`) to ground its responses in specific knowledge.</li>
                  {/* 👆 */}
              </ul>
              <p className="mt-6 text-sm text-red-600 font-medium">
                  This decoupling ensures that business logic (AI Agent) is protected and scaled independently from the presentation layer (Next.js).
              </p>
          </div>
          {/* New Callout Link */}
          <p className="mt-8">
              <Link href="/tech-stack" className="text-blue-600 hover:text-blue-800 font-medium text-lg underline">
                  This architecture is key to my portfolio. Click here to see it live.
              </Link>
          </p>
          
        </section>
        
      </div>
    </div>
  )
}
