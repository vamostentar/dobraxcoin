/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050404",
        paper: "#F2EDE6",
        amber: {
          DEFAULT: "#E09B1A",
          bright: "#F5C04A",
        },
        red: {
          DEFAULT: "#8B1A08",
        },
        emerald: {
          400: "#34D399",
        },
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(ellipse 65% 55% at 50% 60%, rgba(224,155,26,0.15) 0%, transparent 70%)',
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        serif: ["'Instrument Serif'", "serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      animation: {
        'breathe': 'breathe 9s ease-in-out infinite',
        'roll': 'roll 30s linear infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '0.5', transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { opacity: '0.9', transform: 'translate(-50%, -50%) scale(1.012)' },
        },
        roll: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
