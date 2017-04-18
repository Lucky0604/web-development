/**
 * @Author: lucky
 * @Date:   2017-04-18T15:21:59+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-18T15:39:18+08:00
 */



import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  lists: {
    hasNext: false,
    hasPrev: false,
    path: '',
    page: 1,
    data: []
  },
  item: {
    data: {},
    path: ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
