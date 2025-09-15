// src/components/romance/StoryOverviewView.tsx
import React from 'react'
import { ArrowRight, Star, Heart, Gamepad2, MessageCircle, Lock, ChevronRight, Award, Target } from 'lucide-react'

interface StoryChapter {
  id: number
  title: string
  subtitle: string
  description: string
  setting: string
  timeOfDay: string
  mood: string
  unlocked: boolean
  completed: boolean
  keyVocabulary: any[]
  miniGames: any[]
  voicePractice: {
    affectionReward: number
  }
  requiredAffection: number
  perfectAffection: number
}

interface GameProgress {
  currentChapter: number
  totalAffection: number
  chaptersCompleted: number[]
  gamesCompleted: string[]
  perfectChapters: number[]
  storyEnding: 'incomplete' | 'bad' | 'good' | 'perfect' | 'failed'
}

interface StoryOverviewProps {
  chapters: StoryChapter[]
  gameProgress: GameProgress
  onChapterSelect: (chapter: StoryChapter) => void
  onBack: () => void
}

const STORY_ENDINGS = {
  PERFECT: 200,
  GOOD: 150,
  OKAY: 100,
  BAD: 50,
  FAILED: 0
}

const StoryOverviewView: React.FC<StoryOverviewProps> = ({
  chapters,
  gameProgress,
  onChapterSelect,
  onBack
}) => {
  const getAffectionStatus = () => {
    const affection = gameProgress.totalAffection
    if (affection >= 180) return { emoji: '💕', text: 'Deeply in Love', color: 'text-red-600' }
    if (affection >= 150) return { emoji: '😍', text: 'Strong Romance', color: 'text-pink-600' }
    if (affection >= 100) return { emoji: '😊', text: 'Good Friends', color: 'text-yellow-600' }
    if (affection >= 50) return { emoji: '🙂', text: 'Getting Closer', color: 'text-blue-600' }
    return { emoji: '😐', text: 'Acquaintances', color: 'text-gray-600' }
  }

  const handleChapterClick = (chapter: StoryChapter) => {
    const isUnlocked = chapter.id <= gameProgress.currentChapter || chapter.id === 1
    if (isUnlocked) {
      onChapterSelect(chapter)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Learning Arcs
        </button>

        {/* Story Introduction */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8 border-2 border-purple-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎭 Taiwan Romance Drama Story
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Live Your Dream of Starring in a Taiwanese Drama While Mastering Chinese
            </p>
          </div>

          {/* Story Hook */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-purple-800">
              🌸 Your Love Story Awaits 🌸
            </h2>
            
            <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-4">
              <p className="text-lg">
                <strong>Imagine stepping into your favorite Taiwanese drama...</strong> You're the protagonist in a heartwarming love story set in the vibrant streets of Taipei. But this isn't just fantasy – it's your Chinese learning journey.
              </p>
              
              <div className="bg-white rounded-lg p-6 border-l-4 border-pink-400 my-6">
                <h3 className="text-xl font-bold text-pink-800 mb-3">📖 Your Story Begins...</h3>
                <p className="mb-4">
                  <strong>You are Xiao Ming (小明)</strong>, a nervous 17-year-old American-born Taiwanese student starting senior year at prestigious <strong>Zhongshan High School</strong> in Taipei. After growing up in California, your Chinese is basic, Taiwan feels foreign despite your heritage, and you're desperate to connect with your roots.
                </p>
                
                <p className="mb-4">
                  On your terrifying but exciting first day, you meet <strong className="text-pink-600">Xiao Ai (小愛)</strong> – the popular, kind-hearted class representative who immediately captures your heart. She's from a traditional temple-keeping family, culturally grounded but curious about the world. Her warmth draws everyone in, and her laugh sounds like wind chimes.
                </p>

                <p className="text-center font-semibold text-purple-700 bg-purple-50 rounded p-3">
                  💕 Will you master Chinese culture and language well enough to win her heart by graduation? Every conversation matters. Every cultural misstep could cost you. Every word you learn brings you closer to love. 💕
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-5xl mb-3">🧑‍🎓</div>
                  <h4 className="font-bold text-blue-800 mb-2">小明 (You)</h4>
                  <p className="text-sm text-blue-600">American-born Taiwanese student with good intentions but cultural anxiety. Academically gifted but socially awkward in Taiwan.</p>
                  <div className="mt-2 text-xs text-blue-500">
                    <strong>Goal:</strong> Win Xiao Ai's heart while learning to navigate Taiwanese culture
                  </div>
                </div>
                
                <div className="text-center p-4 bg-pink-50 rounded-xl border border-pink-200">
                  <div className="text-5xl mb-3">👩‍🎓</div>
                  <h4 className="font-bold text-pink-800 mb-2">小愛 (Xiao Ai)</h4>
                  <p className="text-sm text-pink-600">Popular class representative from traditional family. Warm, culturally proud, secretly fascinated by different perspectives.</p>
                  <div className="mt-2 text-xs text-pink-500">
                    <strong>Challenge:</strong> She'll judge you based on cultural understanding and genuine effort
                  </div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-5xl mb-3">🧑‍💼</div>
                  <h4 className="font-bold text-gray-800 mb-2">大偉 (Your Rival)</h4>
                  <p className="text-sm text-gray-600">Confident class president who's loved Xiao Ai for years. Traditional, competitive, everything you're not.</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <strong>Threat:</strong> He represents everything Taiwanese culture values - will you measure up?
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Method Explanation */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6 border border-green-200">
            <h3 className="font-bold text-green-800 mb-4 text-xl text-center">🎯 How This Revolutionary Method Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-green-100">
                <div className="text-3xl mb-2">📚</div>
                <div className="font-bold text-green-800 mb-1">Story-Driven Learning</div>
                <div className="text-sm text-green-600">Every word, phrase, and cultural lesson is woven into dramatic scenes that matter emotionally</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
                <div className="text-3xl mb-2">🎮</div>
                <div className="font-bold text-blue-800 mb-1">Romance-Stakes Gaming</div>
                <div className="text-sm text-blue-600">Mini-games and quizzes directly affect your love story - poor performance = relationship problems</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-purple-100">
                <div className="text-3xl mb-2">🎭</div>
                <div className="font-bold text-purple-800 mb-1">AI Voice Acting</div>
                <div className="text-sm text-purple-600">Roleplay romantic scenes with AI characters using real Chinese conversation and cultural context</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-pink-100">
                <div className="text-3xl mb-2">💕</div>
                <div className="font-bold text-pink-800 mb-1">Real Consequences</div>
                <div className="text-sm text-pink-600">Your Chinese mastery determines the story ending - from perfect love to heartbreak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Overall Affection */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-pink-200">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              ❤️ Romance Level
            </h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-pink-600">{gameProgress.totalAffection}</div>
              <div className="text-sm text-gray-600">Total Affection</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-pink-400 to-red-500 h-3 rounded-full transition-all"
                style={{ width: `${Math.min(100, (gameProgress.totalAffection / 200) * 100)}%` }}
              />
            </div>
            <div className="text-center">
              <span className={`text-sm px-3 py-1 rounded-full ${getAffectionStatus().color} bg-opacity-20`}>
                {getAffectionStatus().emoji} {getAffectionStatus().text}
              </span>
            </div>
          </div>

          {/* Story Progress */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              📖 Story Progress
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Current Chapter:</span>
                <span className="font-bold">{gameProgress.currentChapter}/{chapters.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed:</span>
                <span className="font-bold">{gameProgress.chaptersCompleted.length}/{chapters.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Perfect Chapters:</span>
                <span className="font-bold">{gameProgress.perfectChapters.length}</span>
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(gameProgress.chaptersCompleted.length / chapters.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Story Ending Prediction */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              🔮 Ending Prediction
            </h3>
            <div className="space-y-2 text-sm">
              <div className={`p-2 rounded ${
                gameProgress.totalAffection >= STORY_ENDINGS.PERFECT ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
              }`}>
                💕 Perfect Love ({STORY_ENDINGS.PERFECT}+): {gameProgress.totalAffection >= STORY_ENDINGS.PERFECT ? 'Achieved!' : `Need ${STORY_ENDINGS.PERFECT - gameProgress.totalAffection} more`}
              </div>
              <div className={`p-2 rounded ${
                gameProgress.totalAffection >= STORY_ENDINGS.GOOD ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-600'
              }`}>
                😍 Happy Romance ({STORY_ENDINGS.GOOD}+): {gameProgress.totalAffection >= STORY_ENDINGS.GOOD ? 'Achieved!' : `Need ${STORY_ENDINGS.GOOD - gameProgress.totalAffection} more`}
              </div>
              <div className={`p-2 rounded ${
                gameProgress.totalAffection >= STORY_ENDINGS.OKAY ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
              }`}>
                😊 Good Friends ({STORY_ENDINGS.OKAY}+): {gameProgress.totalAffection >= STORY_ENDINGS.OKAY ? 'Achieved!' : `Need ${STORY_ENDINGS.OKAY - gameProgress.totalAffection} more`}
              </div>
            </div>
          </div>
        </div>

        {/* Story Chapters */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6">📚 Your Love Story Journey</h2>
          
          {chapters.map((chapter, index) => {
            const isUnlocked = chapter.id <= gameProgress.currentChapter || chapter.id === 1
            const isCompleted = gameProgress.chaptersCompleted.includes(chapter.id)
            const isPerfect = gameProgress.perfectChapters.includes(chapter.id)
            const canAccess = isUnlocked

            return (
              <div
                key={chapter.id}
                className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all duration-300 ${
                  isCompleted ? 'border-green-300 bg-green-50' :
                  canAccess ? 'border-blue-300 hover:border-blue-400 hover:shadow-xl cursor-pointer transform hover:scale-[1.02]' :
                  'border-gray-200 opacity-60'
                }`}
                onClick={() => handleChapterClick(chapter)}
                style={{ cursor: canAccess ? 'pointer' : 'not-allowed' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      {/* Chapter Progress Circle */}
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg border-4 ${
                        isCompleted ? 'bg-green-500 border-green-300' :
                        canAccess ? 'bg-blue-500 border-blue-300' :
                        'bg-gray-400 border-gray-300'
                      }`}>
                        {isCompleted ? '✓' : chapter.id}
                      </div>
                      
                      {/* Chapter Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">Chapter {chapter.id}: {chapter.title}</h3>
                        <p className="text-gray-600 text-lg">{chapter.subtitle}</p>
                        <p className="text-gray-500 text-sm mt-1">{chapter.description}</p>
                      </div>

                      {/* Status */}
                      <div className="text-right">
                        {isPerfect && (
                          <div className="flex items-center gap-1 text-yellow-500 mb-1">
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                          </div>
                        )}
                        {isCompleted && !isPerfect && (
                          <div className="text-green-600 font-bold text-sm mb-1">✓ Completed</div>
                        )}
                        {canAccess && !isCompleted && (
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {chapter.id === 1 ? 'Start Here!' : 'Available'}
                          </div>
                        )}
                        {!canAccess && (
                          <div className="text-gray-400 text-sm flex items-center gap-1">
                            <Lock className="w-4 h-4" />
                            Locked
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Chapter Learning Elements */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm mb-4">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="font-medium text-blue-800">📚 Vocabulary</div>
                        <div className="text-blue-600">{chapter.keyVocabulary.length} new words</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <div className="font-medium text-purple-800">🎮 Mini-Games</div>
                        <div className="text-purple-600">{chapter.miniGames.length} challenges</div>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-3 text-center">
                        <div className="font-medium text-pink-800">🎭 Voice Acting</div>
                        <div className="text-pink-600">+{chapter.voicePractice.affectionReward} ❤️ max</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="font-medium text-green-800">🎯 Goal</div>
                        <div className="text-green-600">{chapter.requiredAffection}❤️ to continue</div>
                      </div>
                    </div>

                    {/* Chapter Story Context */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <div className="text-sm text-gray-700">
                        <strong>📍 Setting:</strong> {chapter.setting} • <strong>🕐</strong> {chapter.timeOfDay}
                      </div>
                      <div className="text-sm text-gray-600 mt-1 italic">
                        "{chapter.mood}"
                      </div>
                    </div>

                    {/* Progress Indicators */}
                    {canAccess && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Gamepad2 className="w-4 h-4 text-purple-500" />
                            <span>{gameProgress.gamesCompleted.filter(g => chapter.miniGames.some(mg => mg.id === g)).length}/{chapter.miniGames.length} games</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4 text-pink-500" />
                            <span>{isCompleted ? 'Voice Complete' : 'Voice Pending'}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {canAccess && (
                            <div className="text-blue-600 flex items-center gap-1">
                              <span className="text-sm font-medium">Enter Chapter</span>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Affection Requirement Warning */}
                {gameProgress.totalAffection < chapter.requiredAffection && canAccess && chapter.id > 1 && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="text-yellow-800 text-sm flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>
                        <strong>Story Requirement:</strong> Need {chapter.requiredAffection} affection to continue after this chapter. 
                        Current: {gameProgress.totalAffection} ❤️
                      </span>
                    </div>
                  </div>
                )}

                {/* First Chapter Call to Action */}
                {chapter.id === 1 && !isCompleted && (
                  <div className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-4 text-center animate-pulse">
                    <div className="text-lg font-bold mb-2">🚀 Ready to Start Your Love Story?</div>
                    <div className="text-sm opacity-90">Click anywhere on this chapter to begin your journey at Zhongshan High School!</div>
                    <div className="mt-2 text-xs opacity-75">👆 This chapter is ready to play!</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Story Complete */}
        {gameProgress.storyEnding !== 'incomplete' && (
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">🎭 Story Complete!</h2>
            <div className="text-6xl mb-4">
              {gameProgress.storyEnding === 'perfect' ? '💕' :
               gameProgress.storyEnding === 'good' ? '😍' :
               gameProgress.storyEnding === 'okay' ? '😊' :
               gameProgress.storyEnding === 'bad' ? '😔' : '💔'}
            </div>
            <div className="text-xl mb-2">
              {gameProgress.storyEnding === 'perfect' ? 'Perfect Love Story!' :
               gameProgress.storyEnding === 'good' ? 'Happy Romance!' :
               gameProgress.storyEnding === 'okay' ? 'Close Friends Forever' :
               gameProgress.storyEnding === 'bad' ? 'Distant but Polite' : 'Story Failed'}
            </div>
            <div className="text-sm opacity-90">
              Final Affection: {gameProgress.totalAffection} ❤️
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoryOverviewView