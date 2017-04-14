/**
 * @Author: lucky
 * @Date:   2017-04-14T11:55:04+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-14T12:34:19+08:00
 */



var moment = require('moment')
var mongoose = require('../mongoose')
var Category = mongoose.model('Category')
const general = require('./general')

const listItem = general.listItem
const modifyItem = general.modifyItem
const recoverItem = general.recoverItem
const deleteItem = general.deleteItem

/**
 * 管理员获取分页列表
 * @method getList
 * @param ctx
 * @return
 */
exports.getList = async ctx => {
  try {
    const result = await Category.find().sort('-cate_order').exec()
    ctx.success({
      listItem: result
    })
  } catch(err) {
    ctx.error(err.toString())
  }
}

/**
 * 管理员获取item
 * @method getItem
 * @param ctx
 * @return
 */
exports.getItem = async ctx => {
  await listItem(ctx, Category)
}

/**
 * 管理员添加item
 * @method addItem
 * @param ctx
 * @return
 */
exports.addItem = async ctx => {
  var cate_name = ctx.request.body.cate_name
  var cate_order = ctx.request.body.cate_order
  if (!cate_name || !cate_order) {
    ctx.error('请填写分类名和排序')
  } else {
    try {
      const result = await Category.createAsync({
        cate_name,
        cate_order,
        create_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
        timestamp: moment().format('X')
      })
      ctx.success(result._id, '添加成功')
    } catch(err) {
      ctx.error(err.toString())
    }
  }
}

/**
 * 管理员删除item
 * @method deleteItem
 * @param ctx
 * @return
 */
exports.deleteItem = async ctx => {
  await deleteItem(ctx, Category)
}

/**
 * 管理员激活item
 * @method recoverItem
 * @param ctx
 * @return
 */
exports.recoverItem = async ctx => {
  await recoverItem(ctx, Category)
}

/**
 * 管理员编辑item
 * @method modifyItem
 * @param ctx
 * @return
 */
exports.modifyItem = async ctx => {
  var _id = ctx.request.body.id
  var cate_name = ctx.request.body.cate_name
  var cate_order = ctx.request.body.cate_order
  var update_date = moment().format('YYYY-MM-DD HH:mm:ss')
  await modifyItem(ctx, Category, _id, {cate_name, cate_order, update_date})
}
