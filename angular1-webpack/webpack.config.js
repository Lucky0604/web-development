'use strict';

// modules
const webpack = require('webpack');
const helpers = require('./webpack/helpers');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// set the environment by npm lifecycle event, `npm run build` npm_lifecycle_event is build
const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';

module.exports = function() {
  const config = {
    context: helpers.root('./src'),
    entry: {
      'vendor': ['angular', 'angular-route'],
      'app': './app.js',
      'app.other': './app.other.js'
    },
    output: {
      path: helpers.root('./www'),
      publicPath: '/',
      filename: isProd ? '[name].[hash:8].js': '[name].bundle.js',
      chunkFilename: isProd ? '[name].[hash:8].js': '[name].bundle.js'
    },
    /**
     * Options affecting the normal modules
     */
    module: {
      /**
       * An array of applied pre and post loaders
       * http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
       */
      preLoaders: [
        /**
         * source map loader support for *.js files
         * extract sourcemaps for source files that as added as sourceMappingURL comment
         * https://github.com/webpack/source-map-loader
         */
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            helpers.root('node_modules/angular'),
            helpers.root('node_modules/angular-route')
          ]
        }
      ],
      /**
       * 一些自动依赖的加载器
       * 重点：这些加载器是相对于依赖的资源文件来解决，即并不是相对于配置文件来解决
       * See: http://webpack.github.io/docs/configuration.html#module-loaders
       */
      loaders: [
        // JS Loader
        // 将ES6和ES7代码转化为ES5代码
        // Reference: https://github.com/babel/babel-loader
        {
          test: /\.js$/,
          loaders: ['babel', 'eslint-loader'],
          exclude: /node_modules/
        },
        /**
         * JSON loader support for *.json files
         * See: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        /**
         * less loader
         * Reference https://github.com/webpack/less-loader
         */
        {
          test: /\.less$/,
          exclude: helpers.root("./src/css/main.less"),
          loader: ExtractTextPlugin.extract("css!postcss!less")
        },
        // all css required in src/app files will be merged in js files
        {
          test: /\.less/,
          include: helpers.root("./src/css/main.less"),
          loader: 'style!css!postcss!less'
        },
        /**
         * HTML loader
         * Reference: https://github.com/webpack/html-loader
         * allow loading html through js
         */
        {
          test: /\.html$/,
          loader: 'html?root=/&attrs=img:src img:data-src link:href'
        },
        /**
         * FILE loader
         * Reference: https://github.com/webpack/file-loader
         * copy resource file to output
         */
        {
          test: /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i,
          loader: 'file?name=images/[name].[ext]?[hash]'
        }
      ]
    },

    /**
     * 插件
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    plugins: [
      // vendor
      new webpack.optimize.CommonsChunkPlugin({
        name: 'commons.chunk',
        chunks: ['app', 'app.other']
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', isProd ? 'vendor.[hash:8].js': 'vendor.bundle.js'),
      new HtmlWebpackPlugin({
        template: helpers.root('./src/index.html'),
        chunks: ['commons.chunk', 'vendor', 'app'],
        chunksSortMode: 'dependency'
      }),
      new HtmlWebpackPlugin({
        filename: 'app.other.html',
        template: helpers.root('./src/index.html'),
        chunks: ['commons.chunk', 'vendor', 'app.other'],
        chunksSortMode: 'dependency'
      }),
      /**
       * extract css files
       * Reference: https://github.com/webpack/extract-text-webpack-plugin
       */
      new ExtractTextPlugin(isProd ? '[name].[hash:8].css': '[name].css')
    ],

    /**
     * Postcss
     * Reference: https://github.com/postcss/autoprefixer
     */
    postcss: [
      autoprefixer({
        browsers: ['last 2 version']
      })
    ],
    /**
     * dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
      contentBase: 'src',
      // server port
      port: 8080
    }
  };

  if (isProd) {
    config.plugins.push(
      /**
       * 只在没有错误时放出文件
       * Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
       */
      new webpack.NoErrorsPlugin(),
      /**
       * 在输出时消除重复模块
       * Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
       */
      new webpack.optimize.DedupePlugin(),
      /**
       * 压缩所有js文件，将加载器切换为压缩模式
       * Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
       */
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  if (isProd) {
    // config.devtool = 'source-map';
  } else {
    config.devtool = 'source-map';
  }

  // 添加debug消息
  config.debug = !isProd || !isTest;
  return config;
}();
