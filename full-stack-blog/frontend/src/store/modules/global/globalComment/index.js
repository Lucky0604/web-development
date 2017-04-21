import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  lists: {
    data: [],
    hasNext: 0,
    page: 1,
    path: ''
  }
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}