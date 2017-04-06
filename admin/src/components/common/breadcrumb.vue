<template>
  <div id="breadcrumb">
    <el-breadcrumb separator="/">
      <span class="el-breadcrumb__item breadcrumb-links" :to="{path: '/'}">
        <span class="el-breadcrumb__item__inner">首页</span>
        <span class="el-breadcrumb__separator">/</span>
      </span>
      <!-- 未添加v-bind:to="跳转地址" -->
      <span class="el-breadcrumb__item breadcrumb-links" v-for="item in breadcrumbLevelArr">
        <span class="el-breadcrumb__item__inner breadcrumb-title">{{item.levelName}}</span>
        <span class="el-breadcrumb__separator">/</span>
      </span>
    </el-breadcrumb>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      breadcrumbLevelArr: []
    }
  },
  mounted: function() {
    this.initBreadcrumbLevel()
  },
  methods: {
    // 目的：初始化面包屑状态
    initBreadcrumbLevel() {
      this.$data.breadcrumbLevelArr = this.$store.state.viewState.breadcrumbLevel
    }
  },
  computed: mapGetters({
    breadcrumbLevel: 'breadcrumbLevel'
  }),
  watch: {
    // 监听: 面包屑状态是否改变
    breadcrumbLevel: function() {
      this.$data.breadcrumbLevelArr = this.$store.state.viewState.breadcrumbLevel
    }
  }
}
</script>

<style lang="css">
#breadcrumb {
  margin-bottom: 9px;
  height: 18px;
}
#breadcrumb .breadcrumb-links {
  font-size: 18px;
}
</style>
