
import * as types from './mutation-types.js'

export default {
  [types.RECEIVE_ARTICLE_LIST] (state, {list, path, hasNext, hasPrev, page}) {
    if (page === 1) {
      list = [].concat(list)
    } else {
      lsit = state.lists.data.concat(list)
    }
    state.lists = {
      data: list,
      path,
      hasNext,
      hasPrev,
      page
    }
  },

  [types.ADD_ARTICLE_ITEM] (state, payload) {
    if (state.lists.path) {
      state.lists.data = [payload].concat(state.lists.data)
    }
  },

  [types.UPDATE_ARTICLE_ITEM] (state, data) {
    const index = state.lists.data.findIndex(itemIndex => itemIndex._id === data._id)
    if (index > -1) {
      state.lists.data.splice(index, 1, data)
    }
  },

  [types.DELETE_ARTICLE] (state, id) {
    const obj = state.lists.data.find(itemIndex => itemIndex._id === id)
    if (obj) obj.is_delete = 1
  },

  [types.RECOVER_ARTICLE] (state, id) {
    const obj = state.lists.data.find(itemIndex => itemIndex._id === id)
    if (obj) obj.is_delete = 0
  }
}

