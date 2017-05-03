<template>
  <div id="cfooter"></div>
</template>

<script>
  export default {
    name: 'cfooter',
    computed: {},
    data() {
      return {}
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style>
  #cfooter {
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>