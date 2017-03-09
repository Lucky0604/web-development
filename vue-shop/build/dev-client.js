/**
 * Created by lucky on 17-3-9.
 *
 * 开发环境客户端配置
 */
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function(event) {
  if (event.action === 'reload') {
    window.location.reload()
    console.log('reload!')
  }
})
