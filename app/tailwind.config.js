// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'verde-musgo': '#556B5D',
        'beige-natural': '#D8C7B5',
        'negro-profundo': '#1C1C1C',
        'blanco-marfil': '#F8F6F2',
        'dorado-suave': '#B89B5E',
        'brand-green': '#556B5D',
        'brand-beige': '#D8C7B5',
        'brand-dark': '#1C1C1C',
        'brand-ivory': '#F8F6F2',
        'brand-gold': '#B89B5E',
      },
      fontFamily: {
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        'playfair': ['var(--font-playfair)', 'serif'],
        'sans': ['var(--font-montserrat)', 'sans-serif'],
        'serif': ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
}