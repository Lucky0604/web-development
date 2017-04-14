/**
 * @Author: lucky
 * @Date:   2017-04-14T16:04:25+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-14T16:27:28+08:00
 */



var moment = require('moment')
var mongoose = require('../mongoose')
var Article = mongoose.model('Article')
var Like = mongoose.model('Like')

/**
 * 用户点赞
 * @method like
 * @param ctx
 * @return
 */
exports.like = async ctx => {
  var article_id = ctx.query.id
  var user_id = ctx.cookies.get('userid')
  var data = {
    article_id,
    user_id,
    create_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    timestamp: moment().format('X'),
    update_date: moment().format('YYYY-MM-DD HH:mm:ss')
  }
  try {
    const result = await Like.findOneAsync({article_id, user_id})
    if (result) {
      ctx.error('你已经赞过了')
    } else {
      await Like.createAsync(data)
      await Article.updateAsync({_id: article_id}, {'$inc': {'like': 1}})
      ctx.success('success', '更新成功')
    }
  } catch (err) {
    ctx.error(err.toString())
  }
}

/**
 * 取消点赞
 * @method unlike
 * @param ctx
 * @return
 */
exports.unlike = async ctx => {
  var article_id = ctx.query.id
  var user_id = ctx.cookies.get('userid')
  try {
    await Like.removeAsync({article_id, user_id})
    await Article.updateAsync({_id: article_id}, {})
    ctx.success('success', '更新成功')
  } catch (err) {
    ctx.error(err.toString())
  }
}
