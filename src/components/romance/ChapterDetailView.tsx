// src/components/romance/ChapterDetailView.tsx
import React from 'react'
import { ArrowRight, BookOpen, Gamepad2, Mic, Volume2 } from 'lucide-react'

interface StoryChapter {
  id: number
  title: string
  subtitle: string
  description: string
  storyContext: string
  setting: string
  timeOfDay: string
  mood: string
  unlocked: boolean
  completed: boolean
  keyVocabulary: Array<{
    chinese: string
    pinyin: string
    english: string
    context: string
  }>
  sentencePatterns: Array<{
    pattern: string
    explanation: string
    examples: Array<{
      chinese: string
      pinyin: string
      english: string
    }>
  }>
  dialogue: Array<{
    character: string
    avatar: string
    chinese: string
    pinyin: string
    english: string
    emotion: string
    internalThought?: string
  }>
  miniGames: Array<{
    id: string
    type: 'connections' | 'matching' | 'quickfire'
    title: string
    description: string
    data: any
    affectionImpact: {
      perfect: number
      good: number
      poor: number
    }
  }>
  voicePractice: {
    scenario: string
    objective: string
    keyPhrases: string[]
    culturalContext: string[]
    aiCharacterPrompt: string
    successCriteria: string[]
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

interface ChapterDetailProps {
  chapter: StoryChapter
  gameProgress: GameProgress
  onGameSelect: (game: any) => void
  onVoiceStart: () => void
  onBack: () => void
}

const ChapterDetailView: React.FC<ChapterDetailProps> = ({ 
  chapter, 
  gameProgress, 
  onGameSelect, 
  onVoiceStart, 
  onBack 
}) => {
  const isUnlocked = chapter.id <= gameProgress.currentChapter
  const isCompleted = gameProgress.chaptersCompleted.includes(chapter.id)

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-blue-600"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Story Overview
          </button>
          
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Chapter Locked</h2>
            <p className="text-gray-600 mb-6">Complete previous chapters to unlock this story.</p>
            <button onClick={onBack} className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              Return to Story
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Story Overview
        </button>

        {/* Chapter Header */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Chapter {chapter.id}: {chapter.title}</h1>
            {isCompleted && <div className="text-green-600 font-bold">✓ Completed</div>}
          </div>
          
          <h2 className="text-lg text-gray-600 mb-4">{chapter.subtitle}</h2>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-blue-800 mb-2">📖 Story Context</h3>
            <p className="text-blue-700 text-sm leading-relaxed">{chapter.storyContext}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div><strong>📍 Setting:</strong> {chapter.setting}</div>
            <div><strong>🕐 Time:</strong> {chapter.timeOfDay}</div>
            <div><strong>💭 Mood:</strong> {chapter.mood}</div>
          </div>
        </div>

        {/* Learning Content */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Vocabulary */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Key Vocabulary
            </h3>
            <div className="space-y-3">
              {chapter.keyVocabulary.map((vocab, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-3 bg-blue-50 rounded-r p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-lg">{vocab.chinese}</div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-blue-600 mb-1">({vocab.pinyin})</div>
                  <div className="text-gray-700 font-medium mb-2">{vocab.english}</div>
                  <div className="text-xs text-gray-600 italic">{vocab.context}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sentence Patterns */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-green-500" />
              Sentence Patterns
            </h3>
            <div className="space-y-4">
              {chapter.sentencePatterns.map((pattern, index) => (
                <div key={index} className="border rounded p-3 bg-green-50">
                  <div className="font-bold text-green-800 mb-1">{pattern.pattern}</div>
                  <div className="text-sm text-green-600 mb-3">{pattern.explanation}</div>
                  <div className="space-y-2">
                    {pattern.examples.map((example, exIndex) => (
                      <div key={exIndex} className="text-sm border-l-2 border-green-300 pl-3 bg-white rounded p-2">
                        <div className="font-medium">{example.chinese}</div>
                        <div className="text-green-600 text-xs">({example.pinyin})</div>
                        <div className="text-gray-600">{example.english}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story Dialogue */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            💬 Chapter Dialogue
          </h3>
          <div className="space-y-4">
            {chapter.dialogue.map((line, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{line.avatar}</span>
                  <div className="font-bold">{line.character}</div>
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {line.emotion}
                  </div>
                  <button className="ml-auto text-blue-600 hover:text-blue-700">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 ml-11">
                  <div className="font-medium text-lg">{line.chinese}</div>
                  <div className="text-sm text-blue-600">({line.pinyin})</div>
                  <div className="text-gray-700">{line.english}</div>
                </div>
                {line.internalThought && (
                  <div className="mt-3 ml-11 bg-yellow-50 rounded p-3 border-l-4 border-yellow-400">
                    <div className="text-sm italic text-yellow-800">
                      💭 <strong>Internal thought:</strong> {line.internalThought}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mini Games */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            🎮 Chapter Challenges
          </h3>
          <div className="grid gap-4">
            {chapter.miniGames.map((game, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4" />
                    {game.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    {gameProgress.gamesCompleted.includes(game.id) && (
                      <span className="text-green-600 text-sm">✓ Completed</span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      game.type === 'matching' ? 'bg-blue-100 text-blue-800' :
                      game.type === 'connections' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {game.type}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{game.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <span className="inline-block mr-4">
                      <strong>Perfect:</strong> +{game.affectionImpact.perfect} ❤️
                    </span>
                    <span className="inline-block mr-4">
                      <strong>Good:</strong> +{game.affectionImpact.good} ❤️
                    </span>
                    <span className="inline-block">
                      <strong>Poor:</strong> {game.affectionImpact.poor} ❤️
                    </span>
                  </div>
                  <button
                    onClick={() => onGameSelect(game)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    {gameProgress.gamesCompleted.includes(game.id) ? 'Play Again' : 'Play Game'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Practice */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Mic className="w-6 h-6" />
            Chapter Finale: Voice Practice
          </h3>
          <p className="mb-4 opacity-90">{chapter.voicePractice.scenario}</p>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
            <div className="text-sm font-medium mb-2">🎯 Objective:</div>
            <div className="text-sm">{chapter.voicePractice.objective}</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-3">
              <div className="text-sm font-medium mb-2">Key Phrases to Practice:</div>
              <div className="space-y-1">
                {chapter.voicePractice.keyPhrases.slice(0, 3).map((phrase, index) => (
                  <div key={index} className="text-xs opacity-90">• {phrase}</div>
                ))}
                {chapter.voicePractice.keyPhrases.length > 3 && (
                  <div className="text-xs opacity-75">...and {chapter.voicePractice.keyPhrases.length - 3} more</div>
                )}
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-3">
              <div className="text-sm font-medium mb-2">Success Criteria:</div>
              <div className="space-y-1">
                {chapter.voicePractice.successCriteria.slice(0, 3).map((criteria, index) => (
                  <div key={index} className="text-xs opacity-90">• {criteria}</div>
                ))}
                {chapter.voicePractice.successCriteria.length > 3 && (
                  <div className="text-xs opacity-75">...and {chapter.voicePractice.successCriteria.length - 3} more</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <strong>Max Affection Reward:</strong> +{chapter.voicePractice.affectionReward} ❤️
            </div>
            <button
              onClick={onVoiceStart}
              disabled={!isUnlocked}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Start Voice Practice
            </button>
          </div>
        </div>

        {/* Chapter Requirements Warning */}
        {gameProgress.totalAffection < chapter.requiredAffection && chapter.id > 1 && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-yellow-800 text-sm flex items-center gap-2">
              <div className="text-yellow-600">⚠️</div>
              <span>
                <strong>Story Requirement:</strong> You need {chapter.requiredAffection} affection points to continue after this chapter. 
                Current: {gameProgress.totalAffection} ❤️
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChapterDetailView