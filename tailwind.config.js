/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4440cc',
          dark: '#3333aa',
          tint: '#f3f2ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['SFMono-Regular', 'Consolas', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
