/**
 * @Author: lucky
 * @Date:   2017-04-18T11:55:19+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-18T15:42:03+08:00
 */



import api from '~api'
import * as types from './mutation-types'

export default {
  async ['getAdminList']({commit, rootState: {route: {path}}}, payload) {
    const {data: {data, code}} = await api.get('backend/admin/list', {...payload, cache: true})
    if (data && code === 200) {
      commit(types.RECEIVE_ADMIN_LIST, {
        ...data,
        path,
        page: payload.page
      })
    }
  },
  // 获取单个管理员
  async ['getAdminItem'] ({commit, rootState: {route: {path, params: {id}}}}) {
    const {data: {data, code}} = await api.get('backend/admin/item', {id})
    if (data && code === 200) {
      commit(types.RECEIVE_ADMIN_ITEM, {
        data,
        path
      })
    }
  }
}
