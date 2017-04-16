/**
 * @Author: lucky
 * @Date:   2017-04-16T11:56:10+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-16T11:58:10+08:00
 */



import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../pages/backend/backend-login.vue'

const router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/backend',
      component: login
    }
  ]
})
