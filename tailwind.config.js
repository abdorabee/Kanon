/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          primary: '#ffffff',
          secondary: '#f3f4f6',
          background: '#ffffff',
          text: '#1a1a1a',
          accent: '#2563eb',
          border: '#e5e7eb',
        },
        // Dark mode colors
        dark: {
          primary: '#1a1a1a',
          secondary: '#2d2d2d',
          background: '#1a1a1a',
          text: '#ffffff',
          accent: '#3b82f6',
          border: '#363636',
        },
      },
    },
  },
  plugins: [
    // Add custom plugins for light/dark mode
    function({ addComponents, theme }) {
      // Add base styles that apply to both light and dark modes
      addComponents({
        'body': {
          backgroundColor: theme('colors.dark.background'),
          color: theme('colors.dark.text'),
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
        'header': {
          backgroundColor: theme('colors.dark.background'),
          borderColor: theme('colors.dark.border'),
          color: theme('colors.dark.text'),
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
        '.light body': {
          backgroundColor: theme('colors.light.background'),
          color: theme('colors.light.text'),
        },
        '.light header': {
          backgroundColor: theme('colors.light.background'),
          borderColor: theme('colors.light.border'),
          color: theme('colors.light.text'),
        },
      });
    },
  ],
  corePlugins: {
    // Ensure preflight is enabled for base styles
    preflight: true,
  },
};
