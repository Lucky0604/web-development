/**
 * @Author: lucky
 * @Date:   2017-04-16T13:22:42+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-16T13:36:07+08:00
 */



import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  loading: false,
  progress: 0,
  showLoginModal: false,
  showRegisterModal: false
}

export default {
  actions,
  state,
  mutations,
  getters
}
