<template>
  <div id="mainContent">
    <div class="main-sidebar">
      <side-bar></side-bar>
    </div>
    <div class="main-container">
      <bread-crumb></bread-crumb>
      <router-view name="ContainerView"></router-view>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import sideBar from '@/components/common/sidebar'
import breadCrumb from '@/components/common/breadcrumb'
export default {
  mounted: function() {
    this.getSideBarList()
  },
  methods: {
    // 目的：触发一个交互，从后台获取导航列表
    getSideBarList() {
      this.$store.dispatch({
        type: 'getSideBarList'
      })
    }
  },
  components: {
    sideBar, breadCrumb
  }
}
</script>

<style lang="css">
#mainContent {
  position: fixed;
  width: 100%;
  height: inherit;
  margin-top: 60px;
}
#mainContent > .main-sidebar {
  float: left;
  width: 200px;
  height: 100%;
  background: #1d8ce0;
}
#mainContent > .main-container {
  padding: 18px;
  margin-left: 200px;
  min-width: 760px;
  height: inherit;
  background-color: #f1f2f7;
}
</style>
