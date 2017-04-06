/**
 * @Author: lucky
 * @Date:   2017-04-06T12:16:35+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-06T12:43:15+08:00
 */



import Vue from 'vue'
import Router from 'vue-router'
import headTop from '@/components/header/head'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: headTop
    }
  ]
})
