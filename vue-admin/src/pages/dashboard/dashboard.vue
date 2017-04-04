<template>
  <div>
    <head-top></head-top>
    <main-content></main-content>
  </div>
</template>

<script>
import headTop from '@/components/header/head'
import mainContent from '@/components/mainContent/mainContent'
export default {
  name: 'dashboard',
  components: {
    headTop, mainContent
  }
}
</script>

<style>
</style>
