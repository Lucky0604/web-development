/**
 * @Author: lucky
 * @Date:   2017-04-15T14:03:15+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-15T14:04:52+08:00
 */



// https://github.com/michael-ciniawsky/postcss-load-config

var autoprefixer = require('autoprefixer')
var browserslist = require('browserslist')

module.exports = {
  plugins: [
    autoprefixer({browsers: browserslist('last 2 versions, > 0.1%')})
  ]
}
