<template>
  <div id="sidebar">
    <el-menu class="el-menu-vertical-demo" theme="dark" :unique-opened="true" default-active="2" @open="handleOpen" @close="handleClose">
      <el-submenu v-for="(item, key) in dataSidebarList" :index="item.titleName" :key="key">
        <template slot="title">
          <i class="material-icons">{{item.iconClass}}</i>
          <span>{{item.titleName}}</span>
        </template>
        <el-submenu v-for="(itemMiddleSubMenu, keyMiddleSubMenu) in item.middleSubMenu" :index="itemMiddleSubMenu.titleName" :key="keyMiddleSubMenu">
          <template slot="title">{{itemMiddleSubMenu.titleName}}</template>
          <el-menu-item v-for="(itemBottom, keyBottom) in itemMiddleSubMenu.bottom" :index="itemBottom.titleName" :key="keyBottom" @click="clickSidebar(itemBottom.breadcrumb, itemBottom.url)">{{itemBottom.titleName}}</el-menu-item>
        </el-submenu>
        <el-menu-item-group v-for="(itemMiddleLink, keyMiddleLink) in item.middleLink" :index="itemMiddleLink.titleName" :key="keyMiddleLink">
          <el-menu-item :index="itemMiddleLink.titleName" @click="clickSidebar(itemMiddleLink.breadcrumb, itemMiddleLink.url)">{{itemMiddleLink.titleName}}</el-menu-item>

        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
      dataSidebarList: []
    }
  },
  methods: {
    handleOpen(key, keyPath) {

    },
    handleClose(key, keyPath) {

    },
    // 目的：跳转url，渲染相应的路由组件
    toPageUrl(linkUrl) {
      location.href = '#/' + linkUrl
    },
    // 目的：处理动态导航点击事件(更改面包屑状态+跳转url)
    clickSidebar(breadcrumbArr, toUrl) {
      // events 1: 更新面包屑状态
      let argsLength = breadcrumbArr.length
      let argumentsArr = []    // 存放参数对象(作为参数：触发actions事件)
      for (let i = 0; i < argsLength; i ++) {
        let argumentsObj = new Object
        argumentsObj['levelName'] = breadcrumbArr[i]
        argumentsArr.push(argumentsObj)
      }
      // 派发任务(将argumentsObj对象发给actions)
      this.$store.dispatch({
        type: 'setBreadcrumbLevel',
        attrObj: argumentsArr
      })
      // events 2: 跳转url, 渲染相应的路由组件
      this.toPageUrl(toUrl)
    }
  },
  computed: mapGetters({
    get_sideBarList: 'get_sideBarList'
  }),
  watch: {
    // 监听：返回用户侧导航栏列表
    get_sideBarList: function() {
      this.$data.dataSidebarList = this.$store.state.viewState.sideBarList
    }
  }
}
</script>

<style lang="css">
#sidebar {
  height: inherit;
  background-color: #324157;
}
#sidebar > el-menu {
  height: 90%;
}
.material-icons {
  vertical-align: middle;
}
</style>
