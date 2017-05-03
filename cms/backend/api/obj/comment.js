/*
 * @Author: Lucky 
 * @Date: 2017-05-03 10:23:37 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-03 10:27:57
 */

import $ from '../../utils'
import Models from '../../models'
import Base from './base'

const {CommentModel} = Models.OBJ

export default new Base({
  model: CommentModel
})