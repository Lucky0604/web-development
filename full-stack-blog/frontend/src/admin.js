/**
 * @Author: lucky
 * @Date:   2017-04-16T11:51:02+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-16T12:17:32+08:00
 */



import Vue from 'vue'
import App from './admin.vue'
import router from './router/admin'

const app = new Vue({
  router,
  render: cb => cb(App)
})

app.$mount('#app')
