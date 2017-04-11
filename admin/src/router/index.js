/**
 * @Author: lucky
 * @Date:   2017-04-06T12:16:35+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-11T13:39:31+08:00
 */





const home = r => require.ensure([], () => r(require('@/pages/home/Home')), 'home')

// rentDetail
const RentQuery = r => require.ensure([], () => r(require('@/pages/Charge/RentManagement/RentQuery')), 'RentQuery')
const addRent = r => require.ensure([], () => r(require('@/pages/Charge/RentManagement/addRent')), 'addRent')
const RentRecord = r => require.ensure([], () => r(require('@/pages/Charge/RentManagement/RentRecord')), 'RentRecord')
const rentDetail = r => require.ensure([], () => r(require('@/pages/Charge/RentManagement/rentDetail')), 'rentDetail')




export default [{

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
          components: {Content: RentQuery}
        }, {
          path: '/RentRecord',
          components: {
            Content: RentRecord
          }
        }, {
          path: '/addRent',
          components: {Content:addRent}
        }, {
          path: '/RentRecord/rentDetail',
          components: {
            Content: rentDetail
          }
        }
      ]


}]
