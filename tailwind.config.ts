import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#EDF1F4',
          soft: '#C6CDD6',
          mute: '#8A93A0',
          faint: '#5A636E',
        },
        graphite: {
          950: '#060708',
          900: '#0A0C0E',
          850: '#0E1114',
          800: '#12161A',
          700: '#1A1F25',
        },
        accent: {
          mint: '#3DF6C9',
          amber: '#FFB454',
        },
      },
      fontFamily: {
        sans: ['var(--font-instrument)', 'system-ui', 'sans-serif'],
        display: ['var(--font-grotesk)', 'var(--font-instrument)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        'mega': '0.42em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.8)' },
        },
        'ticker': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'dash-flow': {
          from: { strokeDashoffset: '240' },
          to: { strokeDashoffset: '0' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(4px)' },
        },
        'marquee-l': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-r': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
        'ticker': 'ticker 32s linear infinite',
        'dash-flow': 'dash-flow 3.2s linear infinite',
        'float-y': 'float-y 2.4s cubic-bezier(0.45,0,0.55,1) infinite',
        'marquee-l': 'marquee-l 28s linear infinite',
        'marquee-r': 'marquee-r 28s linear infinite',
      },
      boxShadow: {
        'glow-mint': '0 0 0 1px rgba(61,246,201,0.28), 0 8px 32px -8px rgba(61,246,201,0.35)',
        'glow-amber': '0 0 0 1px rgba(255,180,84,0.25), 0 8px 32px -8px rgba(255,180,84,0.3)',
        'inner-hi': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
        'float-lg': '0 40px 80px -40px rgba(0,0,0,0.7)',
      },
    },
  },
  plugins: [],
}

export default config
