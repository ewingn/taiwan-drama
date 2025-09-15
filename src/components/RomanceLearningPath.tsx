// src/components/RomanceLearningPath.tsx (Main Coordinator)
import React, { useState, useEffect } from 'react'
import MatchingGameComponent from './games/MatchingGameComponent'
import ConnectionsGameComponent from './games/ConnectionsGameComponent'
import VoicePracticeComponent from './games/VoicePracticeComponent'
import ChapterDetailView from './romance/ChapterDetailView'
import StoryOverviewView from './romance/StoryOverviewView'
import { storyChapters, StoryChapter } from '../data/storyChapters'

interface GameProgress {
  currentChapter: number
  totalAffection: number
  chaptersCompleted: number[]
  gamesCompleted: string[]
  perfectChapters: number[]
  storyEnding: 'incomplete' | 'bad' | 'good' | 'perfect' | 'failed'
}

const RomanceLearningPath: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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

  // Game selection logic
  const renderGameComponent = () => {
    if (!currentGame) return null

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
      default:
        return <div>Unsupported game type</div>
    }
  }

  const handleGameComplete = (success: boolean, score: number, gameData: any) => {
    // Game completion logic
    setCurrentView('chapter')
  }

  // Main render logic
  switch (currentView) {
    case 'game':
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
          <div className="max-w-4xl mx-auto">
            <button onClick={() => setCurrentView('chapter')}>Back to Chapter</button>
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
              onComplete={(affectionReward) => {
                // Handle completion
                setCurrentView('overview')
              }}
            />
          </div>
        </div>
      )

    case 'chapter':
      return (
        <ChapterDetailView
          chapter={selectedChapter!}
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
          onChapterSelect={(chapter) => {
            setSelectedChapter(chapter)
            setCurrentView('chapter')
          }}
          onBack={onBack}
        />
      )
  }
}

export default RomanceLearningPath