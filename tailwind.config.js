/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', '"Segoe UI"', 'sans-serif'],
        display: ['"Space Grotesk"', '"Outfit"', '"Segoe UI"', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 28px 80px rgba(15, 23, 42, 0.32)',
        glow: '0 0 0 1px rgba(255,255,255,0.12), 0 30px 80px rgba(56, 189, 248, 0.18)',
      },
      backgroundImage: {
        shine:
          'linear-gradient(135deg, rgba(255,255,255,0.28), rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.12))',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
      },
      animation: {
        drift: 'drift 10s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
