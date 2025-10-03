// src/components/games/ConnectionsgameComponent.tsx (note the capital G)
import React, { useState, useEffect } from 'react'
import { Share2, Copy } from 'lucide-react'

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
  const [shareMessage, setShareMessage] = useState('')
  const [copied, setCopied] = useState(false)

  // Safety check for game data
  if (!game || !game.data || !game.data.words || !game.data.groups) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-2xl text-center border border-red-100">
        <h3 className="text-xl font-bold mb-4 text-red-600">Game Loading Error</h3>
        <p className="text-gray-600 mb-4">Unable to load connections game data</p>
        <button onClick={() => onComplete(false, 0)} className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors">
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

  // Check if game is complete and generate share message
  useEffect(() => {
    if (foundGroups.length === game.data.groups.length && gameStarted && !gameEnded) {
      setTimeout(() => setGameEnded(true), 1000)
    }
    if (gameEnded) {
      const score = (foundGroups.length / game.data.groups.length) * 100
      let affectionChange = 0;
      if (score >= 90) {
        affectionChange = game.affectionImpact.perfect
      } else if (score >= 70) {
        affectionChange = game.affectionImpact.good
      } else {
        affectionChange = game.affectionImpact.poor
      }
      const message = `I just scored ${Math.round(score)}% on "${game.title}" and found ${foundGroups.length} cultural connections on TaiwanScript! I earned +${affectionChange} ❤️! Try to beat my score! #TaiwanScript #LearnChinese #TaiwaneseCulture`
      setShareMessage(message)
    }
  }, [foundGroups.length, game.data.groups.length, gameStarted, gameEnded, game.title, game.affectionImpact.perfect, game.affectionImpact.good, game.affectionImpact.poor])

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!gameStarted) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-2xl border border-purple-100 backdrop-blur-sm">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {game.title}
        </h3>
        <p className="text-gray-600 mb-6">{game.description}</p>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4 border border-purple-200">
          <div className="text-sm font-semibold text-purple-800 mb-2">How to Play:</div>
          <ul className="text-xs text-purple-700 space-y-1">
            <li>• Find groups of 4 words that share something in common</li>
            <li>• Select 4 words and submit your guess</li>
            <li>• Each group has a hidden cultural connection to Taiwan</li>
            <li>• Perfect score: +{game.affectionImpact.perfect} ❤️</li>
          </ul>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
          <div className="text-sm font-semibold text-gray-700 mb-2">Words you'll be grouping:</div>
          <div className="grid grid-cols-4 gap-2">
            {game.data.words.map((word, index) => (
              <div key={index} className="p-2 border border-gray-300 rounded text-center text-sm bg-white text-gray-600">
                {word}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            ↑ Preview only - Click "Start Game" to begin!
          </div>
        </div>
        <button 
          onClick={() => setGameStarted(true)} 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl 
                     font-bold hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:scale-105 
                     transition-all duration-300 shadow-lg"
        >
          🎮 Start Game
        </button>
      </div>
    )
  }

  if (gameEnded) {
    const score = (foundGroups.length / game.data.groups.length) * 100
    const isSuccess = score >= 70
    const perfectScore = score === 100
    
    return (
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center border border-purple-100 
                      backdrop-blur-sm animate-in fade-in duration-500">
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 
                       bg-clip-text text-transparent">
          Game Complete!
        </h3>
        <div className="text-8xl mb-4 animate-bounce">
          {perfectScore ? '🌟' : score >= 90 ? '🎯' : score >= 70 ? '👍' : '😅'}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-1">{Math.round(score)}%</div>
            <div className="text-sm text-purple-700 font-medium">Final Score</div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-200">
            <div className="text-3xl font-bold text-pink-600 mb-1">{foundGroups.length}/{game.data.groups.length}</div>
            <div className="text-sm text-pink-700 font-medium">Groups Found</div>
          </div>
        </div>
        
        {/* Show found groups */}
        <div className="space-y-2 mb-6">
          {foundGroups.map((group, index) => (
            <div key={index} className={`p-3 rounded-xl ${group.color} border-2 shadow-md`}>
              <div className="font-semibold text-sm text-center">{group.category}</div>
              <div className="text-xs text-center opacity-80 mt-1">{group.items.join(' • ')}</div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-4 mb-6 border border-pink-200">
          <div className="text-sm font-semibold text-gray-700 mb-2">Affection Impact:</div>
          <div className={`text-2xl font-bold ${score >= 90 ? 'text-green-600' : score >= 70 ? 'text-blue-600' : 'text-red-600'}`}>
            {score >= 90 ? `+${game.affectionImpact.perfect}` : score >= 70 ? `+${game.affectionImpact.good}` : `${game.affectionImpact.poor}`} ❤️
          </div>
          {perfectScore && (
            <div className="mt-2 text-xs text-yellow-800 bg-yellow-100 rounded-full px-3 py-1 inline-block">
              Perfect! All cultural connections found! 🌟
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => onComplete(isSuccess, score)} 
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl 
                       font-bold hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-105 
                       transition-all duration-300 shadow-lg"
          >
            Continue Story →
          </button>
          
          <button
            onClick={handleCopyToClipboard}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                       font-semibold transition-all duration-300 ${
              copied 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md'
            }`}
          >
            <Copy size={18} />
            {copied ? 'Copied to Clipboard!' : 'Share Results'}
          </button>
        </div>
      </div>
    )
  }

  const handleWordSelect = (word: string) => {
    if (foundGroups.some(group => group.items.includes(word))) {
      return
    }

    if (selectedWords.includes(word)) {
      setSelectedWords(prev => prev.filter(w => w !== word))
    } else if (selectedWords.length < 4) {
      setSelectedWords(prev => [...prev, word])
    }
  }

  const handleSubmitGroup = () => {
    if (selectedWords.length !== 4) return

    const matchingGroup = game.data.groups.find(group => 
      group.items.length === selectedWords.length &&
      group.items.every(item => selectedWords.includes(item))
    )

    if (matchingGroup) {
      setFoundGroups([...foundGroups, {
        category: matchingGroup.category,
        items: [...matchingGroup.items],
        color: matchingGroup.color
      }])
      setSelectedWords([])
      setLastAttemptResult('correct')
      setTimeout(() => setLastAttemptResult(null), 2000)
    } else {
      setAttempts(attempts + 1)
      setSelectedWords([])
      setLastAttemptResult('incorrect')
      setTimeout(() => setLastAttemptResult(null), 2000)
      
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
    <div className="bg-white rounded-2xl p-6 shadow-2xl border border-purple-100 backdrop-blur-sm">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 
                       bg-clip-text text-transparent mb-3">
          {game.title}
        </h3>
        <div className="flex items-center justify-center gap-6">
          <div className={`text-3xl font-bold ${timeLeft <= 15 ? 'text-red-600 animate-pulse' : 'text-purple-600'}`}>
            ⏰ {timeLeft}s
          </div>
          <div className="text-lg text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            {foundGroups.length}/{game.data.groups.length} groups
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6 shadow-inner">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 shadow-lg"
          style={{ width: `${(foundGroups.length / game.data.groups.length) * 100}%` }}
        />
      </div>

      {/* Found groups display */}
      {foundGroups.length > 0 && (
        <div className="mb-6 space-y-2">
          {foundGroups.map((group, index) => (
            <div key={index} className={`p-3 rounded-xl ${group.color} border-2 shadow-md animate-in fade-in`}>
              <div className="font-semibold text-sm text-center">{group.category}</div>
              <div className="text-xs text-center opacity-80 mt-1">{group.items.join(' • ')}</div>
            </div>
          ))}
        </div>
      )}

      {/* Feedback for last attempt */}
      {lastAttemptResult && (
        <div className={`text-center p-3 rounded-xl mb-4 font-medium ${
          lastAttemptResult === 'correct' 
            ? 'bg-green-100 text-green-800 border-2 border-green-300' 
            : 'bg-red-100 text-red-800 border-2 border-red-300'
        }`}>
          {lastAttemptResult === 'correct' ? '✓ Correct group!' : '✗ Not quite right. Try again!'}
        </div>
      )}

      {/* Selected words display */}
      <div className="mb-6 text-center">
        <div className="text-sm text-gray-600 mb-2 font-medium">
          Selected: {selectedWords.length}/4
        </div>
        <div className="flex flex-wrap justify-center gap-2 min-h-[40px]">
          {selectedWords.map((word, index) => (
            <span key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 
                                        px-3 py-2 rounded-lg text-sm font-medium border border-purple-300 
                                        shadow-md animate-in fade-in">
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Word grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {availableWords.map((word: string, index: number) => (
          <button
            key={`${word}-${index}`}
            onClick={() => handleWordSelect(word)}
            className={`p-4 border-2 rounded-xl text-sm font-medium transition-all duration-200 
                       transform hover:scale-105 active:scale-95 shadow-md ${
              selectedWords.includes(word)
                ? 'bg-gradient-to-br from-purple-200 to-pink-200 border-purple-400 scale-105 shadow-xl text-purple-900'
                : 'bg-white border-gray-300 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:border-purple-400 text-gray-700'
            } cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
            type="button"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Hint system */}
      {showHint && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4 shadow-md">
          <div className="text-sm text-yellow-800">
            <strong>💡 Hint:</strong> Look for words related to {game.data.groups[foundGroups.length]?.category.split(' ')[0]}...
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmitGroup}
          disabled={selectedWords.length !== 4}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl 
                     font-bold disabled:opacity-50 disabled:cursor-not-allowed 
                     hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:scale-105 
                     transition-all duration-300 shadow-lg"
        >
          Submit Group ({selectedWords.length}/4)
        </button>
        <button
          onClick={() => setSelectedWords([])}
          disabled={selectedWords.length === 0}
          className="px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-600 font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 
                     hover:border-gray-400 transition-all duration-300 shadow-md"
        >
          Clear
        </button>
      </div>

      {/* Skip button */}
      <button
        onClick={() => setGameEnded(true)}
        className="w-full bg-gray-400 text-white py-3 rounded-xl text-sm mt-3 
                   hover:bg-gray-500 transition-colors shadow-md"
      >
        Skip Game
      </button>
    </div>
  )
}

export default ConnectionsGameComponent