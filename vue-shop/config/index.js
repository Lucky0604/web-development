/**
 * Created by lucky on 17-3-8.
 *
 * 初始化配置文件
 * 开发环境和生产环境相关参数设置
 */
var path = require('path')

module.exports = {
  build: {
    env: {
      // 运行环境为生产环境
      NODE_ENV: '"production"'
    },
    index: path.resolve(__dirname, '../zrshop/index.html'),
    assetsRoot: path.resolve(__dirname, '../zrshop'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/zrshop/',
    productionSourceMap: true,
    /**
     * 很多静态的主机都默认关闭gzip压缩
     * 当需要打开时(设置为true)，请确保:
     * npm i --save-dev compression-webpack-plugin
     */
    productionGzip: false,
    productionGzipExtension: ['js', 'css']
  },
  // 开发环境配置
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    port: 3000,
    assetsSubDirectory: 'static',
    assetsPublicPath:'/',

    context: [    // 代理路径

      '/shopping',
      '/ugc',
      '/v1',
      '/v2',
      '/v3',
      '/v4',
      '/bos',
      '/member',
      '/promotion',
      '/eus'

    ],

    proxyPath: 'https://mainsite-restapi.ele.me',

    /**
     * CSS soucemaps默认关闭，因为它的相对路径会有bug
     */
    cssSourceMap: false
  }
}

