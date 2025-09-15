// src/components/romance/ChapterDetailView.tsx
import React from 'react'
import { StoryChapter } from '../../data/storyChapters'

interface ChapterDetailProps {
  chapter: StoryChapter
  gameProgress: any
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      {/* Chapter detail content */}
    </div>
  )
}

export default ChapterDetailView
