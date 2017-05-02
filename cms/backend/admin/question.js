/*
 * @Author: Lucky 
 * @Date: 2017-05-02 15:14:55 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-02 15:19:17
 */

import $ from '../utils'
import Models from '../models'
import Base from './base'

const QuestionModel = Models.OBJ.QuestionModel
const QuestionAPI = new Base({
  model: QuestionModel,
  search: 'title'
})

QuestionAPI.methods.create = QuestionAPI.methods.addSchedule

export default QuestionAPI.methods