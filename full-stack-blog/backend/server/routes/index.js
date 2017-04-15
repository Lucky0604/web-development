/**
 * @Author: lucky
 * @Date:   2017-04-14T17:47:10+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-15T13:33:10+08:00
 */



const router = require('koa-router')()
const backend = require('./backend')
const frontend = require('./frontend')

const backendUser = require('../service/backend-user')

// 添加管理员
router.get('/backend', async ctx => {
  ctx.state = {
    title: '后台登录',
    message: ''
  }
  await ctx.render('admin-add', {})
})
router.post('/backend', backendUser.addAdmin)

router.use('/api/backend', backend.routes(), backend.allowedMethods())
router.use('/api/frontend', frontend.routes(), frontend.allowedMethods())

module.exports = router
