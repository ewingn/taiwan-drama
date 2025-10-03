// src/components/games/MatchingGameComponent.tsx
import React, { useState, useEffect } from 'react'
import { Share2, Copy, Volume2, Zap, Trophy } from 'lucide-react'

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
      <div className="bg-white rounded-2xl p-6 shadow-2xl text-center border border-red-100">
        <h3 className="text-xl font-bold mb-4 text-red-600">Game Loading Error</h3>
        <p className="text-gray-600 mb-4">Unable to load matching game data</p>
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
      <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-100 backdrop-blur-sm">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {game.title}
        </h3>
        <p className="text-gray-600 mb-6">{game.description}</p>
        <div className="text-sm text-gray-500 mb-4">Match Chinese words with their English meanings</div>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border border-blue-200">
          <div className="text-sm font-semibold text-blue-800 mb-2">How to Play:</div>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Click a Chinese word, then click its English translation</li>
            <li>• Correct matches will turn green and stay matched</li>
            <li>• You have {game.data.timeLimit} seconds to match all pairs</li>
            <li>• Perfect score: +{game.affectionImpact.perfect} ❤️</li>
          </ul>
        </div>
        <button 
          onClick={() => setGameStarted(true)} 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold 
                     hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 
                     transition-all duration-300 shadow-lg"
        >
          🎮 Start Game
        </button>
      </div>
    )
  }

  if (gameEnded) {
    const score = (matched.length / game.data.pairs.length) * 100
    const isSuccess = score >= 70
    const perfectScore = score === 100
    
    return (
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center border border-blue-100 
                      backdrop-blur-sm animate-in fade-in duration-500">
        <div className="mb-6">
          <div className="text-8xl mb-4 animate-bounce">
            {perfectScore ? '🌟' : score >= 90 ? '⚡' : score >= 70 ? '👍' : '😅'}
          </div>
          <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 
                         bg-clip-text text-transparent">
            Game Complete!
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {Math.round(score)}%
            </div>
            <div className="text-sm text-blue-700 font-medium">Final Score</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {matched.length}/{game.data.pairs.length}
            </div>
            <div className="text-sm text-purple-700 font-medium">Pairs Matched</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-4 mb-6 border border-pink-200">
          <div className="text-sm font-semibold text-gray-700 mb-2">Affection Impact:</div>
          <div className={`text-2xl font-bold flex items-center justify-center gap-2 ${
            score >= 90 ? 'text-green-600' : score >= 70 ? 'text-blue-600' : 'text-red-600'
          }`}>
            {score >= 90 ? (
              <>
                <Trophy className="w-6 h-6" />
                +{game.affectionImpact.perfect} ❤️
              </>
            ) : score >= 70 ? (
              <>
                <Zap className="w-6 h-6" />
                +{game.affectionImpact.good} ❤️
              </>
            ) : (
              <>{game.affectionImpact.poor} ❤️</>
            )}
          </div>
          {perfectScore && (
            <div className="mt-2 text-xs text-yellow-800 bg-yellow-100 rounded-full px-3 py-1 inline-block">
              Perfect Score! Maximum affection earned! 🌟
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
            {copied ? 'Copied to Clipboard!' : 'Share Your Score'}
          </button>
        </div>
      </div>
    )
  }

  // Create shuffled items array
  const items = game.data.pairs.flatMap((p: any) => [
    { type: 'chinese', value: p.chinese, pair: p.chinese, pinyin: p.pinyin },
    { type: 'english', value: p.english, pair: p.chinese }
  ]).sort(() => Math.random() - 0.5)

  const handleSelect = (item: any) => {
    if (matched.includes(item.pair)) return

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
    <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-100 backdrop-blur-sm">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                       bg-clip-text text-transparent mb-3">
          {game.title}
        </h3>
        <div className="flex items-center justify-center gap-6">
          <div className={`text-3xl font-bold ${
            timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-blue-600'
          }`}>
            ⏰ {timeLeft}s
          </div>
          <div className="text-lg text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            {matched.length}/{game.data.pairs.length} matched
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6 shadow-inner">
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full 
                     transition-all duration-300 shadow-lg"
          style={{ width: `${(matched.length / game.data.pairs.length) * 100}%` }}
        />
      </div>

      {/* Selected items display */}
      <div className="mb-6 text-center">
        <div className="text-sm text-gray-600 mb-2 font-medium">
          Selected: {selected.length}/2
        </div>
        <div className="flex flex-wrap justify-center gap-2 min-h-[40px]">
          {selected.map((item, index) => (
            <span 
              key={index} 
              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 
                         px-4 py-2 rounded-lg text-sm font-medium border border-blue-300 
                         shadow-md animate-in fade-in"
            >
              {item.value}
            </span>
          ))}
        </div>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {items.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() => handleSelect(item)}
            disabled={matched.includes(item.pair)}
            className={`p-4 border-2 rounded-xl text-sm font-medium transition-all duration-200 
                       transform hover:scale-105 active:scale-95 shadow-md ${
              selected.some(s => s.value === item.value) 
                ? 'bg-gradient-to-br from-blue-200 to-purple-200 border-blue-400 scale-105 shadow-xl text-blue-900' 
                : matched.includes(item.pair) 
                ? 'bg-gradient-to-br from-green-200 to-emerald-200 border-green-400 text-green-800 cursor-not-allowed shadow-lg' 
                : 'bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 cursor-pointer border-gray-300'
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
        className="w-full bg-gray-400 text-white py-3 rounded-xl text-sm 
                   hover:bg-gray-500 transition-colors shadow-md"
      >
        Skip Game
      </button>
    </div>
  )
}

export default MatchingGameComponent