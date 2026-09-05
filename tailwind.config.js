/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#090a0f',
        card: '#12141d',
        'card-border': '#1e2235',
        accent: '#6366f1',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'rgb-glow': 'rgbGlow 6s linear infinite',
        'rgb-text': 'rgbText 4s ease infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'equalizer': 'equalizer 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        rgbGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 12px rgba(255, 0, 128, 0.45))' },
          '33%': { filter: 'drop-shadow(0 0 12px rgba(0, 255, 200, 0.45))' },
          '66%': { filter: 'drop-shadow(0 0 12px rgba(128, 0, 255, 0.45))' },
        },
        rgbText: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        equalizer: {
          '0%': { height: '3px' },
          '100%': { height: '18px' },
        },
      },
    },
  },
  plugins: [],
}
