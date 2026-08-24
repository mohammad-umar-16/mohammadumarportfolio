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
        signal: '#4ECDA4',
        amber: '#E8A33D',
        ink: '#E7EDE9',
        dim: '#8A968F',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
