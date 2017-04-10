/**
 * @Author: lucky
 * @Date:   2017-04-06T12:16:35+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-10T23:53:43+08:00
 */



import Vue from 'vue'
import Router from 'vue-router'

const home = r => require.ensure([], () => r(require('@/pages/home/Home')), 'home')
const RentQuery = r => require.ensure([], () => r(require('@/pages/Charge/RentManagement/RentQuery')), 'RentQuery')
/*
const home = r => require.ensure([], () => r(require('@/pages/home/Home')), 'home')
const home = r => require.ensure([], () => r(require('@/pages/home/Home')), 'home')
const home = r => require.ensure([], () => r(require('@/pages/home/Home')), 'home')
*/
// 收费管理
import RentRecord from '@/pages/Charge/RentManagement/RentRecord'
import addRent from '@/pages/Charge/RentManagement/addRent'
import rentDetail from '@/pages/Charge/RentManagement/rentDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/',
          component: RentQuery
        },
        // 收费管理
        {
          path: '/RentQuery',
          component: RentQuery
        }, {
          path: '/RentRecord',
          component: RentRecord,
          children: [{
            path: 'rentDetail',
            component: rentDetail
          }]
        }, {
          path: '/addRent',
          components: addRent
        }
      ]
    }
  ]
})
