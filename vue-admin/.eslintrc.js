/**
 * @Author: lucky
 * @Date:   2017-04-05T16:37:24+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-05T16:38:59+08:00
 */



module.exports = {
  root: true,
  paser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'space-before-function-paren': ['error', 'never'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2: 0
  }
}
