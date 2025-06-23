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
        // Using CSS variables for theme colors
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
      },
      backgroundColor: {
        primary: 'var(--color-background)',
      },
      textColor: {
        primary: 'var(--color-text)',
      },
      borderColor: {
        primary: 'var(--color-border)',
      },
    },
  },
  plugins: [
    // Add a custom plugin to create light: variants
    function({ addVariant }) {
      addVariant('light', '.light &');
    },
  ],
  corePlugins: {
    // Ensure preflight is enabled for base styles
    preflight: true,
  },
};
