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
    },
  },
  plugins: [],
};
