/**
 * @Author: lucky
 * @Date:   2017-04-13T14:42:49+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T15:08:37+08:00
 */



/**
 * 公用列表方法
 * @method list
 * @param {[type]} ctx
 * @param {[type]} mongoDB
 * @param {[type]} sort
 * @return {[type]}
 */
exports.list = async (ctx, mongoDB, sort) => {
  sort = sort || '-_id'
  var limit = ctx.query.limit
  var page = ctx.query.page
  page = parseInt(page, 10)
  limit = parseInt(limit, 10)
  if (!page) page = 1
  if (!limit) limit = 10
  var skip = (page - 1) * limit
  try {
    const [list, total] = await Promise.all([
      mongoDB.find().sort(sort).skip(skip).limit(limit).exec()
      mongoDB.countAsync()
    ])
    var totalPage = Math.ceil(total / limit)
    ctx.success({
      list,
      total,
      hasNext: totalPage > page ? 1: 0,
      hasPrev: page > 1 ? 1: 0
    })
  } catch(err) {
    ctx.error(err.toString())
  }
}

/**
 * 公用根据id获取单个item方法
 * @method listItem
 * @param ctx
 * @param mongoDB
 * @return
 */
exports.listItem = async (ctx, mongoDB) => {
  var id = ctx.query.id
  if (!id) {
    ctx.error('参数错误')
    return
  }
  try {
    const result = await mongoDB.findOneAsync({_id: id})
    ctx.success(result)
  } catch(err) {
    ctx.error(err.toString())
  }
}


/**
 * 公用根据id删除单个item方法
 * @method deleteItem
 * @param ctx
 * @param mongoDB
 * @return
 *
 */
exports.deleteItem = async (ctx, mongoDB) => {
  var id = ctx.query.id
  try {
    await mongoDB.updateAsync({_id: id}, {is_delete: 1})
    ctx.success(result, '更新成功')
  } catch(err) {
    ctx.error(err.toString())
  }
}

/**
 * 公用根据id编辑单个item方法
 * @method editItem
 * @param ctx
 * @param mongoDB
 * @return
 */
exports.editItem = async (ctx, mongoDB) => {
  var id = ctx.query.id
  try {
    await mongoDB.updateAsync({_id: id}, {is_delete: 0})
    ctx.success('sucess', '更新成功')
  } catch(err) {
    ctx.error(err.toString())
  }
}
