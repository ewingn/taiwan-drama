// src/lib/design-system.ts
// TaiwanScript Design System - Centralized design tokens and utilities

/**
 * Design system utilities for TaiwanScript
 * 
 * This file contains reusable design tokens and class combinations
 * that ensure consistency across the entire application.
 */

export const tw = {
  // ============================================================
  // CARD STYLES
  // ============================================================
  card: {
    // Base card styling with glassmorphism effect
    base: 'bg-white rounded-2xl shadow-2xl border border-gray-100 backdrop-blur-sm bg-opacity-98',
    
    // Interactive cards (chapters, games, etc)
    interactive: 'hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer',
    
    // Inactive/locked cards
    inactive: 'opacity-60 cursor-not-allowed',
    
    // Extra large cards (results, achievements)
    large: 'rounded-3xl p-8 shadow-2xl',
    
    // Compact cards (game items, vocabulary)
    compact: 'rounded-xl p-4 shadow-lg',
  },

  // ============================================================
  // TEXT GRADIENTS
  // ============================================================
  gradient: {
    // Primary gradient (drama/romance theme)
    primary: 'bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent',
    
    // Secondary gradient (culture/learning theme)
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent',
    
    // Success gradient
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent',
    
    // Energy gradient (speed/action)
    energy: 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent',
    
    // Info gradient
    info: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
  },

  // ============================================================
  // BACKGROUND GRADIENTS
  // ============================================================
  bgGradient: {
    // Primary drama theme
    primary: 'bg-gradient-to-r from-red-600 to-pink-600',
    
    // Secondary culture theme
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-600',
    
    // Success theme
    success: 'bg-gradient-to-r from-green-600 to-emerald-600',
    
    // Energy theme
    energy: 'bg-gradient-to-r from-orange-600 to-red-600',
    
    // Info theme
    info: 'bg-gradient-to-r from-blue-600 to-purple-600',
    
    // Subtle backgrounds
    subtle: {
      primary: 'bg-gradient-to-br from-red-50 to-pink-50',
      secondary: 'bg-gradient-to-br from-purple-50 to-pink-50',
      success: 'bg-gradient-to-br from-green-50 to-emerald-50',
      energy: 'bg-gradient-to-br from-orange-50 to-red-50',
      info: 'bg-gradient-to-br from-blue-50 to-purple-50',
    }
  },

  // ============================================================
  // BUTTON STYLES
  // ============================================================
  button: {
    // Primary action button
    primary: 'bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-red-700 hover:to-pink-700 hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg',
    
    // Secondary action button
    secondary: 'bg-white border-2 border-gray-300 px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg transition-all duration-300',
    
    // Success button
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg',
    
    // Danger/skip button
    danger: 'bg-gray-400 text-white px-6 py-3 rounded-xl hover:bg-gray-500 transition-colors shadow-md',
    
    // Large prominent button
    large: 'px-8 py-4 rounded-2xl text-lg',
    
    // Compact button
    compact: 'px-4 py-2 rounded-lg text-sm',
  },

  // ============================================================
  // TOUCH TARGETS (Mobile Optimization)
  // ============================================================
  touch: {
    // Minimum touch target size (iOS/Android guidelines)
    min: 'min-h-[56px] min-w-[56px]',
    
    // Comfortable touch target
    comfortable: 'p-4 min-h-[56px]',
    
    // Touch manipulation (prevents zoom on double-tap)
    noZoom: 'touch-manipulation',
  },

  // ============================================================
  // ANIMATIONS
  // ============================================================
  animation: {
    // Entrance animations
    fadeIn: 'animate-in fade-in duration-500',
    slideUp: 'animate-in slide-in-from-bottom duration-500',
    scaleIn: 'animate-in zoom-in duration-300',
    
    // Hover effects
    lift: 'hover:-translate-y-1 transition-transform duration-300',
    grow: 'hover:scale-105 transition-transform duration-300',
    
    // Active/press effects
    press: 'active:scale-95 transition-transform duration-150',
    
    // Loading states
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    spin: 'animate-spin',
  },

  // ============================================================
  // STATUS COLORS
  // ============================================================
  status: {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300',
    },
    warning: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
    },
    info: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-300',
    },
  },

  // ============================================================
  // STAT CARDS (Game Results)
  // ============================================================
  statCard: {
    primary: 'bg-gradient-to-br from-red-50 to-pink-100 rounded-xl p-4 border border-red-200',
    secondary: 'bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200',
    success: 'bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200',
    energy: 'bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200',
    info: 'bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200',
  },

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================
}

/**
 * Combine multiple design system utilities
 * Usage: combine(tw.card.base, tw.card.interactive, 'custom-class')
 */
export function combine(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Conditional class helper
 * Usage: conditional(isActive, tw.button.primary, tw.button.secondary)
 */
export function conditional(condition: boolean, trueClass: string, falseClass: string = ''): string {
  return condition ? trueClass : falseClass
}

/**
 * Affection level to color mapping
 */
export function getAffectionColor(affection: number): {
  bg: string
  text: string
  gradient: string
} {
  if (affection >= 180) {
    return {
      bg: 'bg-red-100',
      text: 'text-red-600',
      gradient: 'from-red-600 to-pink-600',
    }
  } else if (affection >= 150) {
    return {
      bg: 'bg-pink-100',
      text: 'text-pink-600',
      gradient: 'from-pink-600 to-red-500',
    }
  } else if (affection >= 100) {
    return {
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
      gradient: 'from-yellow-600 to-orange-600',
    }
  } else if (affection >= 50) {
    return {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      gradient: 'from-blue-600 to-purple-600',
    }
  } else {
    return {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      gradient: 'from-gray-600 to-gray-500',
    }
  }
}

/**
 * Score to status mapping
 */
export function getScoreStatus(score: number): {
  emoji: string
  color: string
  label: string
} {
  if (score >= 95) {
    return { emoji: '🌟', color: 'text-yellow-600', label: 'Perfect!' }
  } else if (score >= 90) {
    return { emoji: '⚡', color: 'text-orange-600', label: 'Excellent!' }
  } else if (score >= 80) {
    return { emoji: '🔥', color: 'text-red-600', label: 'Great!' }
  } else if (score >= 70) {
    return { emoji: '👍', color: 'text-blue-600', label: 'Good!' }
  } else if (score >= 60) {
    return { emoji: '👌', color: 'text-green-600', label: 'Nice!' }
  } else {
    return { emoji: '💪', color: 'text-gray-600', label: 'Keep trying!' }
  }
}

// Export default for convenience
export default tw