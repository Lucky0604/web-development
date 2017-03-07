import Vue from 'vue'
import VueRouter from 'vue-router'
import routesMap from './map/'       // 路由映射
import hooks from './hooks/'      // 路由钩子

Vue.use(VueRouter)

const router = new VueRouter({
  // root: null,
  // hashbang: false,
  // history: true,
  // saveScrollPosition: true,
  // transitionOnLoad: true,
  // linkActiveClass: '',
  suppressTransitionError: __PROD__       // 生产环境下不抛出异常
})

router.map(routesMap)
router.alias({'/msg': '/msg/list'})

hooks(router)

/**
 * 调用router.start(App, '#app')后，根组件实例就会暴露到router.app
 * 组件内部可通过this.$root访问，外部则通过router.app访问
 */
export default router
