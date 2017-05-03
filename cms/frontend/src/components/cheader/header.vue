<template>
  <div id="cheader">
    <el-menu class="el-menu-demo" theme="dark" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="email">{{email}}</el-menu-item>
      <el-submenu index="profile">
        <template slot="title">Profile</template>
        <el-menu-item index="profile">Account</el-menu-item>
        <el-menu-item index="logout">Logout</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import * as api from '../../stores/api'
  export default {
    name: 'cheader',
    computed: {},
    data () {
      return {
        activeIndex: '1',
        email: '',
        routes: []
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if (key === 'logout') {
          const _this = this
          api._post({
            url: 'account/logout',
            data: {}
          }).then((result) => {
            console.log(result)
            if (result.status === 200) {
              localStorage.setItem('email', null)
              localStorage.setItem('user', null)
              _this.$router.push('/login')
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.$router.push(`/${key}`)
        }
        console.log(key, keyPath)
      }
    },

    beforeMount() {
      let email = localStorage.getItem('email')
      this.$set(this, 'email', email)
    }
  }
</script>

<style scoped>
  el-menu {
    float: right;
  }
</style>