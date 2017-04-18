/**
 * @Author: lucky
 * @Date:   2017-04-18T16:25:43+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-18T16:30:46+08:00
 */



import api from '~api'
import * as types from './mutation-types'

export default {
  async ['getCategoryList'] ({commit, state}, payload) {
    if (state.lists.length) return
    const {data: {data, code}} = await api.get('backend/category/list', {...payload, cache: true})
    if (data && code === 200) {
      commit(types.RECEIVE_CATEGORY_LIST, data.list)
    }
  },
  async ['getCategoryItem'] ({commit, rootState: {route: {params: {id}}}}) {
    const {data: {data, code}} = await api.get('backend/category/item', {id})
    if (data && code === 200) {
      commit(types.RECEIVE_CATEGORY_ITEM, data)
    }
  }
}
