/**
 * @Author: lucky
 * @Date:   2017-04-16T13:29:24+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-16T13:31:42+08:00
 */



import * as types from './mutation-types'

export default {
  [types.PROGRESS](state, payload) {
    state.progress = payload
  },
  [types.SHOW_LOGIN_MODAL](state, payload) {
    state.showLoginModal = payload
  },
  [types.SHOW_REGISTER_MODAL](state, payload) {
    state.showRegisterModal = payload
  }
}
