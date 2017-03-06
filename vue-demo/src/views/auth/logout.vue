<template>
  <div>

  </div>
</template>

<script>
import authService from 'SERVICE/authService';
export default {
  init() {
    authService.logout().then(() => {
      this.$root.userData = null;
      this.$router.replace('/auth/login');
    })
  }
}
</script>
