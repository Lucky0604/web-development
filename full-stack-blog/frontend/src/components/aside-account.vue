<template>
  <div class="card card-me">
    <router-link to="/user/account" active-class="active" class="side-entry"><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>Account</router-link>
    <router-link to="/user/password" active-class="active" class="side-entry"><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>Password</router-link>
    <a href="javascript:;" @click="handleLogout" class="side-entry"><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>Logout</a>
  </div>
</template>

<script>
import api from '~api'
export default {
  name: 'aside::account',
  serverCacheKey: () => {
    return `aside::account`
  },
  methods: {
    async handleLogout() {
      await api.post('frontend/user/logout', {})
      window.location.href = '/'
    }
  }
}
</script>
