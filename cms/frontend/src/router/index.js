import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/Index.vue'
import Login from '../views/Login.vue'

Vue.use(Router)

const base = 'CMS - '

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      meta: {title: `${base}Homepage`}
    },
    {
      path: '/login',
      component: Login,
      meta: {title: `${base}Login`}
    }
  ]
})

router.beforeEach((to, from, next) => {
  //to and from are Route Object,next() must be called to resolve the hook
  document.title = to.meta.title
  next()
})