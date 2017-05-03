// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import hljs from 'highlight.js'
import VueDND from 'awe-dnd'
import App from './App'
import {router} from './router'
import {store} from './stores'
import Element from 'element-ui'
import csider from './components/csider/sider.vue'
import cheader from './components/cheader/header.vue'
import cfooter from './components/cfooter/footer.vue'


// Vue.config.productionTip = false
Vue.use(VueDND)
Vue.use(Element)

Vue.component(csider.name, csider)
Vue.component(cheader.name, cheader)
Vue.component(cfooter.name, cfooter)


Vue.directive('highlight.js', el => {
  let blocks = el.querySelectorAll('pre')
  Array.prototype.forEach.call(blocks, hljs.highlightBlock)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
