/**
 * @Author: lucky
 * @Date:   2017-04-29T18:52:48+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-29T19:16:40+08:00
 */




import $ from '../utils'
import Models from '../models'
import Base from './base'

const ArticleModel = Models.OBJ.ArticleModel
const LikeModel = Models.OBJ.LikeModel

let ArticleAPI = new Base({
  model: ArticleModel,
  search: 'title'
})

ArticleAPI.methods.all = async function (req, res, next) {
  let query = {}
  let search = req.query.search
  if (!$.isEmpty(search)) {
    query = {'title': new RegExp(search)}
  }
  let documents = await ArticleModel.all(query, req.query.start)
  $.result(res, documents)
}

ArticleAPI.methods.create = ArticleAPI.methods.addSchedule

// change index
ArticleAPI.methods.updateIndex = async function (req, res, next) {
  if (req.body.items.length === 0) {
    return $.result(res, {})
  } else {
    req.body.items.forEach(async (el, index) => {
      let documents = await ArticleModel.update({
        _id: el.id
      }, {_index: el.index})
      if (index === req.body.items.length - 1) {
        return $.result(res, {})
      }
    })
  }
}

ArticleAPI.methods.delete = async function (req, res, next) {
  let documents = await ArticleModel.findById(req.params.id)
  documents && documents.job && documents.job.cancel()
  documents = await ArticleModel.delete({'_id': req.params.id})
  if (documents === -1) {
    $.result(res, 'delete failed')
  } else {
    $.result(res, documents)
  }
}

export default ArticleAPI.methods