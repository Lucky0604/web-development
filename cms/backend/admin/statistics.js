/*
 * @Author: Lucky 
 * @Date: 2017-05-02 15:24:25 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-02 15:26:30
 */


import Models from '../models'
import $ from '../utils'

const OBJ = Models.OBJ

export default {
  total: async function (req, res, next) {
    const User = await OBJ.UserModel.count({})
    const Article = await OBJ.ArticleModel.count({})
    const Comment = await OBJ.CommentModel.count({})
    const Vote = await OBJ.VoteModel.count({})
    const documents = {
      user: User,
      article: Article,
      comment: Comment,
      vote: Vote,
    }
    $.result(res, documents || {})
  }
}