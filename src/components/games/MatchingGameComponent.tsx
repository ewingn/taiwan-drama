// src/components/games/MatchingGameComponent.tsx
import React, { useState } from 'react'

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

  if (!gameStarted) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">{game.title}</h3>
        <p className="text-gray-600 mb-6">{game.description}</p>
        <button
          onClick={() => setGameStarted(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
        >
          Start Game
        </button>
      </div>
    )
  }

  if (gameEnded) {
    const score = (matched.length / game.data.pairs.length) * 100
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4">Game Complete!</h3>
        <div className="text-6xl mb-4">{score >= 90 ? '🌟' : score >= 70 ? '👍' : '😅'}</div>
        <p className="text-gray-600 mb-4">Score: {Math.round(score)}%</p>
        <button
          onClick={() => onComplete(score >= 70, score)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Continue Story
        </button>
      </div>
    )
  }

  const items = game.data.pairs.flatMap((p: any) => [
    { type: 'chinese', value: p.chinese, pair: p.chinese },
    { type: 'english', value: p.english, pair: p.chinese }
  ])

  const handleSelect = (item: any) => {
    if (selected.length === 0) {
      setSelected([item])
    } else if (selected.length === 1) {
      const first = selected[0]
      if (first.pair === item.pair && first.type !== item.type) {
        setMatched([...matched, item.pair])
        setSelected([])
      } else {
        setSelected([]) // Incorrect match
      }
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">{game.title}</h3>
        <div className="text-2xl font-bold text-blue-600">{timeLeft}s</div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {items.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() => handleSelect(item)}
            disabled={matched.includes(item.pair)}
            className={`p-2 border rounded ${
              selected.some(s => s.value === item.value) ? 'bg-blue-200' : 'hover:bg-blue-100'
            } ${matched.includes(item.pair) ? 'bg-green-200' : ''}`}
          >
            {item.value}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MatchingGameComponent