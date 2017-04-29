/**
 * @Author: lucky
 * @Date:   2017-04-29T18:16:12+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-29T18:45:29+08:00
 *
 * 生成邀请码
 * 创建用户
 * 根据用户ID更新token，返回
 */



import $ from '../utils'
import auth from '../utils/auth'
import Models from '../models'
import Base from './base'

const UserModel = Models.OBJ.UserModel
const UserAPI = new Base({
  model: UserModel,
  search: 'nickname'
})

UserAPI.methods.create = async function (req, res, next) {
  const query = Object.assign({code: $.inviteCode()}, req.body)
  let user = await UserModel.create(query)
  const token = auth.createToken({user: user._id})
  user = await UserModel.update({_id: user._id}, {token: token})
  $.result(res, user)
}

UserAPI.methods.login = async function (req, res, next) {
  const {error, value} = $.parameter.validate(req.body, $.parameter.object().keys({
    email: $.parameter.string(),
    password: $.parameter.string()
  }))

  if (error) {
    return $.result(res, 'params error')
  }

  let documents = await UserModel.find({'email.addr': value.email, 'password': value.password})
  if ($.isEmpty(documents)) {
    return $.result(res, 'login failed')
  }

  req.session.user = documents
  res.cookie('email', documents.email.addr, {maxAge: 900000})
  $.result(res, documents)
}

UserAPI.methods.logout = async function (req, res, next) {
  res.cookie('email', null)
  req.session.user = null
  $.result(res, {})
}

UserAPI.methods.resetPassword = async function (req, res, next) {
  let query = Object.assign({}, req.body)
  if ($.isEmpty(query.old) || $.isEmpty(query.new)) {
    return $.result(res, 'params error')
  }
  if (query.old === query.new) {
    return $.result(res, 'same password')
  }

  let documents = await UserModel.update({_id: req.session.user._id}, {password: query.new})

  if (documents === -1) {
    return $.result(res, 'reset failed')
  }
  req.session.user = documents
  $.result(res, documents)
}

export default UserAPI.methods
