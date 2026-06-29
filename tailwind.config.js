/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#030304',
        surface: '#0A0A0C',
        card: '#08080A',
        dp: '#7C3AED',
        dd: '#4C1D95',
        dl: '#A78BFA',
        dg: '#8B5CF6',
        gold: '#D4A843',
        gl: '#F5DEB3',
        gd: '#A07D2E',
        matcha: '#4A7C59',
        yuzu: '#FFF176',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Noto Serif JP', 'Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
