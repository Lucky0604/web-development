/**
 * @Author: lucky
 * @Date:   2017-04-14T16:28:19+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-15T13:36:23+08:00
 */



var mongoose = require('../mongoose')
var Article = mongoose.model('Article')
var Like = mongoose.model('Like')

/**
 * 前台浏览，获取文章列表
 * @method getList
 * @param ctx
 * @return
 */
exports.getList = async ctx => {
  var by = ctx.query.by
  var id = ctx.query.id
  var key = ctx.query.key
  var limit = ctx.query.limit
  var page = ctx.query.page
  page = parseInt(page, 10)
  limit = parseInt(limit, 10)
  if (!page) page = 1
  if (!limit) limit = 10
  var data = {
    is_delete: 0
  }
  var skip = (page - 1) * limit
  if (id) {
    data.category = id
  }
  if (key) {
    var reg = new RegExp(key, 'i')
    data.title = {$regex: reg}
  }
  var sort = '-update_date'
  if (by) {
    sort = '-' + by
  }

  try {
    var [lists, total] = await Promise.all([
      Article.find(data).sort(sort).skip(skip).limit(limit).exec(),
      Article.countAsync(data)
    ])
    var arr = []
    var totalPage = Math.ceil(total / limit)
    var user_id = ctx.cookies.get('userid')
    lists = lists.map(item => {
      item.content = item.content.substring(0, 500) + '...'
      return item
    })
    var tmpData = {
      list: lists,
      total,
      hasNext: totalPage > page ? 1: 0,
      hasPrev: page > 1
    }
    if (user_id) {
      lists.forEach(item => {
        arr.push(Like.findOneAsync({article_id: item.id, user_id}))
      })
      const collection = await Promise.all(arr)
      lists = lists.map((item, index) => {
        item._doc.like_status = !!collection[index]
        return item
      })
      tmpData.list = lists
      ctx.success(tmpData)
    } else {
      lists = lists.map(item => {
        item._doc.like_status = false
        return item
      })
      tmpData.list = lists
      ctx.success(tmpData)
    }
  } catch (err) {
    ctx.error(err.toString())
  }
}

/**
 * 前台浏览时，获取单篇文章
 * @method getItem
 * @param ctx
 * @return
 */
exports.getItem = async ctx => {
  var _id = ctx.query.id
  var user_id = ctx.cookies.get('userid')
  if (!_id) {
    ctx.error('参数错误')
    return
  }

  try {
    const [article, like, ] = await Promise.all([
      Article.findOneAsync({_id, is_delete: 0}),
      Like.findOneAsync({article_id: _id, user_id}),
      Article.updateAsync({_id}, {'$inc': {'visit': 1}})
    ])
    if (!article) {
      ctx.error('没有找到该文章')
    } else {
      if (user_id) {
        article._doc.like_status = !! like
      } else {
        article._doc.like_status = false
        ctx.success(article)
      }
    }
  } catch (err) {
    ctx.error(err.toString())
  }
}

/**
 * 用户获取访问趋势
 * @method getTrending
 * @param ctx
 * @return
 */
exports.getTrending = async ctx => {
  var limit = 5
  var data = {is_delete: 0}
  try {
    const result = await Article.find(data).sort('-visit').limit(limit).exec()
    ctx.success({
      list: result
    })
  } catch (err) {
    ctx.error(err.toString())
  }
}
