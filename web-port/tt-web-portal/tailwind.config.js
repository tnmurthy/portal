/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#0B0F19',
          card: '#0D1220',
          footer: '#080C15',
          emerald: {
            DEFAULT: '#10B981',
            hover: '#059669',
            accent: '#34D399',
          },
        },
      },
    },
  },
  plugins: [],
};
