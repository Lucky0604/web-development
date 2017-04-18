/**
 * @Author: lucky
 * @Date:   2017-04-18T16:26:20+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-18T17:32:03+08:00
 */



import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  lists: [],
  item: {}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
