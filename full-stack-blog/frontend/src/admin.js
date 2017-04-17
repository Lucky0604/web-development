/**
 * @Author: lucky
 * @Date:   2017-04-16T11:51:02+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-17T15:44:00+08:00
 */



import Vue from 'vue'
import App from './admin.vue'
import router from './router/admin'
import store from './store'
import {sync} from 'vuex-router-sync'
import * as filters from './filter'

sync(store, router)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
  router,
  store,
  render: cb => cb(App)
})

app.$mount('#app')
