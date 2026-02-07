/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out',
        fadeIn: 'fadeIn 0.6s ease-out',
        slideInLeft: 'slideInLeft 0.5s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
        scaleIn: 'scaleIn 0.6s ease-out',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'bounce-in': 'bounce-in 0.6s ease-out',
        'float-gentle': 'float-gentle 4s ease-in-out infinite',
        'float-up': 'float-up 3s ease-in-out infinite',
        'spin-slow': 'spin 6s linear infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
    },
  },
  plugins: [],
}
