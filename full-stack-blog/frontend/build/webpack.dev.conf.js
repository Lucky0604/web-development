/**
 * @Author: lucky
 * @Date:   2017-04-15T13:47:18+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-16T11:23:22+08:00
 */



var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!postcss-loader!less-loader'
    }]
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  output: {
    // necessary for the html plugin to work properly when serving the html from in-memory
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      chunks: [
        'vendor', 'app'
      ],
      filename: 'index.html',
      template: 'src/template/index.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      chunks: [
        'vendor', 'admin'
      ],
      filename: 'admin.html',
      template: 'src/template/admin.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
