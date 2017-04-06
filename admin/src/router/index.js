/**
 * @Author: lucky
 * @Date:   2017-04-06T12:16:35+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-06T18:14:49+08:00
 */



import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'

// 收费管理
import RentQuery from '@/pages/Charge/RentManagement/RentQuery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          components: {
            ContainerView: RentQuery
          }
        },
        // 收费管理
        {
          path: '/RentQuery',
          components: {
            ContainerView: RentQuery
          }
        }
      ]
    }
  ]
})
