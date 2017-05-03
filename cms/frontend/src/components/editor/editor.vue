<template>
  <div id="cms-editor">
    <div id="editor" style="height: 400px; max-height: 1000px"></div>
  </div>
</template>

<script>
  import utils from '../utils'
  import * as api from '../stores/api'

  export default {
    name: 'cms-editor',
    beforeMount () {
      const _this = this
      api._get({url: 'services/uptoken', data: {}}).then((result) => {
        _this.$store.commit('SET_ITEM', {
          key: 'uptoken',
          val: result.data.uptoken
        })
      }).catch((err) => {
          console.log(err)
          _this.$message.error(err.toString())
        })
    },
    mounted () {
      utils.editor(this)
    }
  }
</script>

<style>
  #cms-editor {
    font: initial;
    margin-top: 10px;
    margin-bottom: 30px;
  }
</style>