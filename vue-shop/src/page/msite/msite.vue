<template>
  <div>
    <head-top signin-up="msite">
      <router-link :to="'/search/' + geohash" class="link_search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="9" cy="9" r="8" stroke="rbg(255,255,255)" stroke-width="2" fill="none"/>
          <line x1="15" y1="15" x2="20" y2="20" style="stoke:rgb(255,255,255); stroke-width: 2" />
        </svg>
      </router-link>
      <router-link class="msite_title" to="/home" slot="msite-title">
        <span class="title-text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>
    <nav class="msite_nav">
      <div class="swiper-container">

        <div class="swiper-wrapper">
          <div class="swiper-slide foot_types_container" v-for="(item, index) in foodTypes" :key="index">
            <router-link :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food" v-if="foodItem.title !== '预定早餐'">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url" alt="">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
            <a href="https://zaocan.ele.me" class="link_to_food" v-else>
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url" alt="">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </a>
          </div>
        </div>

        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <div class="shop_list_container">
      <header class="shop_header">
        <svg class="shop_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop_header_title">附近商家</span>
      </header>
      <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {imgBaseUrl} from 'src/config/env'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
  import shopList from 'src/components/common/shoplist'
  import {msiteAddress, msiteFoodTyps, msiteShopList} from 'src/service/getData'
  import 'src/plugins/swiper.min.js'
  import 'src/style/swiper.min.css'

  export default {
    data () {
      return {
        geohash: '',     // city页面传过来的地址geohash
      }
    }

  }
</script>
