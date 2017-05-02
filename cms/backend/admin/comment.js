/*
 * @Author: Lucky 
 * @Date: 2017-05-02 15:09:16 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-02 15:14:50
 */
import $ from '../utils'
import Models from '../models'
import Base from './base'

const CommentModel = Models.OBJ.CommentModel
const CommentAPI = new Base({
  model: CommentModel,
  search: 'title'
})

CommentAPI.methods.all = async function (req, res, next) {
  $.result(res, await CommentModel.all({}, req.query.start))
}

export default CommentAPI.methods