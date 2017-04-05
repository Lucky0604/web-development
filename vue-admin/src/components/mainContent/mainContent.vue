<template>
  <div id="main-container">

      <div class="aside">
        <side-bar></side-bar>
      </div>
      <div class="main">
        <router-view name="ContainerView"></router-view>
      </div>

  </div>
</template>

<script>
import sideBar from 'src/components/common/sidebar'
export default {
  name: 'mainContent',
  components: {
    sideBar
  }
}
</script>

<style lang="css">
#main-container{
  position: fixed;
}
.aside {
  width: 200px;
  float: left;
  height: 100%;
}
.main {
  min-width: 760px;
  height: inherit;
}
</style>
