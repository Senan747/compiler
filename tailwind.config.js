/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        lg: '1140px',
        xl: '1140px',
        '2xl': '1140px',
        md: '900px'
      }
    },
    extend: {
      keyframes: {
        pulse: {
          '0%': { opacity: 0 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1},   
        },
        wiggle: {
          '0%, 100%': { transform: 'rotaate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        new: {
          from: { top: '384px'},
          to: { top: '0px'}
        },
        fadeIn: {
          from: {
            opacity: 0,
            transform: 'translateY(-10px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      },
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif']
      },
      backgroundImage: {
        'quiz-project': "url('../src/assets/quiz-project.jpeg')",
        'editor-project': "url('../src/assets/editor-project.jpeg')",
        'travel-project': "url('../src/assets/travel-project.jpeg')",
        'web-search-project': "url('../src/assets/websearch.jpg')"
      },
      borderRadius: {
        '75': '75%',
        '50': '50%',
        '30': '30%'
      },
      borderWidth: {
        '1': '1px',
        '0.5': '0.5px',
      },
      colors: {
        'gega-red': '#bc1a45',
        'gega-melon': '#ffd369',
        'gega-grey': '#dddddd',
        'gega-white': '#f7f7f7',
        'gega-black': '#1F1F1F',
        'gega-light': '#999999',
        'gega-green': '#28E98C',
        'gega-dark': '#191919',
      },
    },
  },
  plugins: [],
};