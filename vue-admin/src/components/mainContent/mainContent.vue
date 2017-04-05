<template>
  <div>
    <div style="padding: 0; margin: 0;">
      <div style="width: 20%;">
        <side-bar></side-bar>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from '@/components/common/sidebar'
export default {
  name: 'mainContent',
  components: {
    sideBar
  }
}
</script>

<style lang="css">
</style>
