/**
 * @Author: lucky
 * @Date:   2017-04-13T14:41:00+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-15T11:57:02+08:00
 */



var md5 = require('md5')
var fs = require('fs')
var moment = require('moment')
var jwt = require('jsonwebtoken')

var mongoose = require('../mongoose')
var Admin = mongoose.model('Admin')
var fsExistsSync = require('../utils').fsExistsSync
var config = require('../config')
var md5Pre = config.md5Pre
var secret = config.secretServer
const general = require('./general')

const list = general.list
const listItem = general.listItem
const modifyItem = general.modifyItem
const deleteItem = general.deleteItem
const recoverItem = general.recoverItem

/**
 * 获取管理员权限
 * @method getList
 * @param ctx
 * @return
 */
exports.getList = async ctx => {
  await list(ctx, Admin)
}

/**
 * 获取单个管理员
 * @method getItem
 * @param ctx
 * @return
 */
exports.getItem = async ctx => {
  await listItem(ctx, Admin)
}

/**
 * 管理员登录
 * @method loginAdmin
 * @param ctx
 * @return
 */
exports.loginAdmin = async ctx => {
  var password = ctx.request.body.password
  var username = ctx.request.body.username
  if (username === '' || password === '') {
    ctx.error('请输入用户名和密码')
    return
  }
  try {
    const result = await Admin.findOneAsync({
      username,
      password: md5(md5Pre + password),
      is_delete: 0
    })
    if (result) {
      var id = result._id
      var remember_me = 2592000000
      username = encodeURI(username)
      var token = jwt.sign({id, username}, secret, {expiresIn: 60 * 60 * 24 * 30})
      ctx.cookies.set('b_user', token, {maxAge: remember_me, httpOnly: false})
      ctx.cookies.set('b_userid', id, {maxAge: remember_me})
      ctx.cookies.set('b_username', new Buffer(username).toString('base64'), {maxAge: remember_me})
      ctx.success(token, '登录成功')
    } else {
      ctx.error('用户名或密码错误')
    }
  } catch(err) {
    ctx.error(err.toString())
  }
}


/**
 * 初始化添加管理员
 * @method addAdmin
 * @param ctx
 * @param next
 * @return
 */
exports.addAdmin = async ctx => {
  var email = ctx.request.body.email
  var password = ctx.request.body.password
  var username = ctx.request.body.username
  const payload = {}

  if (fsExistsSync('./admin.lock')) {
    payload.message = '请先删除admin.lock'
  } else if (!username || !password || !email) {
    payload.message = '请填写完整表单'
  } else {
    try {
      const result = await Admin.findOneAsync({username})
      // 若有结果则说明用户已经存在
      if (result) {
        payload.message = '该用户已存在'
      } else {
        // 没有结果，则可新建用户
        await Admin.createAsync({
          username,
          password: md5(md5Pre + password),
          email,
          create_date: moment().format('YYYY-MM-DD HH:mm:ss'),
          update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
          is_delete: 0,
          timestamp: moment().format('X')
        })
        await fs.writeFileSync('./admin.lock', username)
        payload.message = '添加用户成功: ' + username + ', 密码: ' + password
      }
    } catch(err) {
      payload.message = err.toString()
    }
  }
  await ctx.render('admin-add', payload)
}


/**
 * 编辑管理员
 * @method modifyAdmin
 * @param ctx
 * @return
 */
exports.modifyAdmin = async ctx => {
  var _id = ctx.request.body.id
  var email = ctx.request.body.email
  var password = ctx.request.body.password
  var update_date = moment().format('YYYY-MM-DD HH:mm:ss')
  var username = ctx.request.body.username
  var data = {email, username, update_date}
  if (password) data.password = md5(md5Pre + password)
  await modifyItem(ctx, Admin, _id, data)
}

/**
 * 删除管理员
 * @method deleteAdmin
 * @param ctx
 * @return
 */
exports.deleteAdmin = async ctx => {
  await deleteItem(ctx, Admin)
}

/**
 * 恢复管理员
 * @method recoverAdmin
 * @param ctx
 * @return
 */
exports.recoverAdmin = async ctx => {
  await recoverItem(ctx, Admin)
}
