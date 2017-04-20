/**
 * @Author: lucky
 * @Date:   2017-04-16T11:56:10+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-19T15:51:44+08:00
 */



import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from 'js-cookie'
import {inBrowser} from '../utils'

import login from '../pages/backend/backend-login.vue'
// --------------admin user------------------
import adminList from '../pages/backend/backend-admin-list.vue'
import adminModify from '../pages/backend/backend-admin-modify.vue'

// --------------- user ------------------
import userList from '../pages/backend/backend-user-list.vue'
import userModify from '../pages/backend/backend-user-modify.vue'

// ----------------category------------------
import categoryAdd from '../pages/backend/backend-category-add.vue'
import categoryModify from '../pages/backend/backend-category-modify.vue'
import categoryList from '../pages/backend/backend-category-list.vue'

// ----------------article------------------
import articleAdd from '../pages/backend/backend-article-add.vue'

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
    }, {
      name: 'admin_modify',
      path: '/backend/admin/modifyItem/:id',
      component: adminModify,
      meta: {scrollToTop: true},
      beforeEnter: guardRoute
    }, {
      name: 'user_list',
      path: '/backend/user/list',
      component: userList,
      meta: {scrollToTop: true},
      beforeEnter: guardRoute
    }, {
      name: 'user_modify',
      path: '/backend/user/modifyItem',
      component: userModify,
      meta: {scrollToTop: true},
      beforeEnter: guardRoute
    }, {
      name: 'category_add',
      path: '/backend/category/add',
      component: categoryAdd,
      meta: {scrollToTop: true},
      beforeEnter: guardRoute
    }, {
      name: 'category_modify',
      path: '/backend/category/modifyItem/:id',
      component: categoryModify,
      meta: {scrollToTop: true},
      beforeEnter: guardRoute
    }, {
      name: 'category_list',
      path: '/backend/category/list',
      component: categoryList,
      meta: {scrollToTop: true},
      beforeEnter: guardRoute
    }, {
      name: 'article_add',
      path: '/backend/article/add',
      component: articleAdd,
      meta: {scrollToTop: true},
      beforeEnter: guardRoute
    }
  ]
})

export default router
