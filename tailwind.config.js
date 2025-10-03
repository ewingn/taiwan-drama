/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ============================================================
      // CUSTOM BOX SHADOWS
      // ============================================================
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'pink-100': '0 10px 25px -5px rgba(236, 72, 153, 0.1)',
        'pink-200': '0 10px 25px -5px rgba(236, 72, 153, 0.2)',
        'blue-200': '0 10px 25px -5px rgba(59, 130, 246, 0.2)',
        'purple-200': '0 10px 25px -5px rgba(168, 85, 247, 0.2)',
        'orange-200': '0 10px 25px -5px rgba(251, 146, 60, 0.2)',
      },
      
      // ============================================================
      // CUSTOM ANIMATIONS
      // ============================================================
      animation: {
        'in': 'fadeIn 0.5s ease-in',
        'slide-in-from-bottom': 'slideInFromBottom 0.5s ease-out',
        'zoom-in': 'zoomIn 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      
      // ============================================================
      // CUSTOM COLORS (optional - extends Tailwind defaults)
      // ============================================================
      colors: {
        'drama-red': {
          50: '#fef2f2',
          500: '#E63946',
          600: '#dc2626',
        },
        'drama-pink': {
          50: '#fdf2f8',
          500: '#F72585',
          600: '#ec4899',
        },
      },
    },
  },
  plugins: [],
}