/*
 * @Author: Lucky 
 * @Date: 2017-05-03 10:28:19 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-03 10:59:08
 */

import $ from '../../utils'
import Models from '../../models'
import Base from './base'

const {VoteModel, LikeModel, CommentModel} = Models.OBJ

export default new Base({
  model: VoteModel,

  myVotes: async function (req, res, next) {
    const query = Object.assign({}, req.query)
    $.result(res, await VoteModel.all(query))
  },

  myLikes: async function (req, res, next) {
    const query = Object.assign({
      vote: {$exists: true},
    }, req.query)
    $.result(res, await LikeModel.all(query))
  },

  myComments: async function (req, res, next) {
    const query = Object.assign({
      vote: {$exists: true}
    }, req.query)
    $.result(res, await CommentModel.all(query))
  }
})