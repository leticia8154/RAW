/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        raw: {
          bg: '#0A0A0D',
          card: '#141419',
          border: '#1F1F28',
          subtext: '#9CA3AF',
          purple: '#A78BFA',
          accent: '#8B5CF6'
        }
      },
      fontFamily: {
        title: ['Exo 2', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}