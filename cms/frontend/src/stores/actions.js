/*
 * @Author: Lucky 
 * @Date: 2017-05-03 15:24:56 
 * @Last Modified by:   Lucky 
 * @Last Modified time: 2017-05-03 15:24:56 
 */
import * as api from './api'
import * as types from './mutation-types'

export default {
  fetchAdminItems: ({commit, state}, req) => {
    return api._get(req).then((items) => {
      req.cb && req.cb(items.data.data)
      commit(types.SET_ITEM, {key: 'adminItems', val: items.data.data})
    }).catch((err) => {
      console.log(err)
      req.msg.error('error')
    })
  },
  addAdminItem: ({commit, state}, req) => {
    api._post(req).then((result) => {
      req.cb && req.cb(result)
      if (result.status === 200) {
        req.msg.success('success')
        commit(types.ADD_ITEM, {key: 'adminItems', val: result.data.data})
      } else {
        req.msg.error(result.data.msg || 'error')
      }
    }).catch ((err) => {
      console.log(err)
      req.msg.error('error')
    })
  },

  updateAdminItem: ({commit, state}, req) => {
    api._put(req).then((result) => {
      req.cb && req.cb(result)
      if (result.status === 200) {
        req.msg.success('success')
      } else {
        req.msg.error('error')
      }
    }).catch((err) => {
      console.log(err)
      req.msg.error('error')
    })
  },

  deleteAdminItem: ({commit, state}, req) => {
    api._delete(req).then((result) => {
      req.cb && req.cb(result)
      if (result.status === 200) {
        req.msg.success('success')
      } else {
        req.msg.error('error')
      }
    }).catch((err) => {
      req.msg.error('error')
      console.log(err)
    })
  }
}