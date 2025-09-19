// src/components/games/MatchingGameComponent.tsx
import React, { useState, useEffect } from 'react'
import { Share2, Copy } from 'lucide-react'

interface MatchingGameProps {
  game: {
    title: string
    description: string
    data: {
      pairs: Array<{
        chinese: string
        english: string
        pinyin: string
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

const MatchingGameComponent: React.FC<MatchingGameProps> = ({ game, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(game.data.timeLimit || 90)
  const [selected, setSelected] = useState<any[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const [copied, setCopied] = useState(false)

  // Safety check for game data
  if (!game || !game.data || !game.data.pairs) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4 text-red-600">Game Loading Error</h3>
        <p className="text-gray-600 mb-4">Unable to load matching game data</p>
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

  // Check if game is complete and generate share message
  useEffect(() => {
    if (matched.length === game.data.pairs.length && gameStarted && !gameEnded) {
      setTimeout(() => setGameEnded(true), 1000)
    }
    if (gameEnded) {
      const score = (matched.length / game.data.pairs.length) * 100
      let affectionChange = 0;
      if (score >= 90) {
        affectionChange = game.affectionImpact.perfect
      } else if (score >= 70) {
        affectionChange = game.affectionImpact.good
      } else {
        affectionChange = game.affectionImpact.poor
      }
      
      const message = `I just scored ${Math.round(score)}% on "${game.title}" and earned +${affectionChange} ❤️ on TaiwanScript! Try to beat my score and learn Chinese through drama! #TaiwanScript #LearnChinese #TaiwaneseDrama`
      setShareMessage(message)
    }
  }, [matched.length, game.data.pairs.length, gameStarted, gameEnded, game.title, game.affectionImpact.perfect, game.affectionImpact.good, game.affectionImpact.poor])

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!gameStarted) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">{game.title}</h3>
        <p className="text-gray-600 mb-6">{game.description}</p>
        <div className="text-sm text-gray-500 mb-4">Match Chinese words with their English meanings</div>
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <div className="text-sm font-semibold text-blue-800 mb-2">How to Play:</div>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Click a Chinese word, then click its English translation</li>
            <li>• Correct matches will turn green and stay matched</li>
            <li>• You have {game.data.timeLimit} seconds to match all pairs</li>
            <li>• Perfect score: +{game.affectionImpact.perfect} ❤️</li>
          </ul>
        </div>
        <button onClick={() => setGameStarted(true)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          Start Game
        </button>
      </div>
    )
  }

  if (gameEnded) {
    const score = (matched.length / game.data.pairs.length) * 100
    const isSuccess = score >= 70
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4">Game Complete!</h3>
        <div className="text-6xl mb-4">{score >= 90 ? '🌟' : score >= 70 ? '👍' : '😅'}</div>
        <p className="text-gray-600 mb-2">Score: {Math.round(score)}%</p>
        <p className="text-gray-600 mb-4">Matched: {matched.length}/{game.data.pairs.length} pairs</p>
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="text-sm font-semibold text-gray-700">Affection Impact:</div>
          <div className={`text-sm font-bold ${score >= 90 ? 'text-green-600' : score >= 70 ? 'text-blue-600' : 'text-red-600'}`}>
            {score >= 90 ? `+${game.affectionImpact.perfect}` : score >= 70 ? `+${game.affectionImpact.good}` : `${game.affectionImpact.poor}`} ❤️
          </div>
        </div>
        
        <div className="space-y-4">
          <button onClick={() => onComplete(isSuccess, score)} className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Continue Story
          </button>
          
          <div className="flex justify-center gap-2">
            <button
              onClick={handleCopyToClipboard}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                copied ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <Copy size={16} />
              {copied ? 'Copied!' : 'Share Results'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Create shuffled items array
  const items = game.data.pairs.flatMap((p: any) => [
    { type: 'chinese', value: p.chinese, pair: p.chinese, pinyin: p.pinyin },
    { type: 'english', value: p.english, pair: p.chinese }
  ]).sort(() => Math.random() - 0.5) // Simple shuffle

  const handleSelect = (item: any) => {
    if (matched.includes(item.pair)) return // Already matched

    if (selected.length === 0) {
      setSelected([item])
    } else if (selected.length === 1) {
      const first = selected[0]
      if (first.pair === item.pair && first.type !== item.type) {
        // Correct match!
        setMatched([...matched, item.pair])
        setSelected([])
      } else {
        // Wrong match - clear selection
        setSelected([])
      }
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">{game.title}</h3>
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'}`}>
            {timeLeft}s
          </div>
          <div className="text-sm text-gray-600">
            {matched.length}/{game.data.pairs.length} matched
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(matched.length / game.data.pairs.length) * 100}%` }}
        />
      </div>

      {/* Selected items display */}
      <div className="mb-4 text-center">
        <div className="text-sm text-gray-600 mb-2">
          Selected: {selected.length}/2
        </div>
        <div className="flex flex-wrap justify-center gap-1">
          {selected.map((item, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {item.value}
            </span>
          ))}
        </div>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {items.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() => handleSelect(item)}
            disabled={matched.includes(item.pair)}
            className={`p-3 border rounded text-sm font-medium transition-all duration-200 ${
              selected.some(s => s.value === item.value) 
                ? 'bg-blue-200 border-blue-400 scale-105' 
                : matched.includes(item.pair) 
                ? 'bg-green-200 border-green-400 text-green-800 cursor-not-allowed' 
                : 'hover:bg-blue-100 hover:border-blue-300 cursor-pointer'
            }`}
          >
            <div className="font-medium">{item.value}</div>
            {item.type === 'chinese' && item.pinyin && (
              <div className="text-xs text-gray-500 mt-1">({item.pinyin})</div>
            )}
          </button>
        ))}
      </div>

      {/* Skip button */}
      <button
        onClick={() => setGameEnded(true)}
        className="w-full bg-gray-400 text-white py-2 rounded-lg text-sm hover:bg-gray-500 transition-colors"
      >
        Skip Game
      </button>
    </div>
  )
}

export default MatchingGameComponent