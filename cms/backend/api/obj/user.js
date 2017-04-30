/**
 * @Author: lucky
 * @Date:   2017-04-30T10:48:53+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-30T10:58:57+08:00
 */



import $ from '../../utils'
import auth from '../../utils/auth'
import Models from '../../models'

const {UserModel} = Models.OBJ

export default {
  // Login
  login: async (req, res, next) => {
    let exist = await UserModel.find({openid: req.body.openid})
    // if it does not exist, then create one
    if ($.isEmpty(exist)) {
      exist = await UserModel.create(req.body)
      return $.result(res, exist)
    } else if (exist.status === -1){
      // if it is exist, then check the status
      return $.result(res, `status: ${exist.status}`)
    }

    $.result(res, exist)
  },

  // verify the invite code
  verify: async (req, res, next) => {
    let exist = await UserModel.find({
      openid: req.body.openid,
      code: req.body.code
    })
    if ($.isEmpty(exist)) {
      return $.result(res, 'not match')
    } else if (exist.status === -1) {
      // if the user does not activate, and the code matched, then login success
      exist = await UserModel.update({
        _id: exist._id
      }, {status: 1})
      $.result(res, exist)
    }
  }
}
