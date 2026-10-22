/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF8F3',
          200: '#F5F2EB',
          300: '#EBE6DA',
          400: '#DDD5C4',
        },
        charcoal: {
          DEFAULT: '#222823',
          800: '#2A332C',
          900: '#1D241F',
          950: '#161C18',
        },
        sage: {
          50: '#F3F5F3',
          100: '#E2E7E3',
          300: '#A9B7AC',
          500: '#5F7063',
          600: '#4E5D52',
          700: '#3D4A41',
          800: '#2F3932',
        },
        champagne: {
          DEFAULT: '#C2A277',
          light: '#DECBB0',
          dark: '#A68457',
        },
        sand: {
          border: '#DDD7CA',
          card: '#F6F3EC',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        script: ['"Italianno"', '"Caveat"', 'cursive'],
      },
      borderRadius: {
        'arch': '160px 160px 0 0',
        'arch-full': '200px',
      }
    },
  },
  plugins: [],
}
