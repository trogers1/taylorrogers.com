import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        theanoDidotRegular: ['TheanoDidotRegular'],
      },
    },
  },
  plugins: [],
} satisfies Config;
