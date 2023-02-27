/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'primary': '#30343F',
      'secondary': '#FAFAFF',
      'pink-white': '#E4D9FF',
      'solid-blue': '#273469',
      'dark-blue': '#1E2749',
    },

  },
  plugins: [],
}
