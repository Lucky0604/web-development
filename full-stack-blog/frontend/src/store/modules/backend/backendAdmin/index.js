/**
 * @Author: lucky
 * @Date:   2017-04-18T11:55:47+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-18T12:19:43+08:00
 */



import getters from './getters'
import actions from './actions'
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
  actions,
  mutations,
  getters
}
