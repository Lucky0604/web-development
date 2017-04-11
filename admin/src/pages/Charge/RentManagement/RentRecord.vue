<template>
<div>


  <el-table :data="userListData" border style="width: 100%">
    <el-table-column label="日期" width="180" prop="username"></el-table-column>
    <el-table-column label="姓名" width="180" prop="password"></el-table-column>
    <el-table-column label="地址" prop="email"></el-table-column>
    <el-table-column label="操作" fixed="right" prop="id">
      <template scope="scope">
        <el-button type="primary" size="small" width="100">
          修改
        </el-button>
        <el-button size="small" width="100" @click="handleClick(scope.row.id)">查看</el-button>
        <el-button>删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <router-link to="/addRent">添加用户</router-link>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      userListData: [],
      id: null
    }
  },
  created() {
  },
  mounted: function(){
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.$store.dispatch({
        type: 'getList'
      })
    },
    handleClick(id) {
      /*
      axios.get(`http://v2.mashupcloud.cn/GET/User/${id}/`, {
        params: {
          appid: 235,
          token: 'IupjzTcqIHzvRiMbjHjjfzYgyKPxvMFw'
        }
      })
      .then(function(res) {
        console.log('------handleClick------')
        console.log(res.data)
      })
      */
     this.$store.dispatch('getListById', {id: id})
     this.$router.push('RentRecord/rentDetail')
    }
  },
  computed: {
    ...mapGetters({
      get_userList: 'get_userList'
    })
  },
  watch: {
    get_userList: function() {
      this.$data.userListData = this.$store.state.viewState.userList
    }
  }
}
</script>

<style lang="css">
</style>
