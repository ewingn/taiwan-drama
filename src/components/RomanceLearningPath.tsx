// src/components/RomanceLearningPath.tsx (Fixed - corrected StoryChapter import and usage)
import React, { useState, useEffect } from 'react'
import MatchingGameComponent from './games/MatchingGameComponent'
import ConnectionsGameComponent from './games/ConnectionsgameComponent'
import QuickfireGameComponent from './games/QuickfireGameComponent'
import VoicePracticeComponent from './games/VoicePracticeComponent'
import ChapterDetailView from './romance/ChapterDetailView'
import StoryOverviewView from './romance/StoryOverviewView'
import { storyChapters } from '../data/storyChapters'
import type { StoryChapter } from '../types'

interface GameProgress {
  currentChapter: number
  totalAffection: number
  chaptersCompleted: number[]
  gamesCompleted: string[]
  perfectChapters: number[]
  storyEnding: 'incomplete' | 'bad' | 'good' | 'perfect' | 'failed'
}

interface RomanceLearningPathProps {
  onBack: () => void
}

const RomanceLearningPath: React.FC<RomanceLearningPathProps> = ({ onBack }) => {
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    currentChapter: 1,
    totalAffection: 15,
    chaptersCompleted: [],
    gamesCompleted: [],
    perfectChapters: [],
    storyEnding: 'incomplete'
  })

  const [currentView, setCurrentView] = useState<'overview' | 'chapter' | 'game' | 'voice'>('overview')
  const [selectedChapter, setSelectedChapter] = useState<StoryChapter | null>(null)
  const [currentGame, setCurrentGame] = useState<any>(null)

  // Game completion handler
  const handleGameComplete = (success: boolean, score: number, gameData: any) => {
    console.log('Game completed:', { success, score, gameData })
    
    // Update game progress
    setGameProgress(prev => {
      const newGamesCompleted = [...prev.gamesCompleted]
      if (!newGamesCompleted.includes(gameData.id)) {
        newGamesCompleted.push(gameData.id)
      }

      // Calculate affection change based on score
      let affectionChange = 0
      if (score >= 90) {
        affectionChange = gameData.affectionImpact?.perfect || 10
      } else if (score >= 70) {
        affectionChange = gameData.affectionImpact?.good || 5
      } else {
        affectionChange = gameData.affectionImpact?.poor || 0
      }

      return {
        ...prev,
        totalAffection: prev.totalAffection + affectionChange,
        gamesCompleted: newGamesCompleted
      }
    })

    // Return to chapter view
    setCurrentView('chapter')
  }

  // Voice practice completion handler
  const handleVoiceComplete = (affectionReward: number) => {
    console.log('Voice practice completed:', affectionReward)
    
    setGameProgress(prev => {
      const newChaptersCompleted = [...prev.chaptersCompleted]
      if (selectedChapter && !newChaptersCompleted.includes(selectedChapter.id)) {
        newChaptersCompleted.push(selectedChapter.id)
      }

      return {
        ...prev,
        totalAffection: prev.totalAffection + affectionReward,
        chaptersCompleted: newChaptersCompleted,
        currentChapter: Math.max(prev.currentChapter, (selectedChapter?.id || 0) + 1)
      }
    })

    // Return to story overview
    setCurrentView('overview')
  }

  // Game selection logic
  const renderGameComponent = () => {
    if (!currentGame) {
      return (
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <h3 className="text-xl font-bold mb-4 text-red-600">No Game Selected</h3>
          <p className="text-gray-600 mb-4">Unable to load game data</p>
          <button 
            onClick={() => setCurrentView('chapter')} 
            className="bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Chapter
          </button>
        </div>
      )
    }

    switch (currentGame.type) {
      case 'matching':
        return (
          <MatchingGameComponent
            game={currentGame}
            onComplete={(success, score) => handleGameComplete(success, score, currentGame)}
          />
        )
      case 'connections':
        return (
          <ConnectionsGameComponent
            game={currentGame}
            onComplete={(success, score) => handleGameComplete(success, score, currentGame)}
          />
        )
      case 'quickfire':
        return (
          <QuickfireGameComponent
            game={currentGame}
            onComplete={(success, score) => handleGameComplete(success, score, currentGame)}
          />
        )
      default:
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4 text-red-600">Unsupported Game Type</h3>
            <p className="text-gray-600 mb-4">Game type "{currentGame.type}" is not yet implemented</p>
            <button 
              onClick={() => setCurrentView('chapter')} 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Back to Chapter
            </button>
          </div>
        )
    }
  }

  // Main render logic based on current view
  switch (currentView) {
    case 'game':
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setCurrentView('chapter')}
              className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              ← Back to Chapter
            </button>
            {renderGameComponent()}
          </div>
        </div>
      )

    case 'voice':
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
          <div className="max-w-4xl mx-auto">
            <VoicePracticeComponent
              chapter={selectedChapter}
              onComplete={handleVoiceComplete}
            />
          </div>
        </div>
      )

    case 'chapter':
      if (!selectedChapter) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <h3 className="text-xl font-bold mb-4 text-red-600">Chapter Not Found</h3>
                <p className="text-gray-600 mb-4">The selected chapter could not be loaded</p>
                <button 
                  onClick={() => setCurrentView('overview')} 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                  Return to Story Overview
                </button>
              </div>
            </div>
          </div>
        )
      }

      return (
        <ChapterDetailView
          chapter={selectedChapter}
          gameProgress={gameProgress}
          onGameSelect={(game) => {
            setCurrentGame(game)
            setCurrentView('game')
          }}
          onVoiceStart={() => setCurrentView('voice')}
          onBack={() => setCurrentView('overview')}
        />
      )

    default:
      return (
        <StoryOverviewView
          chapters={storyChapters}
          gameProgress={gameProgress}
          onChapterSelect={(chapter: StoryChapter) => {
            setSelectedChapter(chapter)
            setCurrentView('chapter')
          }}
          onBack={onBack}
        />
      )
  }
}

export default RomanceLearningPath