<template>
  <div id="csider">
    <el-row class="tac">
      <router-link to="/">
        img src="http://ohusmobs2.bkt.clouddn.com/20170323149024023196292.png">
      </router-link>
      <el-col>
        <el-menu class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose" theme="dark">
          <el-menu-item index="/">
            <i class="el-icon-menu"></i> | Dashboard
          </el-menu-item>
          <el-menu-item index="/users">
            <i class="el-icon-setting"></i> | User Management
          </el-menu-item>
          <el-submenu index="/1">
            <template slot="title">
              <i class="el-icon-document"></i> | Content Management
            </template>
            <el-menu-item index="/timeline">Timeline</el-menu-item>
            <el-menu-item-group title="Article">
              <el-menu-item index="/articles">Articles Management</el-menu-item>
              <el-menu-item index="/addArticle">Add Article</el-menu-item>
              <el-menu-item index="/comments/article">Comment Management</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Vote">
              <el-menu-item index="/votes">Votes Management</el-menu-item>
              <el-menu-item index="/addVote">Add Vote</el-menu-item>
              <el-menu-item index="/comments/vote">Comment Management</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/2">
            <template slot="title">
              <i class="el-icon-more"></i> | About CMS
            </template>
            <el-menu-item index="/about">About</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'csider',
    computed: {},
    data () {
      return {
        routes: []
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style scoped>
  img {
    width: calc(100% - 40px);
    margin: 20px;
  }
  #csider {
    text-align: left;
  }
  * {
    text-align: left;
  }
</style>