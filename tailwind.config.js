/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.tsx",
    "./*.ts",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./backend/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'glass': {
          'white': 'rgba(255, 255, 255, 0.03)',
          'border': 'rgba(255, 255, 255, 0.08)',
        },
        'glass-card': {
          'bg-start': 'rgba(30, 41, 59, 0.4)',
          'bg-end': 'rgba(15, 23, 42, 0.6)',
          'border': 'rgba(255, 255, 255, 0.05)',
        }
      }
    },
  },
  plugins: [],
}