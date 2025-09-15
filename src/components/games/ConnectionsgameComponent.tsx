// src/components/games/ConnectionsGameComponent.tsx
import React, { useState, useEffect } from 'react'

interface ConnectionsGameProps {
  game: {
    title: string
    description: string
    data: {
      words: string[]
      groups: Array<{
        category: string
        items: string[]
        color: string
        culturalNote?: string
      }>
      timeLimit: number
    }
    affectionImpact: {
      perfect: number
      good: number
      poor: number
    }
  }
  onComplete: (success: boolean, score: number) => void
}

const ConnectionsGameComponent: React.FC<ConnectionsGameProps> = ({ game, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(game.data.timeLimit || 120)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [foundGroups, setFoundGroups] = useState<Array<{category: string, items: string[], color: string}>>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [lastAttemptResult, setLastAttemptResult] = useState<'correct' | 'incorrect' | null>(null)

  // Safety check for game data
  if (!game || !game.data || !game.data.words || !game.data.groups) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4 text-red-600">Game Loading Error</h3>
        <p className="text-gray-600 mb-4">Unable to load connections game data</p>
        <button onClick={() => onComplete(false, 0)} className="bg-gray-600 text-white px-6 py-3 rounded-lg">
          Back to Chapter
        </button>
      </div>
    )
  }

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameEnded && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameStarted && !gameEnded) {
      setGameEnded(true)
    }
  }, [gameStarted, gameEnded, timeLeft])

  // Check if game is complete
  useEffect(() => {
    if (foundGroups.length === game.data.groups.length && gameStarted && !gameEnded) {
      setTimeout(() => setGameEnded(true), 1000)
    }
  }, [foundGroups.length, game.data.groups.length, gameStarted, gameEnded])

  if (!gameStarted) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">{game.title}</h3>
        <p className="text-gray-600 mb-6">{game.description}</p>
        <div className="bg-purple-50 rounded-lg p-4 mb-4">
          <div className="text-sm font-semibold text-purple-800 mb-2">How to Play:</div>
          <ul className="text-xs text-purple-700 space-y-1">
            <li>• Find groups of 4 words that share something in common</li>
            <li>• Select 4 words and submit your guess</li>
            <li>• Each group has a hidden cultural connection to Taiwan</li>
            <li>• Perfect score: +{game.affectionImpact.perfect} ❤️</li>
          </ul>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {game.data.words.map((word, index) => (
            <div key={index} className="p-2 border border-gray-300 rounded text-center text-sm bg-gray-50">
              {word}
            </div>
          ))}
        </div>
        <button onClick={() => setGameStarted(true)} className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors">
          Start Game
        </button>
      </div>
    )
  }

  if (gameEnded) {
    const score = (foundGroups.length / game.data.groups.length) * 100
    const isSuccess = score >= 70
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4">Game Complete!</h3>
        <div className="text-6xl mb-4">{score >= 90 ? '🌟' : score >= 70 ? '👍' : '😅'}</div>
        <p className="text-gray-600 mb-2">Score: {Math.round(score)}%</p>
        <p className="text-gray-600 mb-4">Found: {foundGroups.length}/{game.data.groups.length} groups</p>
        
        {/* Show found groups */}
        <div className="space-y-2 mb-4">
          {foundGroups.map((group, index) => (
            <div key={index} className={`p-3 rounded-lg ${group.color}`}>
              <div className="font-semibold text-sm">{group.category}</div>
              <div className="text-xs">{group.items.join(', ')}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="text-sm font-semibold text-gray-700">Affection Impact:</div>
          <div className={`text-sm font-bold ${score >= 90 ? 'text-green-600' : score >= 70 ? 'text-blue-600' : 'text-red-600'}`}>
            {score >= 90 ? `+${game.affectionImpact.perfect}` : score >= 70 ? `+${game.affectionImpact.good}` : `${game.affectionImpact.poor}`} ❤️
          </div>
        </div>
        <button onClick={() => onComplete(isSuccess, score)} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          Continue Story
        </button>
      </div>
    )
  }

  const handleWordSelect = (word: string) => {
    if (foundGroups.some(group => group.items.includes(word))) return // Already in a found group

    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word))
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word])
    }
  }

  const handleSubmitGroup = () => {
    if (selectedWords.length !== 4) return

    // Check if this selection matches any group
    const matchingGroup = game.data.groups.find(group => 
      group.items.length === selectedWords.length &&
      group.items.every(item => selectedWords.includes(item))
    )

    if (matchingGroup) {
      // Correct group found!
      setFoundGroups([...foundGroups, {
        category: matchingGroup.category,
        items: [...matchingGroup.items],
        color: matchingGroup.color
      }])
      setSelectedWords([])
      setLastAttemptResult('correct')
      setTimeout(() => setLastAttemptResult(null), 2000)
    } else {
      // Incorrect guess
      setAttempts(attempts + 1)
      setSelectedWords([])
      setLastAttemptResult('incorrect')
      setTimeout(() => setLastAttemptResult(null), 2000)
      
      // Show hint after 3 failed attempts
      if (attempts >= 2) {
        setShowHint(true)
      }
    }
  }

  const getAvailableWords = () => {
    const foundWords = foundGroups.flatMap(group => group.items)
    return game.data.words.filter(word => !foundWords.includes(word))
  }

  const availableWords = getAvailableWords()

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">{game.title}</h3>
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className={`text-2xl font-bold ${timeLeft <= 15 ? 'text-red-600' : 'text-purple-600'}`}>
            {timeLeft}s
          </div>
          <div className="text-sm text-gray-600">
            {foundGroups.length}/{game.data.groups.length} groups
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(foundGroups.length / game.data.groups.length) * 100}%` }}
        />
      </div>

      {/* Found groups display */}
      {foundGroups.length > 0 && (
        <div className="mb-4 space-y-2">
          {foundGroups.map((group, index) => (
            <div key={index} className={`p-3 rounded-lg ${group.color}`}>
              <div className="font-semibold text-sm text-center">{group.category}</div>
              <div className="text-xs text-center opacity-80">{group.items.join(' • ')}</div>
            </div>
          ))}
        </div>
      )}

      {/* Feedback for last attempt */}
      {lastAttemptResult && (
        <div className={`text-center p-2 rounded mb-4 ${
          lastAttemptResult === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {lastAttemptResult === 'correct' ? '✓ Correct group!' : '✗ Not quite right. Try again!'}
        </div>
      )}

      {/* Selected words display */}
      <div className="mb-4 text-center">
        <div className="text-sm text-gray-600 mb-2">
          Selected: {selectedWords.length}/4
        </div>
        <div className="flex flex-wrap justify-center gap-1">
          {selectedWords.map((word, index) => (
            <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Word grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {availableWords.map((word: string, index: number) => (
          <button
            key={index}
            onClick={() => handleWordSelect(word)}
            className={`p-3 border rounded text-sm font-medium transition-all duration-200 ${
              selectedWords.includes(word)
                ? 'bg-purple-200 border-purple-400 scale-105'
                : 'hover:bg-purple-100 hover:border-purple-300 cursor-pointer border-gray-300'
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Hint system */}
      {showHint && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="text-sm text-yellow-800">
            <strong>💡 Hint:</strong> Look for words related to {game.data.groups[foundGroups.length]?.category.split(' ')[0]}...
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleSubmitGroup}
          disabled={selectedWords.length !== 4}
          className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
        >
          Submit Group ({selectedWords.length}/4)
        </button>
        <button
          onClick={() => setSelectedWords([])}
          disabled={selectedWords.length === 0}
          className="px-4 py-3 border border-gray-300 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Skip button */}
      <button
        onClick={() => setGameEnded(true)}
        className="w-full bg-gray-400 text-white py-2 rounded-lg text-sm mt-2 hover:bg-gray-500 transition-colors"
      >
        Skip Game
      </button>
    </div>
  )
}

export default ConnectionsGameComponent