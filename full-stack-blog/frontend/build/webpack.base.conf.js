/**
 * @Author: lucky
 * @Date:   2017-04-15T13:47:18+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-16T12:05:44+08:00
 */



var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var projectRoot = path.resolve(__dirname, '../')
var isProd = process.env.NODE_ENV === 'production'

var cssSourceMapDev = (!isProd && config.dev.cssSourceMap)
var cssSourceMapProd = (isProd && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning': false
  },
  entry: {
    app: './src/app.js',
    admin: './src/admin.js',
    vendor: ['./src/polyfill']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: isProd
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  externals: {
    'jquery': 'jQuery'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
      path.join(__dirname, '../node_modules')
    ],
    alias: {
      '~src': path.resolve(__dirname, '../src'),
      '~components': path.resolve(__dirname, '../src/components'),
      '~api': path.resolve(__dirname, '../src/api/index-client'),
      '~pages': path.resolve(__dirname, '../src/pages'),
      '~store': path.resolve(__dirname, '../src/store'),
      '~utils': path.resolve(__dirname, '../src/utils'),
      'api-config': path.resolve(__dirname, '../src/api/config-client')
    }
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, '../node_modules')
    ]
  },
  module: {
    rules: [
      /**
      {
        test: /\.vue$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: projectRoot,
        exclude: /node_modules/
      },
      */
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'staticimg/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}),
    new webpack.LoaderOptionsPlugin({
      minimize: isProd,
      options: {
        context: __dirname,
        vue: vueLoaderConfig
      }
    })
  ]
}
