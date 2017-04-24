import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  lists: {
    data: [],
    hasNext: 0,
    page: 1,
    path: ''
  },
  item: {
    data: {},
    path: '',
    isLoad: false
  },
  trending: []
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}