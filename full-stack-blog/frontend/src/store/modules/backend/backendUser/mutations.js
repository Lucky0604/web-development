/**
 * @Author: lucky
 * @Date:   2017-04-18T15:21:54+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-18T15:37:36+08:00
 */


import * as types from './mutation-types'

export default {
  [types.RECEIVE_USER_LIST] (state, {list, path, hasNext, hasPrev, page}) {
    if (page === 1) {
      list = [].concat(list)
    } else {
      list = state.lists.data.concat(list)
    }
    page ++
    state.lists = {
      data: list,
      hasNext,
      hasPrev,
      page,
      path
    }
  },
  [types.RECEIVE_USER_ITEM] (state, payload) {
    state.item = payload
  },
  [types.UPDATE_USER_ITEM] (state, payload) {
    state.item.data = payload
    const index = state.lists.data.findIndex(itemIndex => itemIndex._id === payload._id)
    if (index > -1) {
      state.lists.data.splice(index, 1, payload)
    }
  },
  [types.DELETE_USER] (state, id) {
    const obj = state.lists.data.find(itemIndex => itemIndex._id === id)
    if (obj) obj.is_delete = 1
  },
  [types.RECOVER_USER] (state, id) {
    const obj = state.lists.data.find(itemIndex => itemIndex._id === id)
    if (obj) obj.is_delete = 0
  }
}
