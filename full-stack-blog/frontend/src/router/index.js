/**
 * @Author: lucky
 * @Date:   2017-04-17T10:27:33+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-17T15:53:49+08:00
 */



import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})

export default router
