/**
 * @Author: lucky
 * @Date:   2017-04-15T13:47:18+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-15T14:09:07+08:00
 */



require('shelljs/global')
process.env.NODE_ENV = 'production'

var ora = require('ora')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsPath, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', './dist/')
cp('-R', 'favicon.ico', './dist/')

webpack(webpackConfig, function(err, state) {
  spinner.stop()
  if (err) {
    throw err
  }
  process.stdout.write(state.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
