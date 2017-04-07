<template>
  <!--
  <el-table :data="userList" border style="width: 100%">
    <el-table-column prop="username" label="日期" width="180"></el-table-column>
    <el-table-column prop="password" label="姓名" width="180"></el-table-column>
    <el-table-column prop="email" label="地址"></el-table-column>
  </el-table>
-->
<div>
  <ul>
    <li>{{userList}}</li>
  </ul>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      userList: []
    }
  },
  computed: mapGetters({
    get_UserList: 'get_UserList'
  }),
  watch: {
    get_UserList: function() {
      this.$data.userList = this.$store.state.viewState.userList
    }
  }
}
</script>

<style lang="css">
</style>
