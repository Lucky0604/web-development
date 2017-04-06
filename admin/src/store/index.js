/**
 * @Author: lucky
 * @Date:   2017-04-06T16:31:27+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-06T16:33:26+08:00
 */



import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
// 导入各个模块的初始状态和mutations
import viewState from './modules/viewState'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  // 组合各个模块
  modules: {
    viewState
  }
})

if (module.hot) {
  module.hot.accept([
    './getters'
  ], () => {
    store.hotUpdate({
      getters: require('./getters')
    })
  })
}

export default store
