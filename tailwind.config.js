/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Simple approach - just override the sans font
        sans: ['Inter', 'system-ui', 'sans-serif'],

        // Alternative: Define custom font families
        // primary: ['Inter', 'system-ui', 'sans-serif'],
        // heading: ['Montserrat', 'system-ui', 'sans-serif'],
        // mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

