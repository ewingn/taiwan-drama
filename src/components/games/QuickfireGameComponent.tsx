import React, { useState, useEffect } from 'react'
import { Copy, Share2, Youtube, Camera, MessageCircle, Star, Trophy, Heart, Target, Clock, Zap, Timer } from 'lucide-react'

interface QuickfireGameProps {
  game: {
    title: string
    description: string
    data: {
      pairs: Array<{
        chinese: string
        english: string
      }>
      timeLimit: number
    }
    affectionImpact: {
      perfect: number
      good: number
      poor: number
    }
  }
  chapterTitle?: string
  userStreak?: number
  onComplete: (success: boolean, score: number) => void
}

// Shareable Result Card Component
const ShareableResultCard: React.FC<{
  score: number
  totalItems: number
  completedItems: number
  timeSpent: number
  chapterTitle: string
  affectionEarned: number
  perfectScore: boolean
  streak: number
}> = ({ score, totalItems, completedItems, timeSpent, chapterTitle, affectionEarned, perfectScore, streak }) => {
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateShareText = (platform: string) => {
    const emoji = perfectScore ? '🌟' : score >= 90 ? '⚡' : score >= 80 ? '🔥' : '👍'
    const baseText = `Just crushed Speed Note Writing in TaiwanScript! ⚡\n\n${emoji} Score: ${score}%\n💕 Affection: +${affectionEarned}\n⏱️ Time: ${timeSpent}s\n📚 Chapter: ${chapterTitle}\n🎯 Speed: ${completedItems}/${totalItems} matches`
    
    switch (platform) {
      case 'youtube':
        return `${baseText}\n\nLearning Chinese through Taiwanese drama is so addictive! The note-passing games make vocab stick! 🇹🇼✨\n\n#TaiwanScript #ChineseLearning #Taiwan #LanguageLearning #QuickfireGame`
      case 'instagram':
        return `${baseText}\n\n#TaiwanScript #ChineseLearning #Taiwan #LanguageLearning #StudyMotivation #QuickfireChallenge`
      default:
        return baseText
    }
  }

  const copyToClipboard = async (platform: string) => {
    try {
      await navigator.clipboard.writeText(generateShareText(platform))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto">
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-500 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10 text-center">
          <div className="text-5xl mb-3">⚡</div>
          <h3 className="text-xl font-bold mb-1">TaiwanScript Results</h3>
          <p className="text-sm opacity-90">Speed Note Writing</p>
        </div>
      </div>

      <div className="p-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">{perfectScore ? '🌟' : score >= 90 ? '⚡' : '🔥'}</div>
          <div className="text-3xl font-bold text-gray-800 mb-2">{score}%</div>
          <div className="text-sm text-gray-600 mb-4">{chapterTitle}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-orange-600 mr-1" />
              <span className="font-bold text-orange-800">{completedItems}/{totalItems}</span>
            </div>
            <div className="text-xs text-orange-600">Speed Matches</div>
          </div>
          
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Timer className="w-5 h-5 text-red-600 mr-1" />
              <span className="font-bold text-red-800">{timeSpent}s</span>
            </div>
            <div className="text-xs text-red-600">Lightning Fast</div>
          </div>
          
          <div className="bg-pink-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-5 h-5 text-pink-600 mr-1" />
              <span className="font-bold text-pink-800">+{affectionEarned}</span>
            </div>
            <div className="text-xs text-pink-600">Affection</div>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-5 h-5 text-yellow-600 mr-1" />
              <span className="font-bold text-yellow-800">{streak}</span>
            </div>
            <div className="text-xs text-yellow-600">Day Streak</div>
          </div>
        </div>

        {perfectScore && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 mb-6 border border-yellow-200">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Star className="w-5 h-5 text-yellow-600 fill-current" />
                <Star className="w-5 h-5 text-yellow-600 fill-current" />
                <Star className="w-5 h-5 text-yellow-600 fill-current" />
              </div>
              <div className="font-bold text-yellow-800">Lightning Speed!</div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => setShowShare(!showShare)}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Your Speed!
          </button>
          
          {showShare && (
            <div className="space-y-2">
              <button
                onClick={() => copyToClipboard('youtube')}
                className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <Youtube className="w-5 h-5" />
                Copy for YouTube
              </button>
              
              <button
                onClick={() => copyToClipboard('instagram')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Copy for Instagram
              </button>
            </div>
          )}
          
          {copied && (
            <div className="text-center text-green-600 font-medium text-sm">
              ✓ Copied to clipboard! Ready to share your speed!
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <div className="text-xs text-gray-500 mb-2">Lightning fast Chinese learning!</div>
          <div className="text-sm font-bold text-orange-600"># TaiwanScript ⚡</div>
        </div>
      </div>
    </div>
  )
}

const QuickfireGameComponent: React.FC<QuickfireGameProps> = ({ 
  game, 
  chapterTitle = "Chapter", 
  userStreak = 0, 
  onComplete 
}) => {
  const [timeLeft, setTimeLeft] = useState(game.data.timeLimit || 60)
  const [currentPair, setCurrentPair] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [showSharing, setShowSharing] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [answeredPairs, setAnsweredPairs] = useState<number[]>([])
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0)

  // Safety check for game data
  if (!game || !game.data || !game.data.pairs) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4 text-red-600">Game Loading Error</h3>
        <p className="text-gray-600 mb-4">Unable to load quickfire game data</p>
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
    if (answeredPairs.length === game.data.pairs.length && gameStarted && !gameEnded) {
      setTimeout(() => setGameEnded(true), 1000)
    }
  }, [answeredPairs.length, game.data.pairs.length, gameStarted, gameEnded])

  const handleGameStart = () => {
    setGameStarted(true)
    setStartTime(Date.now())
  }

  const handleAnswer = () => {
    if (!userAnswer.trim()) return

    const currentQuestion = game.data.pairs[currentPair]
    const isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.english.toLowerCase().trim()

    if (isCorrect) {
      setScore(score + 1)
      setFeedback('correct')
      setConsecutiveCorrect(consecutiveCorrect + 1)
      setAnsweredPairs([...answeredPairs, currentPair])
    } else {
      setFeedback('wrong')
      setConsecutiveCorrect(0)
    }

    setTimeout(() => {
      setFeedback(null)
      setUserAnswer('')
      // Move to next unanswered pair
      const nextPair = game.data.pairs.findIndex((_, index) => 
        index > currentPair && !answeredPairs.includes(index)
      )
      if (nextPair !== -1) {
        setCurrentPair(nextPair)
      } else {
        // Wrap around to beginning
        const firstUnanswered = game.data.pairs.findIndex((_, index) => 
          !answeredPairs.includes(index) && index !== currentPair
        )
        if (firstUnanswered !== -1) {
          setCurrentPair(firstUnanswered)
        }
      }
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnswer()
    }
  }

  if (!gameStarted) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">{game.title}</h3>
        <p className="text-gray-600 mb-6">{game.description}</p>
        <div className="bg-orange-50 rounded-lg p-4 mb-4">
          <div className="text-sm font-semibold text-orange-800 mb-2">How to Play:</div>
          <ul className="text-xs text-orange-700 space-y-1">
            <li>⚡ Type the English translation as fast as possible</li>
            <li>🏃 You have {game.data.timeLimit} seconds total</li>
            <li>🎯 Answer as many as you can before time runs out</li>
            <li>🌟 Perfect score: +{game.affectionImpact.perfect} ❤️</li>
          </ul>
        </div>
        <button onClick={handleGameStart} className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors">
          ⚡ Start Speed Challenge
        </button>
      </div>
    )
  }

  if (gameEnded) {
    const finalScore = Math.round((score / game.data.pairs.length) * 100)
    const isSuccess = finalScore >= 70
    const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0
    const perfectScore = finalScore === 100
    const affectionEarned = perfectScore ? game.affectionImpact.perfect : 
                          finalScore >= 70 ? game.affectionImpact.good : 
                          game.affectionImpact.poor

    if (showSharing) {
      return (
        <div className="space-y-6">
          <ShareableResultCard
            score={finalScore}
            totalItems={game.data.pairs.length}
            completedItems={score}
            timeSpent={timeTaken}
            chapterTitle={chapterTitle}
            affectionEarned={affectionEarned}
            perfectScore={perfectScore}
            streak={userStreak}
          />
          <div className="text-center">
            <button
              onClick={() => setShowSharing(false)}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors mr-4"
            >
              Back to Results
            </button>
            <button 
              onClick={() => onComplete(isSuccess, finalScore)} 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue Story
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4">Lightning Round Complete!</h3>
        <div className="text-6xl mb-4">{perfectScore ? '⚡' : finalScore >= 90 ? '🔥' : finalScore >= 70 ? '👍' : '💪'}</div>
        <p className="text-gray-600 mb-2">Speed Score: {finalScore}%</p>
        <p className="text-gray-600 mb-4">Answered: {score}/{game.data.pairs.length} in {timeTaken}s</p>
        
        {consecutiveCorrect >= 3 && (
          <div className="bg-orange-50 rounded-lg p-3 mb-4">
            <div className="text-orange-800 font-bold">🔥 Speed Streak: {consecutiveCorrect} in a row!</div>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="text-sm font-semibold text-gray-700">Affection Impact:</div>
          <div className={`text-sm font-bold ${finalScore >= 90 ? 'text-green-600' : finalScore >= 70 ? 'text-blue-600' : 'text-red-600'}`}>
            {finalScore >= 90 ? `+${game.affectionImpact.perfect}` : finalScore >= 70 ? `+${game.affectionImpact.good}` : `${game.affectionImpact.poor}`} ❤️
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setShowSharing(true)}
            className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Speed
          </button>
          <button 
            onClick={() => onComplete(isSuccess, finalScore)} 
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Story
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = game.data.pairs[currentPair]

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">{game.title}</h3>
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-orange-600'}`}>
            ⏰ {timeLeft}s
          </div>
          <div className="text-sm text-gray-600">
            {score}/{game.data.pairs.length} correct
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${(score / game.data.pairs.length) * 100}%` }}
        />
      </div>

      {/* Current Question */}
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 mb-6 border border-orange-200">
          <div className="text-3xl font-bold text-gray-800 mb-2">{currentQuestion.chinese}</div>
          <div className="text-sm text-gray-500">Type the English translation</div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`text-center p-3 rounded-lg mb-4 ${
            feedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {feedback === 'correct' ? '✓ Correct! Lightning fast!' : `✗ "${currentQuestion.english}"`}
          </div>
        )}

        {/* Input */}
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type answer here..."
          className="w-full text-center text-lg p-4 border-2 border-orange-300 rounded-xl focus:border-orange-500 focus:outline-none"
          disabled={feedback !== null}
          autoFocus
        />
        
        <button
          onClick={handleAnswer}
          disabled={!userAnswer.trim() || feedback !== null}
          className="w-full mt-4 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit Answer
        </button>
      </div>

      {/* Consecutive streak indicator */}
      {consecutiveCorrect >= 2 && (
        <div className="text-center mb-4">
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold">
            🔥 {consecutiveCorrect} streak!
          </div>
        </div>
      )}

      {/* Skip button */}
      <button
        onClick={() => setGameEnded(true)}
        className="w-full bg-gray-400 text-white py-2 rounded-lg text-sm hover:bg-gray-500 transition-colors"
      >
        End Game
      </button>
    </div>
  )
}

export default QuickfireGameComponent