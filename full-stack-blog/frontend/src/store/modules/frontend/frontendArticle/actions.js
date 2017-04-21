import * as types from './mutation-types'
import api from '~api'

export default {
  async ['getArticleList'] ({commit, state, rootState: {global, route: {fullPath}}}, payload) {
    const path = fullPath
    if (state.lists.data.length > 0 && path === state.lists.path && payload.page === 1) {
      global.progress = 100
      return
    }
    const {data: {data, code}} = await api.get('frontend/article/list', {...payload, cache: true})
    if (data && code === 200) {
      commit(types.RECEIVE_ARTICLE_LIST, {
        ...payload,
        ...data,
        path
      })
    }
  },

  async ['getArticleItem'] ({commit, state, rootState: {route: {path, params: {id}}}}) {
    if (path === state.item.path) {
      global.progress = 100
      return
    }
    const {data: {data, code}} = await api.get('frontend/article/item', {id, markdown: 1, cache: true})
    if (data && code === 200) {
      commit(types.RECEIVE_ARTICLE_ITEM, {
        data,
        path
      })
    }
  },

  async ['getTrending'] ({commit, state}) {
    if (state.trending.length) return
    const {data: {data, code}} = await api.get('frontend/trending', {cache: true})
    if (data && code === 200) {
      commit(types.RECEIVE_TRENDING, data)
    }
  }
}