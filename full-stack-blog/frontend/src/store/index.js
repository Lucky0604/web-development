/**
 * @Author: lucky
 * @Date:   2017-04-16T13:36:36+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-18T17:33:04+08:00
 */



import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'

// backend modules
import backendAdmin from './modules/backend/backendAdmin'
import backendUser from './modules/backend/backendUser'
import backendArticle from './modules/backend/backendArticle'

// global modules
import globalCategory from './modules/global/globalCategory'
import globalComment from './modules/global/globalComment'

// frontend modules
import frontendArticle from './modules/frontend/frontendArticle'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global: {
      namespaced: true,
      ...global,
      modules: {
        category: globalCategory,
        comment: globalComment
      }
    },
    backend: {
      namespaced: true,
      modules: {
        admin: backendAdmin,
        user: backendUser,
        article: backendArticle
      }
    },
    frontend: {
      namespaced: true,
      modules: {
        article: frontendArticle
      }
    }
  }
})
