<template>

  <el-table :data="userListData" border style="width: 100%">
    <el-table-column prop="username" label="日期" width="180"></el-table-column>
    <el-table-column prop="password" label="姓名" width="180"></el-table-column>
    <el-table-column prop="email" label="地址"></el-table-column>
  </el-table>


</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
      userListData: []
    }
  },
  mounted: function(){
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.$store.dispatch({
        type: 'getList'
      })
    }
  },
  computed: mapGetters({
    get_userList: 'get_userList'
  }),
  watch: {
    get_userList: function() {
      this.$data.userListData = this.$store.state.viewState.userList
    }
  }
}
</script>

<style lang="css">
</style>
