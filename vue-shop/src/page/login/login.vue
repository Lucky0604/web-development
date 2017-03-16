<template>
  <div class="loginContainer">
    <head-top :head-title="loginWay ? 'Login': 'Password login'" goBack="true">
      <div class="change_login" slot="changeLogin" @click="changeLoginWay">{{loginWay ? 'Password login': 'Sms login'}}</div>
    </head-top>
    <form v-if="loginWay" class="loginForm">
      <section class="input_container phone_number">
        <input type="text" placeholder="Phone number" name="phone" maxlength="11" v-model="phoneNumber">
        <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
        <button @click.prevent v-show="computedTime">已发送{{computedTime}}s</button>
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
      </section>
    </form>
    <form v-else class="loginForm">
      <section class="input_container">
        <input type="text" placeholder="手机号/邮箱/用户名" v-model.lazy="userAccount">
      </section>
      <section class="input_container">
        <input type="password" v-if="!showPassword" placeholder="Password" v-model="passWord">
        <input type="text" v-else placeholder="Password" v-model="passWord">
        <div class="button_switch" :class="{change_to_text: showPassword}">
          <div class="circel_button" :class="{trans_to_right:showPassword}" @click="changePassWordType"></div>
          <span>abc</span>
          <span>...</span>
        </div>
      </section>
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
        <div class="img_change_img">
          <img v-show="captchaCodeImg" :src="captchaCodeImg">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <p class="login_tips">
      温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
      <a href="https://h5.ele.me/service/agreement/">《用户服务协议》</a>
    </p>
    <div class="login_container" @click="mobileLogin">登录</div>
    <router-link to="/forget" class="to_forget" v-if="!loginWay">忘记密码？</router-link>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
  import headTop from '../../components/header/head'
  import alertTip from '../../components/common/alertTip'
  import {mapState, mapMutations} from 'vuex'
  import {mobileCode, checkExists, sendLogin, getCaptchas, accountLogin} from '../../service/getData'
</script>
