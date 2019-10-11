module.exports = {
  root: true,

  env: {
    browser: true,
  },

  extends: ['eslint:recommended', 'plugin:vue/essential'],
  globals: {
    'vm': false
  },

  rules: {
    'arrow-parens': 0,
    'comma-dangle': 0,
    curly: 0,
    eqeqeq: 0,
    'generator-star-spacing': 0,
    'no-console': 'off',
    'no-debugger': 'off',
    'no-extend-native': 0,
    'one-var': 0,
    'space-before-function-paren': 0,
    'spaced-comment': 0,
  },

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
}
