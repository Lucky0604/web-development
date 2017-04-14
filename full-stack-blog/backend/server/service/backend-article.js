/**
 * @Author: lucky
 * @Date:   2017-04-14T13:26:27+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-14T14:55:01+08:00
 */



var moment = require('moment')
var mongoose = require('../mongoose')
var Article = mongoose.model('Article')
var Category = mongoose.model('Category')
var general = require('./general')

const listItem = general.listItem
const list = general.list

var marked = require('marked')
var hljs = require('highlight.js')

marked.setOptions({
  highlight(code) {
    return hljs.highlightAuto(code).value
  },
  breaks: true
})

/**
 * 管理员获取文章列表
 * @method
 * @param ctx
 * @return
 */
exports.getList = async ctx => {
  await list(ctx, Article, '-update_date')
}

/**
 * 管理员获取单个item
 * @method getItem
 * @param ctx
 * @return
 */
exports.getItem = async ctx => {
  await listItem(ctx, Article)
}

/**
 * 发布文章
 * @method addItem
 * @param ctx
 * @return
 */
exports.addItem = async ctx => {
  var categorys = ctx.request.body.category
  var content = ctx.request.body.content
  var html = marked(content)
  var title = ctx.request.body.title
  var arr_category = categorys.split('|')
  var category = arr_category[0]
  var category_name = arr_category[1]
  var data = {
    title,
    category,
    category_name,
    content,
    html,
    visit: 0,
    like: 0,
    comment_count: 0,
    create_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    is_delete: 0,
    timestamp: moment().format('X')
  }
  try {
    const result = await Article.createAsync(data)
    await Category.updateAsync({_id: category}, {'$inc': {'cate_num': 1}})
    ctx.success(result, '发布成功')
  } catch(err) {
    ctx.error(err.toString())
  }
}

/**
 * 管理员删除文章
 * @method deleteItem
 * @param ctx
 * @return
 */
exports.deleteItem = async ctx => {
  var id = ctx.query.id
  try {
    await Article.updateAsync({_id: id}, {is_delete: 1})
    await Category.updateAsync({_id: id}, {'$inc': {'cate_num': -1}})
    ctx.success('success', '更新成功')
  } catch(err) {
    ctx.error(err.toString())
  }
}

/**
 * 管理员恢复文章
 * @method recoverItem
 * @param ctx
 * @return
 */
exports.recoverItem = async ctx => {
  var id = ctx.query.id
  try {
    await Article.updateAsync({_id: id}, {is_delete: 0})
    await Category.updateAsync({_id: id}, {'$inc': {'cate_num': 1}})
    ctx.success('success', '更新成功')
  } catch(err) {
    ctx.error(err.toString())
  }
}

/**
 * 管理员编辑文章
 * @method modifyItem
 * @param ctx
 * @return
 */
exports.modifyItem = async ctx => {
  var category = ctx.request.body.category
  var category_name = ctx.request.body.category_name
  var category_old = ctx.request.body.category_old
  var content = ctx.request.body.content
  var html = marked(content)
  var id = ctx.request.body.id
  var title = ctx.request.body.title
  var update_date = moment().format('YYYY-MM-DD HH:mm:ss')

  try {
    const result = await Article.findOneAndUpdateAsync({_id: id}, {category, category_name, content, html, title, update_date}, {new: true})
    if (category !== category_old) {
      await Promise.all([
        Category.updateAsync({_id: category}, {'$inc': {'cate_num': 1}}),
        Category.updateAsync({_id: category_old}, {'$inc': {'cate_num': -1}})
      ])
    }
    ctx.success(result, '更新成功')
  } catch(err) {
    ctx.error(err.toString())
  }
}
