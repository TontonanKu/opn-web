/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        taxi: {
          yellow: "#FFC700",
          yellowHover: "#E5B200",
          orange: "#FF5900",
          orangeHover: "#E04E00",
          dark: "#121212",
          cream: "#FAF8F2",
          gray: "#EAE6DB",
        }
      },
      boxShadow: {
        'brutal-sm': '3px 3px 0px 0px #121212',
        'brutal': '5px 5px 0px 0px #121212',
        'brutal-lg': '8px 8px 0px 0px #121212',
        'brutal-white': '5px 5px 0px 0px #FFFFFF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Impact', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
