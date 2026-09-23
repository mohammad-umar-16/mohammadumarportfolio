/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: '#0B0F0E',
        panel: '#121816',
        grid: '#1E2A27',
        line: '#24312D',
        signal: '#22D3EE',
        elevated: '#161D1B',
        amber: '#FFA733',
        ink: '#E7EDE9',
        dim: '#8A968F',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}