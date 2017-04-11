/**
 * @Author: lucky
 * @Date:   2017-04-06T12:16:35+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-11T10:45:50+08:00
 */



// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import store from './store/'
import routes from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  strict: process.env.NODE_ENV !== 'production'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
