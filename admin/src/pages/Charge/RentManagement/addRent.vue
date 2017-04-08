<template>
  <el-form :model="userForm">
    <el-form-item label="Username">
      <el-input v-model="userForm.username"></el-input>
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="userForm.password"></el-input>
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="userForm.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {postUserData} from '@/store/modules/viewState/api.js'
export default {
  data () {
    return {
      userForm: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    onSubmit() {
      postUserData(this.userForm)
      this.$router.push('/RentRecord')
    }
  }
}
</script>

<style lang="css">
</style>
