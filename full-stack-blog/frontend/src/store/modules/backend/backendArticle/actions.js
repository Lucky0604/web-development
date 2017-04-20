import api from '~api'
import * as types from './mutation-types.js'

export default {
  async ['getArticleList'] ({commit, rootState: {route: {path, params: {page}}}}, payload) {
    const {data: {data, code}} = await api.get('backend/article/list', payload)
    if (data && code === 200) {
      commit(types.RECEIVE_ARTICLE_LIST, {
        ...data,
        path,
        page: payload.page
      })
    }
  },

  async ['getArticleItem'] ({rootState: {route: {params: {id}}}}) {
    const {data: {data, code}} = await api.get('backend/article/item', {id})
    if (data && code === 200) {
      return data
    }
  },

  async ['deleteArticle'] ({commit}, payload) {
    const {data: {code}} = await api.get('backend/article/delete', payload)
    if (code === 200) {
      commit(types.DELETE_ARTICLE, payload.id)
    }
  },

  async ['recoverArticle'] ({commit}, payload) {
    const {data: {code}} = await api.get('backend/article/recover', payload)
    if (code === 200) {
      commit(types.RECOVER_ARTICLE, payload.id)
    }
  }
}

