/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: '#05010d',
        background: '#f6f3fe',
        primary: '#199dd8',
        secondary: '#d2e7b6',
        accent: '#addcd8',
      },
      fontFamily: {
        heading: ['Alexandria', 'sans-serif'],
        body: ['Alexandria', 'sans-serif'],
      },
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      animation: {
        'gradient-x': 'gradient-x 6s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%': { backgroundPosition: '200% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },    
    },
  },
  plugins: [],
};

