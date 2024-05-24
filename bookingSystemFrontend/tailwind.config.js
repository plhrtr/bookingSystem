/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customLightGray: '#706a7c',
        customDarkGray: '#171725',
        customBlue: '#9ad6e1',
        customRed: '#e48c80',
        customGreen: '#abdeb0',
        customOrange: '#ffcd91'
      },
      
    },
    
  },
  plugins: [],
}

