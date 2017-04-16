/**
 * @Author: lucky
 * @Date:   2017-04-16T13:36:36+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-16T13:41:14+08:00
 */



import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global: {
      namespaced: true,
      ...global,
      modules: {}
    }
  }
})
