import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    //if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'levant-gradient-r': 'linear-gradient(-90deg, rgb(64, 225, 254) 10%, rgb(1, 144, 255))',
        'levant-gradient-120': 'linear-gradient(120deg, #40e1fe, #1c0055)'
      },
    },
    colors: {
      primary: {
        100: '#120c27',
        200: '#40E1FE',
      },
      greyShades: {
        100: '#F5F8FF',
        200: '#E8EFF9',
      },
      white: '#fff',
      black: '#000'
    },
    textColor: {
      primary: '#18073B',
      secound: "#908CA5"
    },
    boxShadow:{
      'shadow-r-b': 'rgb(0 0 0 / 50%) 2px 2px 4px'
    }
  },
  plugins: [],
}
export default config
