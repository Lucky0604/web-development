/**
 * Created by lucky on 17-3-9.
 *
 * 路由控制
 */
import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')
const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')
const foodDetail = r => require.ensure([], () => r(require('../page/shop/children/foodDetail')), 'foodDetail')
const shopSafe = r => require.ensure([], () => r(require('../page/shop/children/children/shopSafe')), 'shopSafe')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const orderDetail = r => require.ensure([], () => r(require('../page/order/children/orderDetail')), 'orderDetail')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const setusername = r => require.ensure([], () => r(require('../page/profile/children/setusername')), 'setusername')
const address = r => require.ensure([], () => r(require('../page/profile/children/children/address')), 'address')
const add = r => require.ensure([], () => r(require('../page/profile/children/children/children/add')), 'add')

export default [{
  path: '/',
  component: App,    // 顶层路由，对应index.html
  children: [{    // 二级路由，对应App.vue
    // 地址为空时跳转home页面
    path: '',
    component: home
  }, {
    // 首页城市列表
    path: '/home',
    component: home
  }, {
    // 当前选择城市页
    path: '/city/:cityid',
    component: city
  }, {
    path: '/login',
    component: login
  }, {
    // 所有商铺列表页
    path: '/msite',
    component: msite
  }, {
    // 特色商铺列表页
    path: '/food',
    component: food
  }, {
    // shop's detail page
    path: '/shop',
    component: shop,
    children: [{
      path: 'shopDetail',     // shop detail page
      component: shopDetail,
      children: [{
        path: 'shopSafe',     // 商铺安全认证页
        component: shopSafe
      }]
    }, {
      path: 'foodDetail',
      component: foodDetail
    }]
  }, {
    // 订单列表页
    path: '/order',
    component: order,
    children: [{
      path: 'orderDetail',     // 订单详情页
      component: orderDetail
    }]
  }, {
    // 搜索页
    path: '/search/:geohash',
    component: search
  }, {
    // 个人信息页
    path: '/profile',
    component: profile,
    children: [{
      path: 'info',    // 个人信息详情页
      component: info,
      children: [{
        path: 'address',
        component: address,    // 编辑地址
        children: [{
          path: 'add',
          component: add,
        }]
      }]
    }, {
      path: 'setusername',
      component: setusername
    }]
  }]
}]
