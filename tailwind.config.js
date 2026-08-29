/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {
    colors: { forest: '#143F32', leaf: '#287052', floral: '#D94F70', cream: '#FFF8E8', gold: '#C88B20', saffron: '#E77817', temple: '#7A2E1D' },
    fontFamily: { sans: ['Inter', 'Noto Sans Kannada', 'system-ui', 'sans-serif'], serif: ['Georgia', 'serif'] },
    boxShadow: { soft: '0 8px 30px rgba(20,63,50,.09)', lift: '0 16px 40px rgba(20,63,50,.14)' },
  }},
  plugins: [],
};
