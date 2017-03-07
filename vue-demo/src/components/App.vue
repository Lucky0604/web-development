<template>
  <div>
    <navbar></navbar>
    <div class="row m-0 p-5">
      <div class="col-md-5 col-sm-3 col-xs-12">
        <sidebar></sidebar>
      </div>
      <div class="col-md-10 col-sm-9 col-xs-12">
        <breadcrumb></breadcrumb>
      </div>
    </div>
  </div>
</template>

<script>
// 根组件类似于AngularJS的$rootScope，同时也负责全局布局
import Navbar from 'COMPONENT/Navbar'
import Sidebar from 'COMPONENT/Sidebar/'
import Breadcrumb from 'COMPONENT/Breadcrumb'

export default {
  // 路由会自动将该组件挂载到#app上
  // el: () => '#app'
  components: {Navbar, Sidebar, Breadcrumb},
  // 注意： 顶级变量必需设置默认值才能引入observer
  data: () => ({
    userData: null
  })
}
</script>

<style>
.p-5 {
  padding: 5px;
}
.p-15{
  padding: 15px;
}
.main-content {
  min-height: 300px;
  background-color: #f7f7f7;
  border-radius: 5px;
}
/* 全局通用的router-view过渡效果 */
.fade-transition {
  transition: opacity .1s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}
</style>
