/**
 * 若项目不使用jquery，而引入第三方Ajax请求库(如superagent)
 * 则将其添加到 build/webpack.base.conf.js的entry.vendor分离打包
 */
var xhr = require('./jquery').default

/**
 * 为方便纯静态页的演示，使用了支持在浏览器运行的mock server
 * 通过按照接口格式封装xhr函数，以实现基于Promise的请求和响应
 */
if (__PROD__) {
  xhr = require('MOCK/browser-xhr')
}

/**
 * XHR 请求接口定义
 *
 * @param {String} options.method 请求方法(默认为get)
 * @param {String} options.url 请求路径(基于rootPath地址)
 * @param {Object} options.body 请求体(例如后端express可使用req.body获取该对象)
 * @return {Promise}
 */
export default xhr
