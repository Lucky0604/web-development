/**
 * @Author: lucky
 * @Date:   2017-04-18T16:25:53+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-18T17:28:48+08:00
 */

import * as types from './mutation-types'

export default {
  [types.RECEIVE_CATEGORY_LIST] (state, payload) {
    state.lists = payload
  },
  [types.RECEIVE_CATEGORY_ITEM] (state, payload) {
    state.item = payload
  },
  [types.ADD_CATEGORY_ITEM] (state, payload) {
    state.lists = [payload].concat(state.lists)
  },
  [types.UPDATE_CATEGORY_ITEM] (state, payload) {
    state.item = payload
    const index = state.lists.findIndex(itemIndex => itemIndex._id === payload._id)
    if (index > -1) {
      state.lists.splice(index, 1, payload)
    }
  }
}
