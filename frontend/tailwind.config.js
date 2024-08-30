/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        'appearing': 'appear 0.5s linear',
      },
      colors: {
        'tahiti': '#3ab7bf',
        'bubble-gum': '#ff7739',
        'solo-leveling': {
          '100': '#d4d9ff',
          '200': '#f2f2f2',
          '300': '#a480f2',
          '400': '#5f89f9',
          '500': '#445ef2',
          '600': '#1446ff',
          '700': '#221426',
          '800': '#1d1340',
          '900': '#060f36',
        }
      }
    },
  },
  plugins: [],
}