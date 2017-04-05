<template>
  <div>
    <head-top></head-top>
    <mainContent></mainContent>
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
