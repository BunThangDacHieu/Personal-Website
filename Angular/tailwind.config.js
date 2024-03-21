/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/app/components/views/image/background.jpg')"
      }
    },
  },
  plugins: [],
}