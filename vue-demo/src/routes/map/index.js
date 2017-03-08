// 不同功能模块的路由分离
import authRoutes from './auth'
import msgRoutes from './msg'

export default {
  '*': {
    component: {
      init() {
        window.swal({
          type: 'warning',
          title: '404 NOT FOUND',
          timer: 2000,
          showConfirmButton: false
        })
        history.back()
      },
      template: '<span></span>'
    }
  },

  /**
   * Vue 没有强制刷新操作，此处为hack (使用canReuse可以解决部分问题)
   * 用法1: <a v-link="{path: '/redirect', query: {dest: '/xxx'}}">
   * 用法2: <a v-link="`/redirect?dest=/xxx`">
   * 用法3: this.$router.go('/redirect?dest=/xxx')
   */
  '/redirect': {
    component: {
      init () {
        this.$router.replace({
          path: decodeURIComponent(this.$route.query.dest || '/'),
          force: true
        })
      },
      template: '<span></span>'
    }
  },

  '/': {
    title: '首页',
    icon: 'fa fa-home',
    showInNavbar: {exact: true},
    showInSidebar: true,
    component (resolve) {
      /**
       * 统一使用code-splitting 形式引入路由页面组件
       * build 时可通过AggressiveMergingPlugin / MinChunkSizePlugin 合并 chunks
       */
      require(['VIEW/'], resolve)
    }
  },

    ...msgRoutes,
  ...authRoutes
}
