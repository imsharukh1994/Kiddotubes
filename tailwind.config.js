/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#6D28D9",
          purpleHover: "#5B21B6",
          purpleLight: "#8B5CF6",
          purpleSoft: "#F3E8FF",
          slate: "#0F172A",
          muted: "#64748B",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        '1440': '1440px',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
        'card': '0 4px 12px -2px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.02)',
        'hover': '0 12px 24px -4px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
};
