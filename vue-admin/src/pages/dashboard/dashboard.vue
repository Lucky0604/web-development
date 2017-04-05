<template>
  <div>
    <head-top></head-top>
    <mainContent></mainContent>
  </div>
</template>

<script>
import headTop from 'src/components/header/head'
import mainContent from 'src/components/mainContent/mainContent'
export default {
  name: 'dashboard',
  components: {
    headTop, mainContent
  }
}
</script>

<style>
</style>
