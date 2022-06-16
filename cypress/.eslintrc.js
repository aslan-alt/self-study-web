module.exports = {
  plugins: ['cypress'],
  env: {
    'cypress/globals': true,
  },
  rules: {
    'cypress/no-unnecessary-waiting': 'off',
  },
};
