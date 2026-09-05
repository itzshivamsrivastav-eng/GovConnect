/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef4f9',
          100: '#d6e5f0',
          200: '#adcbe1',
          300: '#7fadd0',
          400: '#4d8bba',
          500: '#2e6ea3',
          600: '#1f5484',
          700: '#1a4269',
          800: '#123b62',
          900: '#0b2740',
        },
        saffron: {
          50: '#fff7ed',
          100: '#ffedd3',
          200: '#ffd9a5',
          300: '#ffbe6d',
          400: '#ff9f3f',
          500: '#f7941d',
          600: '#e07800',
          700: '#b85e00',
          800: '#934a05',
          900: '#78400c',
        },
      },
      fontFamily: {
        heading: ['Lora', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
