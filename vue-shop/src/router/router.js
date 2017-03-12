/**
 * Created by lucky on 17-3-9.
 *
 * 路由控制
 */
import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')

export default [{
  path: '/',
  component: App,    // 顶层路由，对应index.html
  children: [{
    path: '',
    component: r => require.ensure([], () => r(require('../page/home/home')), 'home')
  }]
}]
