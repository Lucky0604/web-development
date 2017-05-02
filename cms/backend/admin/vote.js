/*
 * @Author: Lucky 
 * @Date: 2017-05-02 15:26:43 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-02 15:28:48
 */


import $ from '../utils'
import Models from '../models'
import Base from './base'

const VoteModel = Models.OBJ.VoteModel
const VoteRecordModel = Models.OBJ.VoteRecordModel

const VoteAPI = new Base({
  model: VoteModel,
  search: 'title'
})

VoteAPI.methods.create = VoteAPI.methods.addSchedule

const VoteRecordAPI = new Base({
  model: VoteRecordModel,
  search: 'title'
})

export default {
  vote: VoteAPI.methods,
  record: VoteRecordAPI.methods
}