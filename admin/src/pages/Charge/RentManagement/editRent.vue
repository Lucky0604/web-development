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
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      userDetail: []

    }
  },
  computed: {

    ...mapGetters({
      get_userById: 'get_userById'
    })
  },
  methods: {
    handleSubmit(id) {
      this.$store.dispatch('editListById', {id}, this.userDetail)
      console.log('-------edit rent view---------')
      console.log(this.userDetail)
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
