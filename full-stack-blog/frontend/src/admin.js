/**
 * @Author: lucky
 * @Date:   2017-04-16T11:51:02+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-17T15:58:42+08:00
 */



import Vue from 'vue'
import App from './admin.vue'
import router from './router/admin'
import store from './store'
import {sync} from 'vuex-router-sync'
import * as filters from './filter'

import './assets/css/style.css'
import './assets/less/backend.less'
import './assets/css/hljs/googlecode.css'
import 'toastr/build/toastr.css'
import 'nprogress/nprogress.css'

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
