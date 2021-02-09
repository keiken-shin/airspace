/* eslint-disable global-require */
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./public/index.html', './src/**/*.jsx', './src/**/*.js'],
  css: ['./src/assets/styles/tailwind.css'],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
  plugins: [
    require('tailwindcss')('./src/tailwind.config.js'),
    require('autoprefixer'),
    process.env.REACT_APP_ENV === 'production' ? [purgecss] : [],
  ],
};
