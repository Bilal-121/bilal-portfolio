module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a192f',
        accent: '#64ffda',
        text: '#ccd6f6',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Source Sans Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
