<template>
  <div id="headerNav">
    <div class="headerNav-logo">
      <h3>{{logoTitle}}</h3>
    </div>
    <div class="headerNav-menu">
      <el-menu class="el-menu-demo" theme="dark" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <!-- email -->
        <el-submenu index="1">
          <template slot="title">
            <el-badge class="item" :value="200" :max="99">
              <el-button size="small"></el-button>
            </el-badge>
            <i class="material-icons email"></i>
          </template>
          <el-menu-item index="1-1">邮件A</el-menu-item>
          <el-menu-item index="1-2">邮件B</el-menu-item>
        </el-submenu>
        <!-- messages -->
        <el-submenu index="2">
          <template slot="title">
            <el-badge class="item" :value="200" :max="99">
              <el-button size="small"></el-button>
            </el-badge>
            <i class="material-icons notifications"></i>
          </template>
          <el-menu-item index="2-1">消息A</el-menu-item>
          <el-menu-item index="2-2">消息B</el-menu-item>
          <el-menu-item index="2-3">消息C</el-menu-item>
        </el-submenu>
        <!-- profile -->
        <el-submenu index="3">
          <template slot="title">Lucky</template>
          <el-menu-item index="3-1">个人设置</el-menu-item>
          <el-menu-item index="3-2">修改密码</el-menu-item>
          <el-menu-item index="3-3">安全退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logoTitle: 'Admin',
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {

    }
  }
}
</script>

<style lang="css">
#headerNav {
  position: fixed;
  z-index: 2;
  width: 100%;
}
#headerNav > .headerNav-logo {
  float: left;
  width: 200px;
  height: 60px;
  background-color: #1d8ce0;
}
#headerNav > .headerNav-logo > h3 {
  color: #fff;
}
#headerNav > .headerNav-menu {
  min-width: 760px;
  margin-left: 200px;
  height: 60px;
}

#headerNav > .headerNav-menu > el-menu {
  display: flex;
  justify-content: flex-end;
}
.material-icons {
  font-size: 27px;
  padding-top: 5px;
}
</style>
