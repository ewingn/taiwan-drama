// src/components/romance/StoryOverviewView.tsx
import React from 'react'
import { StoryChapter } from '../../data/storyChapters'

interface StoryOverviewProps {
  chapters: StoryChapter[]
  gameProgress: any
  onChapterSelect: (chapter: StoryChapter) => void
  onBack: () => void
}

const StoryOverviewView: React.FC<StoryOverviewProps> = ({
  chapters,
  gameProgress,
  onChapterSelect,
  onBack
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      {/* Story overview content */}
    </div>
  )
}

export default StoryOverviewView