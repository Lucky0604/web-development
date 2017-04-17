<template>
  <nav class="global-nav">
    <div class="wrap clearfix" v-if="backend">
      <div class="left-part">
        <a href="/" exact class="logo-link">
          <i class="icon icon-nav-logo"></i>
          <span class="hidden">SoftTeam</span>
        </a>
        <div class="main-nav">
          <a href="/" class="nav-link"><i class="icon icon-nav-home"></i><span class="text">Homepage</span></a>
          <a href="/trending/visit" class="nav-link"><i class="icon icon-nav-explore"></i><span class="text">Trending</span></a>
          <a href="/about" class="nav-link"><i class="icon icon-nav-features"></i><span class="text">About</span></a>
        </div>
      </div>
    </div>
    <div class="wrap clearfix" v-else>
      <div class="left-part">
        <router-link to="/" active-class="current" exact class="logo-link"><i class="icon icon-nav-logo"></i><span class="hidden">Softteam</span></router-link>
        <div class="main-nav">
          <router-link to="/" active-class="current" exact class="nav-link"><i class="icon icon-nav-home"></i><span class="hidden">Homepage</span></router-link>
          <router-link to="/trending/visit" active-class="current" class="nav-link"><i class="icon icon-nav-explore"></i><span class="text">Trending</span></router-link>
          <router-link to="/about" active-class="current" class="nav-link"><i class="icon icon-nav-features"></i><span class="text">About</span></router-link>
        </div>
      </div>
      <div class="right-part">
        <span class="nav-search"><i class="icon icon-search-white"></i><input @keyup.enter="search($event)" placeholder="Remember click Enter" class="nav-search-input"></span>
        <span v-if="isLogin" class="nav-me"><router-link to="/user/account" class="nav-me-link"><img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" alt="" class="nav-avatar-img"></router-link></span>
        <span v-else class="nav-me"><a href="javascript:;" @click="login" class="nav-me-link"><img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" alt="" class="nav-avatar-img"></a></span>
      </div>
    </div>
  </nav>
</template>

<script>
import cookies from 'js-cookie'
export default {
  props: ['backend'],
  data() {
    return {
      isLogin: cookies.get('user')
    }
  },
  methods: {
    login() {
      //
    },
    search(e) {
      var qs = e.target.value
      if (qs === '') {
        return false
      }
      // this.$router.replace('')
    }
  }
}
</script>
