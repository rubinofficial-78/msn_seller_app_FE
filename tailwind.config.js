/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        accent: {
          green: {
            light: '#BBF7D0',
            dark: '#15803D'
          },
          red: {
            light: '#FECACA',
            dark: '#B91C1C'
          },
          orange: {
            light: '#FED7AA',
            dark: '#C2410C'
          },
          purple: {
            light: '#E9D5FF',
            dark: '#7E22CE'
          }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'draw': 'draw 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        }
      },
      backgroundColor: {
        'cream': '#FDF8F4',
        'peach': '#FFE4C8',
      }
    },
  },
  plugins: [],
};
