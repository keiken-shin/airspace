const { colors } = require('./custom.config.js');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        whiteSmoke: colors.whiteSmoke,
        silver: colors.silver,
        dodgerBlue: colors.dodgerBlue,
        royalBlue: colors.royalBlue,
        dimGray: colors.dimGray,
        blackPearl: colors.blackPearl,
        lynxWhite: colors.lynxWhite,
      },
      fontFamily: {
        noto: ['Noto Sans JP', 'system-ui', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
