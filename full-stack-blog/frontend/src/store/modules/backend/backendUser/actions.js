/**
 * @Author: lucky
 * @Date:   2017-04-18T15:21:33+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-18T15:46:30+08:00
 */



import api from '~api'
import * as types from './mutation-types'

export default {
  async ['getUserList'] ({commit, rootState: {route: {path}}}, payload) {
    const {data: {data, code}} = await api.get('backend/user/list', {...payload, cache: true})
    if (data && code === 200) {
      commit(types.RECEIVE_USER_LIST, {
        ...data,
        path,
        page: payload.page
      })
    }
  },
  async ['getUserItem'] ({commit, rootState: {route: {path, params: {id}}}}) {
    const {data: {data, code}} = await api.get('backend/user/item', {id})
    if (data && code === 200) {
      commit(types.RECEIVE_USER_ITEM, {
        data,
        path
      })
    }
  }
}
