import * as types from './mutation-types'

export default {
  [types.RECEIVE_COMMENT_LIST] (state, {list, hasNext, hasPrev, page, path}) {
    if (page === 1) {
      list = [].concat(list)
    } else {
      list = state.lists.data.concat(list)
    }
    state.lists = {
      data: list,
      hasNext,
      hasPrev,
      page,
      path
    }
  },

  [types.ADD_COMMENT_ITEM] (state, data) {
    state.lists.data = [data].concat(state.lists.data)
  },

  [types.DELETE_COMMENT] (state, id) {
    const obj = state.lists.data.find(itemIndex => itemIndex._id === id)
    obj.is_delete = 1
  },

  [types.RECOVER_COMMENT] (state, id) {
    const obj = state.lists.data.find(itemIndex => itemIndex._id === id)
    obj.is_delete = 0
  }
}