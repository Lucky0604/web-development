import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
  lists: {
    data: [],
    path: '',
    hasNext: 0,
    hasPrev: 0,
    page: 1
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

