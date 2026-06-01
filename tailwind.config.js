export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:          '#faf8f4',
        bg2:         '#f4f0ea',
        bg3:         '#ede8e0',
        card:        '#ffffff',
        terracotta:  '#b5603a',
        rust:        '#9e4a2e',
        clay:        '#c8824f',
        sage:        '#6b8c72',
        warm:        '#d4b896',
        ink:         '#2c2318',
        muted:       '#8c7a62',
        muted2:      '#b5a48e',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'marquee':      'marquee 25s linear infinite',
        'spin-slow':    'spin 20s linear infinite',
      },
      keyframes: {
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      }
    },
  },
  plugins: [],
}
