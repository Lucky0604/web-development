/**
 * @Author: lucky
 * @Date:   2017-04-16T11:52:04+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-16T11:52:53+08:00
 */



import Vue from 'vue'
import App from './app.vue'

const app = new Vue({
  render: h => h(App)
})

app.$mount('#app')
