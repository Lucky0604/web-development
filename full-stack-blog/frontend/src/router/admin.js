/**
 * @Author: lucky
 * @Date:   2017-04-16T11:56:10+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-18T12:30:42+08:00
 */



import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from 'js-cookie'
import {inBrowser} from '../utils'

import login from '../pages/backend/backend-login.vue'
// --------------admin user------------------
import adminList from '../pages/backend/backend-admin-list.vue'

Vue.use(VueRouter)


const scrollBehavior = to => {
  const position = {}
  if (to.hash) {
    position.selector = to.hash
  }
  if (to.matched.some(mm => mm.meta.scrollToTop)) {
    position.x = 0
    position.y = 0
  }
  return position
}


const guardRoute = (to, from, next) => {
  const token = cookies.get('b_user') || !inBrowser
  if (!token) {
    next('/')
  } else {
    next()
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: [
    {
      name: 'login',
      path: '/backend',
      component: login
    }, {
      name: 'admin_list',
      path: '/backend/admin/list',
      component: adminList,
      meta: {scrollToTop: true},
      beforeEnter: guardRoute
    }
  ]
})

export default router
