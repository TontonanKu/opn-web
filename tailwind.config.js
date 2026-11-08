/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        kazura: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#991B1B',
          800: '#7A0B0B',
          900: '#5C0808',
          950: '#2A0404',
        }
      },
      boxShadow: {
        'crimson-sm': '0 4px 14px -2px rgba(122, 11, 11, 0.08), 0 2px 6px -1px rgba(122, 11, 11, 0.05)',
        'crimson-md': '0 10px 25px -5px rgba(122, 11, 11, 0.14), 0 4px 10px -2px rgba(122, 11, 11, 0.08)',
        'crimson-lg': '0 20px 40px -10px rgba(122, 11, 11, 0.22)',
      }
    },
  },
  plugins: [],
}
