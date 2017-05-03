import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/Index.vue'

Vue.use(Router)

const base = 'CMS - '

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      meta: {title: `${base}Homepage`}
    }
  ]
})

router.beforeEach((to, from, next) => {
  //to and from are Route Object,next() must be called to resolve the hook
  document.title = to.meta.title
  next()
})