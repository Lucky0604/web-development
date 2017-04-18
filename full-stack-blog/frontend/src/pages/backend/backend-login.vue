<template>
  <div class="main wrap clearfix">
    <div class="home-feeds cards-wrap">
      <div class="settings-main card">
        <div class="settings-main-content">
          <a-input title="Nickname">
            <input type="text" name="username" v-model="form.username" placeholder="Nickname" class="base-input">
            <span class="input-info error">Please input your nickname</span>
          </a-input>
          <a-input title="Password">
            <input type="password" name="password" v-model="form.password" placeholder="Password" class="base-input">
            <span class="input-info error">Please input password</span>
          </a-input>
        </div>
        <div class="settings-footer clearfix">
          <a href="javascript:;" @click="login" class="btn btn-yellow">Login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="babel">

import cookies from 'js-cookie'
import api from '~api'
import aInput from '~components/_input.vue'
export default {
  name: 'login',
  beforeRouteEnter (to, from, next) {
    if (cookies.get('b_user')) {
      next('/backend/article/list')
    } else {
      next()
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    aInput
  },
  methods: {
    async login() {
      if (!this.form.username || !this.form.password) {
        this.$store.dispatch('global/showMsg', '请输入用户名和密码')
        return
      }

      const {data: {data, code}} = await api.post('backend/admin/login', this.form)
      if (data && code === 200) {
        this.$router.replace('/backend/article/list')
      }
    }
  }
}

</script>
