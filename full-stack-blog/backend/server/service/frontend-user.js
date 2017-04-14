/**
 * @Author: lucky
 * @Date:   2017-04-14T15:02:00+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-14T16:03:08+08:00
 */



var md5 = require('md5')
var moment = require('moment')
var jwt = require('jsonwebtoken')

var mongoose = require('../mongoose')
var User = mongoose.model('User')

var config = require('../config')
var md5Pre = config.md5Pre
var secret = config.secretClient
var strlen = require('../utils').strlen

const general = require('./general')
const list = general.list
const modifyItem = general.modifyItem
const deleteItem = general.deleteItem
const recoverItem = general.recoverItem

exports.getList = async ctx => {
  await list(ctx, User)
}

/**
 * 用户登录
 * @method login
 * @param ctx
 * @return
 */
exports.login = async ctx => {
  var password = ctx.request.body.password
  var username = ctx.request.body.username
  if (username === '' || password === '') {
    ctx.error('请输入用户名和密码')
  }
  try {
    const result = await User.findOneAsync({username, password: md5(md5Pre + password), is_delete: 0})
    if (result) {
      var id = result._id
      var remember_me = 2592000000
      username = encodeURI(username)
      var token = jwt.sign({id, username}, secret, {expiresIn: 60 * 60 * 24 * 30})
      ctx.cookies.set('user', token, {maxAge: remember_me, httpOnly: false})
      ctx.cookies.set('userid', id, {maxAge: remember_me})
      ctx.cookies.set('username', new Buffer(username).toString('base64'), {maxAge: remember_me})
      ctx.success(token, '登录成功')
    } else {
      ctx.error('用户名或者密码错误')
    }
  } catch(err) {
    ctx.error(err.toString())
  }
}

/**
 * 用户登出
 * @method logout
 * @param ctx
 * @return
 */
exports.logout = async ctx => {
  ctx.cookies.set('user', '', {maxAge: -1, httpOnly: false})
  ctx.cookies.set('userid', '', {maxAge: -1})
  ctx.cookies.set('username', '', {maxAge: -1})
  ctx.success('', '退出成功')
}

/**
 * 用户注册
 * @method addUser
 * @param ctx
 * @return
 */
exports.addUser = async ctx => {
  var email = ctx.request.body.email
  var password = ctx.request.body.password
  var username = ctx.request.body.username

  if (!username || !password || !email) {
    ctx.error('请填写完整信息')
  } else if (strlen(username) < 4) {
    ctx.error('用户名长度至少2个中文或4个英文字符')
  } else if (strlen(password) < 8) {
    ctx.error('密码长度至少8位')
  } else {
    try {
      const result = await User.findOneAsync({username})
      if (result) {
        ctx.error('用户已存在')
      } else {
        await User.createAsync({
          username,
          password: md5(md5Pre + password),
          email,
          create_date: moment().format('YYYY-MM-DD HH:mm:ss'),
          update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
          is_delete: 0,
          timestamp: moment().format('X')
        })
        ctx.success('success', '注册成功')
      }
    } catch (err) {
      ctx.error(err.toString())
    }
  }
}

/**
 * 获取单个用户
 * @method getItem
 * @param ctx
 * @return
 */
exports.getItem = async ctx => {
  var userid = ctx.query.id || ctx.cookies.get('userid')
  try {
    const result = await User.findOneAsync({_id: userid, is_delete: 0})
    if (result) {
      ctx.success(result)
    } else {
      ctx.error('请先登录，或数据错误')
    }
  } catch (err) {
    ctx.error(err.toString())
  }
}

/**
 * 用户编辑
 * @method modifyItem
 * @param ctx
 * @return
 */
exports.modifyItem = async ctx => {
  var _id = ctx.request.body.id
  var email = ctx.request.body.email
  var username = ctx.request.body.username
  var password = ctx.request.body.password
  var update_date = moment().format('YYYY-MM-DD HH:mm:ss')
  var data = {email, username, update_date}
  if (password) data.password = md5(md5Pre + password)
  await modifyItem(ctx, User, _id, data)
}

/**
 * 账号编辑
 * @method account
 * @param ctx
 * @return
 */
exports.account = async ctx => {
  var _id = ctx.request.body.id
  var email = ctx.request.body.email
  var username = ctx.request.body.username
  var user_id = ctx.cookies.get('userid')
  var update_date = moment().format('YYYY-MM-DD HH:mm:ss')
  if (user_id === _id) {
    try {
      await User.updateAsync({_id}, {'$set': {email, username, update_date}})
      ctx.success('success', '更新成功')
    } catch (err) {
      ctx.error(err.toString())
    }
  } else {
    ctx.error('当前没有权限')
  }
}

/**
 * 密码编辑
 * @method password
 * @param ctx
 * @return
 */
exports.password = async ctx => {
  var _id = ctx.request.body.id
  var old_password = ctx.request.body.old_password
  var password = ctx.request.body.password
  var update_date = moment().format('YYYY-MM-DD HH:mm:ss')
  var user_id = ctx.cookies.get('userid')

  if (user_id === _id) {
    try {
      const result = await User.findOneAsync({_id, password: md5(md5Pre + old_password), is_delete: 0})
      if (result) {
        await User.updateAsync({_id}, {'$set': {password: md5(md5Pre + password), update_date}})
        ctx.success('success', '更新成功')
      } else {
        ctx.error('原始密码错误')
      }
    } catch (err) {
      ctx.error(err.toString())
    }
  } else {
    ctx.error('当前没有权限')
  }
}

/**
 * 用户删除
 * @method deleteItem
 * @param ctx
 * @return
 */
exports.deleteItem = async ctx => {
  await deleteItem(ctx, User)
}

/**
 * 用户恢复
 * @method recoverItem
 * @param ctx
 * @return
 */
exports.recoverItem = async ctx => {
  await recoverItem(ctx, User)
}
