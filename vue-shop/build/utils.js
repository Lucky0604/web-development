/**
 * Created by lucky on 17-3-8.
 *
 * css loader
 * 资源文件路径
 */
var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  // 根据环境配置资源文件的子文件夹
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory: config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path);
}

exports.cssLoaders = function (options) {
  options = options || {}
  // 生成loader字符串配合extract text plugin使用
  function generateLoaders(loaders) {
    var sourceLoader = loaders.map(function(loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap': '')
    }).join('!')

    /**
     * 当指明这个配置时，提取CSS
     */
    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// 为标准样式生成加载器(.vue文件外部)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}
