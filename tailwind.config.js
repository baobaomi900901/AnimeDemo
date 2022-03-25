module.exports = {
  content: ["./src/**/*.{html,js,css}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#0042f6",
      },
    },
    fontFamily: {
      "yk": "YouSheBiaoTiHei"
    },
    screens: {
      'mobile': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'sm': '640px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}