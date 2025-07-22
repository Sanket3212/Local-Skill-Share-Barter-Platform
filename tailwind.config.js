// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // We're removing `darkMode: 'class'` because you explicitly asked to remove `@nuxtjs/color-mode`
  // and we're adopting a dark-mode *inspired* aesthetic as the default now.
  // If you re-introduce a dark mode toggle later, you would add `darkMode: 'class'` back here.

  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        // --- Custom Palette - Nuxt Dark Mode Inspired ---
        'primary': '#00DC82',        // Nuxt Green (used as primary accent)
        'primary-dark': '#00B36B',   // Darker Nuxt Green for hover
        'secondary': '#3B82F6',      // A clean blue (for secondary actions)
        'secondary-dark': '#2563EB', // Darker blue for hover

        // Backgrounds (dark mode inspired)
        'bg-dark-900': '#0F1116', // Very dark background
        'bg-dark-800': '#181B1F', // Slightly lighter dark background for cards
        'bg-dark-700': '#24282F', // Even lighter dark background for elements

        // Text Colors (dark mode inspired)
        'text-light-100': '#D9DBDE', // Main light text
        'text-light-200': '#ADB0B7', // Secondary light text

        // Original neutrals (if still needed for certain elements, but likely replaced by new scheme)
        'neutral-dark': '#34495E',
        'neutral-medium': '#7F8C8D',
        'neutral-light': '#ECF0F1',
        'white': '#FFFFFF',
      },
      // --- Custom Animations ---
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeInDownSlow: {
          from: { transform: 'translateY(-50px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUpSlow: {
          from: { transform: 'translateY(50px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        bounceInLeftFast: {
          '0%': { opacity: '0', transform: 'translateX(-500px)' },
          '60%': { opacity: '1', transform: 'translateX(20px)' },
          '80%': { transform: 'translateX(-10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceInRightFast: {
          '0%': { opacity: '0', transform: 'translateX(500px)' },
          '60%': { opacity: '1', transform: 'translateX(-20px)' },
          '80%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeInUpStagger: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        gradientMove: 'gradientMove 15s ease infinite', // 15s duration, infinite loop
        'fade-in-down-slow': 'fadeInDownSlow 1s ease-out forwards',
        'fade-in-up-slow': 'fadeInUpSlow 1s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'bounce-in-left-fast': 'bounceInLeftFast 0.8s ease-out forwards',
        'bounce-in-right-fast': 'bounceInRightFast 0.8s ease-out forwards',
        'fade-in-up-stagger': 'fadeInUpStagger 0.6s ease-out forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}