/**
 * @Author: lucky
 * @Date:   2017-04-16T11:52:04+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-16T11:52:53+08:00
 */



import Vue from 'vue'
import App from './app.vue'
import store from './store'
import router from './router'
import {sync} from 'vuex-router-sync'
import * as filters from './filter'

import './assets/css/style.css'
import './assets/less/frontend.less'
import './assets/css/hljs/googlecode.css'
import 'toastr/build/toastr.css'
import 'nprogress/nprogress.css'

sync(store, router)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((route, redirect, next) => {
  store.dispatch('global/gProgress', 0)
  next()
})

const app = new Vue({
  router,
  store,
  render: cb => cb(App)
})

app.$mount('#app')
