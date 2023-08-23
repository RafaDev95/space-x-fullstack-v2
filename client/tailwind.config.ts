import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#222629',
        card: '#474B4F',
        secondary: '#343A40',
        'text-primary': '#e2e8f0',
      },
    },
  },
  plugins: [],
}
export default config
