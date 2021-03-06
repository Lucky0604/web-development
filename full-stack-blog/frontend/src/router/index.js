/**
 * @Author: lucky
 * @Date:   2017-04-17T10:27:33+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-17T15:53:49+08:00
 */



import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import cookies from 'js-cookie'
import {inBrowser} from '../utils'

import index from '~pages/frontend/frontend-index.vue'
import about from '~pages/frontend/frontend-about.vue'
import article from '~pages/frontend/frontend-article.vue'
import account from '~pages/frontend/frontend-user-account.vue'
import password from '~pages/frontend/frontend-user-password.vue'

Vue.use(Router)
Vue.use(Meta)

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
  var token = cookies.get('user') || !inBrowser
  if (!token) {
    next('/')
  } else {
    next()
  }
}


const router = new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
    {name: 'index', path: '/', component: index},
    {name: 'about', path: '/about', component: about, meta: {scrollToTop: true}},
    {name: 'article', path: '/article/:id', component: article, meta: {scrollToTop: true}},
    {name: 'account', path: '/user/account', component: account, meta: {scrollToTop: true}, beforeEnter: guardRoute},
    {name: 'password', path: '/user/password', component: password, meta: {scrollToTop: true}, beforeEnter: guardRoute},
    {name: 'trending', path: '/trending/:by', component: index},
    {name: 'category', path: '/category/:id', component: index},
    {name: 'search', path: '/search/:key', component: index}
  ]
})

export default router