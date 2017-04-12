<template>
  <el-form :data="userDetail">
    <el-form-item label="Username">
      <el-input v-model="userDetail.username"></el-input>
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="userDetail.password"></el-input>
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="userDetail.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit(userDetail.id)">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      userDetail: []
    }
  },
  computed: {

    ...mapGetters({
      get_userById: 'get_userById'
    }),
  },
  methods: {
    handleSubmit(id) {
      const userDetail = this.userDetail
      // this.$store.dispatch('editListById', {id}, userDetail)
      this.$store.dispatch('editListById', {id, userDetail})
      console.log('-------edit rent view---------')
      console.log(userDetail)
      this.$router.go('-1')

      /*
      const userDetail = this.userDetail
      axios.get(`http://v2.mashupcloud.cn/EDIT/User/${id}/`, {
        params: {
          appid: 235,
          token: 'IupjzTcqIHzvRiMbjHjjfzYgyKPxvMFw',
          ...userDetail
        }
      })
        .then(function(res) {
          console.log(res)

        })
        this.$router.go('-1')
        */
    }
  },
  watch: {
    get_userById: function() {
      this.$data.userDetail = this.$store.state.viewState.userDetail
    }

  }
}
</script>

<style lang="css">
</style>
