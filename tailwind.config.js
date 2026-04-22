/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        magenta: '#e02180',
        blue: '#2570b3',
        yellow: '#e4e238',
        olive: '#c7d670',
        dark: '#0f0f0f',
      },
      fontFamily: {
        bebas: ['var(--font-bebas)'],
        poppins: ['var(--font-poppins)'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'checker-slide': 'checker-slide 20s linear infinite',
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'marquee-fast': 'marquee 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'checker-slide': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '80px 80px' },
        },
      },
    },
  },
  plugins: [],
}
