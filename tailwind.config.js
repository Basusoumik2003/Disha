/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#FFFFFF',
          surface: '#F7F7F5',
          elevated: '#FFFFFF',
          muted: '#FAFAF9',
        },
        brand: {
          blue: '#0066FF',
          saffron: '#FF6B00',
          amber: '#FF9500',
          green: '#34C759',
          red: '#FF3B30',
        },
        text: {
          primary: '#0A0A0A',
          secondary: '#6B6B6B',
          tertiary: '#A0A0A0',
        },
        border: {
          subtle: '#E8E8E6',
          strong: '#D0D0CE',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'raised': '0 8px 24px rgba(0, 0, 0, 0.10)',
        'floating': '0 16px 48px rgba(0, 0, 0, 0.14)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glowPulse: {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(255, 107, 0, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 12px rgba(255, 107, 0, 0.9))' },
        }
      }
    },
  },
  plugins: [],
}
