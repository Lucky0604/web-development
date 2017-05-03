/*
 * @Author: Lucky 
 * @Date: 2017-05-03 10:11:40 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-03 11:34:07
 */

import $ from '../../utils'
import Models from '../../models'
import Base from './base'

const {ArticleModel, LikeModel, CommentModel} = Models.OBJ

export default new Base({
  model: ArticleModel,

  myArticles: async function (req, res, next) {
    const query = Object.assign({}, req.query)
    $.result(res, await ArticleModel.all(query))
  },

  myLikes: async function (req, res, next) {
    const query = Object.assign({
      article: {$exists: true},
    }, req.query)
    $.result(res, await LikeModel.all(query))
  },

  myComments: async function (req, res, next) {
    const query = Object.assign({
      article: {$exists: true},
    }, req.query)
    $.result(res, await CommentModel.all(query))
  }
})