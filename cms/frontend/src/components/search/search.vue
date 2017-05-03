<template>
  <div id="cms-search">
    <el-input placeholder="Please input things you wanna search" icon="search" v-model="searchVal" :on-icon-click="handleSearch"></el-input>
  </div>
</template>

<script>
  import * as api from '../stores/api'
  export default {
    name: 'cms-search',
    data () {
      return {
        searchVal: ''
      }
    },
    props: ['model', 'searchKey', 'start'],
    methods: {
      handleSearch() {
        const _this = this
        api._get({
          url: 'search',
          data: {
            model: _this.model,
            searchKey: _this.searchKey,
            searchVal: _this.searchVal,
            start: _this.start || 0
          }
        }).then((result) => {
          console.log(result)
          if (result.status === 200) {
            _this.$store.commit('SET_ITEM', {
              key: 'adminItems',
              val: result.data.data
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  el-input {
    width: 60%;
    float: left;
  }
</style>