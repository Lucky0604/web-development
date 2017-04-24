<template>
  <div class="modal-wrap modal-signup-wrap" :class="show ? 'active': ''">
    <span class="center-helper"></span>
    <div class="modal modal-signup">
      <h2 class="modal-title">Regist</h2>
      <a @click="close" href="javascript:;" class="modal-close">
        <i class="icon icon-close-black"></i>
      </a>
      <div class="modal-content">
        <div class="signup-form">
          <div class="input-wrap">
            <input v-model="form.username" type="text" placeholder="Nickname" class="base-input">
            <p class="error-info input-info hidden">At least 6 bits in length</p>
          </div>
          <div class="input-wrap">
            <input v-model="form.email" type="text" placeholder="Email" class="base-input">
            <p class="error-info input-info hidden">At least 6 bits in length</p>
          </div>
          <div class="input-wrap">
            <input v-model="form.password" type="password" placeholder="Password" class="base-input">
            <p class="error-info input-info hidden">At least 6 bits in length</p>
          </div>
          <div class="input-wrap">
            <input v-model="form.re_password" type="password" placeholder="Repeat Password" class="base-input">
            <p class="error-info input-info hidden">At least 6 bits in length</p>
          </div>
          <a @click="register" href="javascript:;" class="btn signup-btn btn-yellow">Regist</a>
          <a @click="login" href="javascript:;" class="btn signup-btn btn-blue">Login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '~api'
import {strlen} from '~utils'

export default {
  props: ['show'],
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        re_password: ''
      }
    }
  },
  methods: {
    close() {
      this.$store.commit('global/SHOW_REGISTER_MODAL', false)
    },
    login() {
      this.$store.commit('global/SHOW_LOGIN_MODAL', true)
      this.$store.commit('global/SHOW_REGISTER_MODAL', false)
    },
    async register() {
      if (!this.form.username || !this.form.password || !this.form.email) {
        this.$store.dispatch('global/showMsg', 'Please complete the form!')
        return
      } else if (strlen(this.form.username) < 4) {
        this.$store.dispatch('global/showMsg', 'The username should between 2 string and 4 characters')
        return
      } else if (strlen(this.form.password) < 8) {
        this.$store.dispatch('global/showMsg', 'The password should be at least 8 bits in length!')
        return
      } else if (this.form.password !== this.form.re_password) {
        this.$store.dispatch('global/showMsg', 'The password and Re-password are not the same!')
        return
      }
      const {data: {message, code}} = await api.post('frontend/user/add', this.form)
      if (code === 200) {
        this.$store.dispatch('global/showMsg', {
          type: 'success',
          content: message
        })
        this.login()
      }
    }
  }
}
</script>