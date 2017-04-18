/**
 * @Author: lucky
 * @Date:   2017-04-16T13:36:36+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-18T12:21:37+08:00
 */



import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'

// backend modules
import backendAdmin from './modules/backend/backendAdmin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global: {
      namespaced: true,
      ...global,
      modules: {}
    },
    backend: {
      namespaced: true,
      modules: {
        admin: backendAdmin
      }
    }
  }
})
