/**
 * @Author: lucky
 * @Date:   2017-04-06T12:16:35+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-06T15:44:39+08:00
 */



import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})
