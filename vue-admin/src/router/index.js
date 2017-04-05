/**
 * @Author: lucky
 * @Date:   2017-04-04T23:02:10+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-05T23:26:17+08:00
 */



import Vue from 'vue'
import Router from 'vue-router'
import dashboard from 'src/pages/dashboard/dashboard'
import system from 'src/pages/system/system'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: dashboard,
      children: [{
        path: '/',
        components: {
          ContainerView: system
        }
      }]
    }
  ]
})
