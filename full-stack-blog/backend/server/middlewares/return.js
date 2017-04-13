/**
 * @Author: lucky
 * @Date:   2017-04-13T14:38:24+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T14:39:52+08:00
 */



module.exports = async (ctx, next) => {
  // 返回错误状态码和信息
  ctx.error = (message, data = '') => {
    ctx.body = {
      code: -200,
      message,
      data
    }
  }
  // 返回成功状态码和信息
  ctx.success = (data, message = '') => {
    ctx.body = {
      code: 200,
      message,
      data
    }
  }
}
