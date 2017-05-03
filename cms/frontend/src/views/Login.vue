<template>
  <div class="login">
    <div class="logo">
      <img src="http://tva1.sinaimg.cn/crop.0.0.180.180.180/bfc09297jw1e8qgp5bmzyj2050050aa8.jpg" />
    </div>
    <div class="login-wrapper">
      <el-form class="demo-ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
        <el-form-item prop="email" auto-complete="on">
          <el-input v-model="ruleForm.email" placeholder="email"></el-input>
        </el-form-item>
        <el-form-item prop="password" auto-complete="on">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
        </div>
        <p style="font-size: 12px; line-height: 30px; color: #999;">- -</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  import * as api from '../stores/api'
  export default {
    data: function() {
      return {
        ruleForm: {
          email: '123454321@qq.com',
          password: '123454321'
        },
        rules: {
          email: [
            {required: true, message: 'Please enter your email', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please enter your password', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        const _this = this
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            api._post({
              url: 'account/login',
              data: _this.ruleForm
            }).then((result) => {
              console.log(result)
              _this.$router.push('/')
              localStorage.setItem('email', _this.ruleForm.email)
              localStorage.setItem('user', result.data.data._id)
            }).catch((err) => {
              console.log(err)
              _this.$message.error(err.toString())
            })
          } else {
            console.log('error submit!')
            return false
          }
        })
      }
    }
  }
</script>

<style>
  #cheader, #csider {
    display: none;
  }
  .login {
    position: relative;
    width: 100%;
    height: 100%;
    background: #324157;
    z-index: 10;
  }
  .logo {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }
  .login-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>