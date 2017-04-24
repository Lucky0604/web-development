import * as types from './mutation-types'

export default {
  [types.RECEIVE_ARTICLE_LIST] (state, {list, hasNext, hasPrev, page, path}) {
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

  [types.RECEIVE_ARTICLE_ITEM] (state, {data, path}) {
    state.item = {
      data,
      path,
      isLoad: true
    }
  },

  [types.RECEIVE_TRENDING] (state, data) {
    state.trending = data.list
  },

  [types.MODIFY_LIKE_STATUS] (state, {id, status}) {
    if (state.item.data._id === id) {
      if (status) {
        state.item.data.like ++
      } else {
        state.item.data.like --
      }
      state.item.data.like_status = status
    }
    const obj = state.lists.data.find(item => item._id === id)
    if (obj) {
      if (status) {
        obj.like ++
      } else {
        obj.like --
      }
      obj.like_status = status
    }
  }
}