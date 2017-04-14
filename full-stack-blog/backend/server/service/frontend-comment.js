/**
 * @Author: lucky
 * @Date:   2017-04-14T17:01:47+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-14T17:22:40+08:00
 */



var moment = require('moment')

var mongoose = require('../mongoose')
var Comment = mongoose.model('Comment')
var Article = mongoose.model('Article')

/**
 * 用户发表评论
 * @method addComment
 * @param ctx
 * @return
 */
exports.addComment = async ctx => {
  var content = ctx.request.body.content
  var create_date = moment().format('YYYY-MM-DD HH:mm:ss')
  var id = ctx.request.body.id
  var timestamp = moment().format('X')
  var update_date = moment().format('YYYY-MM-DD HH:mm:ss')
  var userid = ctx.cookies.get('userid')
  var username = ctx.cookies.get('username')
  username = new Buffer(username, 'base64').toString()

  if (!id) {
    ctx.error('参数错误')
    return
  } else if (!content) {
    ctx.error('请输入评论内容')
    return
  }
  var data = {
    article_id: id,
    userid,
    username,
    email: '',
    content,
    create_date,
    is_delete: 0,
    timestamp,
    update_date
  }
  try {
    const result = await Comment.createAsync(data)
    await Article.updateAsync({_id: id}, {'$inc': {'comment_count': 1}})
    ctx.success(result)
  } catch (err) {
    ctx.error(err.toString())
  }
}

/**
 * 前台浏览时，读取评论列表
 * @method getList
 * @param ctx
 * @return
 */
exports.getList = async ctx => {
  var all = ctx.query.all
  var id = ctx.query.id
  var limit = ctx.query.limit
  var page = ctx.query.page
  if (!id) {
    ctx.error('参数错误')
  } else {
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    var data = {
      article_id: id
    }
    var skip = (page - 1) * limit
    if (!all) {
      data.is_delete = 0
    }
    try {
      const [list, total] = await Promise.all([
        Comment.find(data).sort('-_id').skip(skip).limit(limit).exec(),
        Comment.countAsync(data)
      ])
      var totalPage = Math.ceil(total / limit)
      ctx.success({
        list,
        total,
        hasNext: totalPage > page ? 1: 0
      })
    } catch (err) {
      ctx.error(err.toString())
    }
  }
}

/**
 * 删除评论
 * @method deleteComment
 * @param ctx
 * @return
 */
exports.deleteComment = async ctx => {
  var id = ctx.query.id
  try {
    await Comment.updateAsync({_id: id}, {is_delete: 1})
    await Article.udpateAsync({_id: id}, {'$inc': {'comment_count': -1}})
    ctx.success('success', '删除成功')
  } catch (err) {
    ctx.error(err.toString())
  }
}

/**
 * 恢复评论
 * @method recoverComment
 * @param ctx
 * @return
 */
exports.recoverComment = async ctx => {
  var id = ctx.query.id
  try {
    await Comment.updateAsync({_id: id}, {is_delete: 0})
    await Article.updateAsync({_id: id}, {'$inc': {'comment_count': 1}})
    ctx.success('success', '恢复成功')
  } catch (err) {
    ctx.error(err.toString())
  }
}
