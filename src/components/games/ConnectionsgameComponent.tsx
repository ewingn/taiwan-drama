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
        difficulty: number // 1 = easiest (blue), 4 = hardest (red)
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
  const [foundGroups, setFoundGroups] = useState<Array<{category: string, items: string[], color: string, difficulty: number}>>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [maxMistakes] = useState(4)
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | 'oneAway' | null>(null)
  const [shuffledWords, setShuffledWords] = useState<string[]>([])

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

  // Initialize shuffled words
  useEffect(() => {
    if (game.data.words.length === 16) {
      setShuffledWords([...game.data.words].sort(() => Math.random() - 0.5))
    }
  }, [game.data.words])

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

  // Clear result after 2 seconds
  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => setShowResult(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [showResult])

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-yellow-200 border-yellow-400 text-yellow-900' // Easy
      case 2: return 'bg-green-200 border-green-400 text-green-900'   // Medium-Easy  
      case 3: return 'bg-blue-200 border-blue-400 text-blue-900'     // Medium-Hard
      case 4: return 'bg-purple-200 border-purple-400 text-purple-900' // Hard
      default: return 'bg-gray-200 border-gray-400 text-gray-900'
    }
  }

  if (!gameStarted) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">{game.title}</h3>
        <p className="text-gray-600 mb-6">{game.description}</p>
        <div className="bg-purple-50 rounded-lg p-4 mb-4">
          <div className="text-sm font-semibold text-purple-800 mb-2">How to Play Connections:</div>
          <ul className="text-xs text-purple-700 space-y-1">
            <li>• Find groups of 4 words that share something in common</li>
            <li>• Select exactly 4 words and click Submit</li>
            <li>• You have {maxMistakes} mistakes before losing</li>
            <li>• Groups range from easy (yellow) to hard (purple)</li>
            <li>• Perfect score: +{game.affectionImpact.perfect} ❤️</li>
          </ul>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {game.data.words.slice(0, 16).map((word, index) => (
            <div key={index} className="p-2 border border-gray-300 rounded text-center text-sm bg-gray-50 font-medium">
              {word}
            </div>
          ))}
        </div>
        <button onClick={() => setGameStarted(true)} className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors">
          Start Connections
        </button>
      </div>
    )
  }

  if (gameEnded || mistakes >= maxMistakes) {
    const score = (foundGroups.length / game.data.groups.length) * 100
    const isSuccess = score >= 50 // More lenient for connections
    const finalScore = Math.max(0, score - (mistakes * 10)) // Penalty for mistakes
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4">Game Complete!</h3>
        <div className="text-6xl mb-4">{score >= 90 ? '🌟' : score >= 50 ? '👍' : '😅'}</div>
        <p className="text-gray-600 mb-2">Score: {Math.round(finalScore)}%</p>
        <p className="text-gray-600 mb-2">Found: {foundGroups.length}/{game.data.groups.length} groups</p>
        <p className="text-gray-600 mb-4">Mistakes: {mistakes}/{maxMistakes}</p>
        
        {/* Show all groups */}
        <div className="space-y-2 mb-4 text-left">
          {/* Found groups */}
          {foundGroups.map((group, index) => (
            <div key={index} className={`p-3 rounded-lg border-2 ${getDifficultyColor(group.difficulty)}`}>
              <div className="font-bold text-sm text-center">{group.category}</div>
              <div className="text-xs text-center opacity-80">{group.items.join(' • ')}</div>
            </div>
          ))}
          
          {/* Missed groups */}
          {game.data.groups
            .filter(group => !foundGroups.some(found => found.category === group.category))
            .map((group, index) => (
              <div key={index} className="p-3 rounded-lg border-2 bg-gray-100 border-gray-300 text-gray-700">
                <div className="font-bold text-sm text-center">{group.category}</div>
                <div className="text-xs text-center opacity-80">{group.items.join(' • ')}</div>
              </div>
            ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="text-sm font-semibold text-gray-700">Affection Impact:</div>
          <div className={`text-sm font-bold ${finalScore >= 90 ? 'text-green-600' : finalScore >= 50 ? 'text-blue-600' : 'text-red-600'}`}>
            {finalScore >= 90 ? `+${game.affectionImpact.perfect}` : finalScore >= 50 ? `+${game.affectionImpact.good}` : `${game.affectionImpact.poor}`} ❤️
          </div>
        </div>
        <button onClick={() => onComplete(isSuccess, finalScore)} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          Continue Story
        </button>
      </div>
    )
  }

  const handleWordSelect = (word: string) => {
    // Can't select words that are already in found groups
    if (foundGroups.some(group => group.items.includes(word))) return

    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word))
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word])
    }
  }

  const handleSubmit = () => {
    if (selectedWords.length !== 4) return

    // Check if this selection matches any group exactly
    const matchingGroup = game.data.groups.find(group => 
      group.items.length === 4 &&
      selectedWords.length === 4 &&
      group.items.every(item => selectedWords.includes(item)) &&
      selectedWords.every(item => group.items.includes(item))
    )

    if (matchingGroup) {
      // Correct group found!
      const newFoundGroup = {
        category: matchingGroup.category,
        items: [...matchingGroup.items],
        color: matchingGroup.color,
        difficulty: matchingGroup.difficulty || 1
      }
      setFoundGroups([...foundGroups, newFoundGroup])
      setSelectedWords([])
      setShowResult('correct')
    } else {
      // Check if 3 out of 4 are correct (one away)
      const oneAwayGroup = game.data.groups.find(group =>
        selectedWords.filter(word => group.items.includes(word)).length === 3
      )
      
      if (oneAwayGroup) {
        setShowResult('oneAway')
      } else {
        setShowResult('incorrect')
      }
      
      setMistakes(prev => prev + 1)
      setSelectedWords([])
    }
  }

  const handleShuffle = () => {
    const remainingWords = shuffledWords.filter(word => 
      !foundGroups.some(group => group.items.includes(word))
    )
    const newShuffled = [...remainingWords].sort(() => Math.random() - 0.5)
    
    // Add back the found groups' words in their positions
    const finalWords = [...shuffledWords]
    let shuffleIndex = 0
    
    for (let i = 0; i < finalWords.length; i++) {
      if (!foundGroups.some(group => group.items.includes(finalWords[i]))) {
        finalWords[i] = newShuffled[shuffleIndex]
        shuffleIndex++
      }
    }
    
    setShuffledWords(finalWords)
  }

  const getAvailableWords = () => {
    return shuffledWords.filter(word => 
      !foundGroups.some(group => group.items.includes(word))
    )
  }

  const availableWords = getAvailableWords()

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">{game.title}</h3>
        <div className="text-sm text-gray-600 mt-1">
          Create four groups of four!
        </div>
      </div>

      {/* Timer and Mistakes */}
      <div className="flex justify-between items-center mb-4">
        <div className={`text-sm font-bold ${timeLeft <= 15 ? 'text-red-600' : 'text-purple-600'}`}>
          ⏱️ {timeLeft}s
        </div>
        <div className="text-sm text-gray-600">
          Mistakes: {mistakes}/{maxMistakes}
        </div>
      </div>

      {/* Mistakes indicator */}
      <div className="flex justify-center gap-1 mb-4">
        {Array.from({ length: maxMistakes }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index < mistakes ? 'bg-red-400' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Result feedback */}
      {showResult && (
        <div className={`text-center p-2 rounded mb-4 ${
          showResult === 'correct' ? 'bg-green-100 text-green-800' :
          showResult === 'oneAway' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {showResult === 'correct' && '✓ Correct group!'}
          {showResult === 'oneAway' && '⚠️ One away...'}
          {showResult === 'incorrect' && '✗ Not quite right'}
        </div>
      )}

      {/* Found groups */}
      {foundGroups.length > 0 && (
        <div className="mb-4 space-y-2">
          {foundGroups.map((group, index) => (
            <div key={index} className={`p-3 rounded-lg border-2 ${getDifficultyColor(group.difficulty)}`}>
              <div className="font-bold text-sm text-center uppercase tracking-wider">{group.category}</div>
              <div className="text-xs text-center opacity-80 mt-1">{group.items.join(', ')}</div>
            </div>
          ))}
        </div>
      )}

      {/* Word grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {availableWords.map((word: string, index: number) => (
          <button
            key={`${word}-${index}`}
            onClick={() => handleWordSelect(word)}
            className={`p-3 border-2 rounded-lg text-sm font-bold transition-all duration-200 ${
              selectedWords.includes(word)
                ? 'bg-gray-800 text-white border-gray-800 transform scale-95'
                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400'
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Selected words display */}
        {selectedWords.length > 0 && (
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">Selected ({selectedWords.length}/4):</div>
            <div className="text-sm font-medium">{selectedWords.join(', ')}</div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedWords([])}
            disabled={selectedWords.length === 0}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Clear
          </button>
          
          <button
            onClick={handleShuffle}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Shuffle
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={selectedWords.length !== 4}
            className="flex-1 py-2 px-4 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors text-sm font-bold"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={() => setGameEnded(true)}
        className="w-full bg-gray-400 text-white py-2 rounded-lg text-sm mt-3 hover:bg-gray-500 transition-colors"
      >
        Give Up
      </button>
    </div>
  )
}

export default ConnectionsGameComponent