<template>
  <div class="modal-wrap modal-signin-wrap" :class="show ? 'active': ''">
    <span class="center-helper"></span>
    <div class="modal modal-signup">
      <h2 class="modal-title">Login</h2>
      <a @click="close" href="javascript:;" class="modal-close">
        <i class="icon icon-close-black"></i>
      </a>
      <div class="modal-content">
        <div class="signup-form">
          <div class="input-wrap">
            <input v-model="form.username" type="text" placeholder="Nickname" class="base-input">
            <p class="error-info input-info hidden">At lease 6 bits in length</p>
          </div>
          <div class="input-wrap">
            <input v-model="form.password" type="password" placeholder="Password" class="base-input">
            <p class="error-info input-info hidden">At lease 6 bits in length</p>
          </div>
          <a @click="login" href="javascript:;" class="btn signup-btn btn-yellow">Login</a>
          <a @click="register" href="javascript:;" class="btn signup-btn btn-blue">Regist</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '~api'

export default {
  props: ['show'],
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    close() {
      this.$store.commit('global/SHOW_LOGIN_MODAL', false)
    },
    register() {
      this.$store.commit('global/SHOW_LOGIN_MODAL', false)
      this.$store.commit('global/SHOW_REGISTER_MODAL', true)
    },
    async login() {
      if (!this.form.username || !this.form.password) {
        this.$store.dispatch('global/showMsg', 'Please complete the form!')
        return
      }
      const {data: {message, code}} = await api.post('frontend/user/login', this.form)
      if (code === 200) {
        this.$store.dispatch('global/showMsg', {
          type: 'success',
          content: message
        })
        this.$router.go(0)
      }
    }
  }
}
</script>