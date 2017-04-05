/**
 * @Author: lucky
 * @Date:   2017-04-05T10:24:05+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-05T12:08:50+08:00
 */



// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
