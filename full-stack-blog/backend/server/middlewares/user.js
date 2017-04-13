/**
 * @Author: lucky
 * @Date:   2017-04-13T13:19:11+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T13:26:48+08:00
 */



var check = require('./check')

module.exports = async(ctx, next) {
  // 从cookies中获取用户的token
  var token = ctx.cookies.get('user')
  // 从cookies中获取用户id
  var userid = ctx.cookies.get('userid')
  // 若cookies中有用户名则获取，否则为空
  var username = ctx.cookies.get('username') || ''
  // 使用base64解析用户名
  username = new Buffer(username, 'base64').toString()
  if (token) {
    // 如果有token的情况
    const decoded = await check(token, 'user')
    if (decoded && decoded.id === userid && decoded.username === username) {
      ctx.decoded = decoded
      await next()
    } else {
      // 若没有token, 则设置cookies
      ctx.cookies.set('user', '', {maxAge: 0, httpOnly: false})
      ctx.cookies.set('userid', '', {maxAge: 0})
      ctx.cookies.set('username', '', {maxAge: 0})
      ctx.body = {
        // 状态码
        code: -400,
        message: '登录验证失败',
        data: ''
      }
    }
  } else {
    ctx.body = {
      code: -400,
      message: '请先登录',
      data: ''
    }
  }
}
