import actions from './actions'
import mutations from './mutations'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
  adminItems: [],
  uptoken: '',
  total: {},
  editor: {},
  isMarkdownEditor: false
}

export const store = new Vuex.Store({
  state,
  actions,
  mutations
})

