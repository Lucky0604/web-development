import api from '~api'
import * as types from './mutation-types'

export default {
  async ['getCommentList'] ({commit, rootState: {route: {path, params: {id}}}}, payload) {
    const {data: {data, code}} = await api.get('frontend/comment/list', {...payload, id, cache: true})
    if (data && code === 200) {
      commit(types.RECEIVE_COMMENT_LIST, {
        ...payload,
        ...data,
        path
      })
    }
  }
}