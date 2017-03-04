var msgCtrls = require('../controllers/msg');
var authCtrls = require('../controllers/auth');
var interceptor = require('../middlewares/interceptor');

/**
 * GET /msg 获取留言信息列表
 * POST /msg 新增一条留言
 *
 * GET /msg/authors 获取所有留言用户名
 *
 * GET /msg/:msgId 获取指定ID的留言信息
 * PUT /msg/:msgId 更新指定ID的留言信息
 * DELETE /msg/:msgId 删除指定ID的留言信息
 *
 * GET /auth/checkLogin 检测用户是否已经的登陆
 * POST /auth/login 登陆
 * DELETE /auth/logout 注销登陆
 */
module.exports = [{
  path: '/msg',
  method: 'GET',
  handler: msgCtrls.getList
}, {
  path: '/msg',
  method: 'POST',
  middlewares: [interceptor.NEED_AUTH],
  handler: msgCtrls.add
}, {
  path: '/msg/authors',
  method: 'GET',
  handler: msgCtrls.authors
}, {
  path: '/msg/:msgId',
  method: 'GET',
  handler: msgCtrls.getById
}, {
  path: '/msg/:msgId',
  method: 'PUT',
  middlewares: [interceptor.NEED_AUTH],
  handler: msgCtrls.update
}, {
  path: '/msg/:msgId',
  method: 'DELETE',
  middlewares: [interceptor.NEED_AUTH],
  handler: msgCtrls.remove
}, {
  path: '/auth/checkLogin',
  method: 'GET',
  handler: authCtrls.checkLogin
}, {
  path: '/auth/login',
  method: 'POST',
  middlewares: [interceptor.FORBID_AUTHED],
  handler: authCtrls.login
}, {
  path: '/auth/logout',
  method: 'DELETE',
  middlewares: [interceptor.NEED_AUTH],
  handler: authCtrls.logout
}]
