/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5550ff',
          dark: '#4338ca',
          tint: '#eef2ff',
        },
        /* Refined neutrals for a calmer, more professional surface */
        canvas: '#fafafa',
        ink: '#0f172a',
        muted: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['SFMono-Regular', 'Consolas', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 1px 3px 0 rgba(15, 23, 42, 0.06)',
        soft: '0 4px 16px -4px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
