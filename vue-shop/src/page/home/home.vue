<template>
  <div>

    <head-top signin-up="home">
      <span slot="logo" class="head-logo" @click="reload">中瑞商城</span>
    </head-top>

    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityid" class="guess_city">
        <span>{{guessCity}}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </nav>

    <section id="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul class="citylistul clear">
        <router-link tag="li" v-for="item in hotCity" :to="'/city/' + item.id" :key="item.id">
          {{item.name}}
        </router-link>
      </ul>
    </section>

    <section class="group_city_container">
      <ul class="letter_classify">
        <li class="letter_classify_li" v-for="(value, key, index) in sortgroupcity" :key="key">
          <h4 class="city_title">{{key}}
            <span v-if="index == 0">(按字母排序)</span>
          </h4>
          <ul class="groupcity_name_container citylistul clear">
            <router-link class="ellipsis" tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id">
              {{item.name}}
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import headTop from '../../components/header/head'
  import {cityGuess, hotCity, groupCity} from '../../service/getData'

  export default {
    data () {
      return {
        guessCity: '',    // 当前城市
        guessCityid: '',     // 当前城市id
        hotCity: [],    // 热门城市列表
        groupCity: {},    // 所有城市列表
      }
    },
    mounted () {
      // 获取当前城市
      cityGuess().then(res => {
        this.guessCity = res.name;
        this.guessCityid = res.id;
      })

      // 获取热门城市
      hotCity().then(res => {
        this.hotCity = res;
      })

      // 获取所有城市
      groupCity().then(res => {
        this.groupCity = res;
      })
    },
    components: {
      headTop
    },

    computed: {
      // 将获取的数据按照A-Z字母开头排序
      sortgroupcity () {
        let sortobj = {};
        for (let i = 65; i <= 90; i ++) {
          if (this.groupCity[String.fromCharCode(i)]) {
            sortobj[String.fromCharCode(i)] = this.groupCity[String.fromCharCode(i)];
          }
        }
        return sortobj
      }
    },

    methods: {
      // 点击图标刷新页面
      reload() {
        window.location.reload()
      }
    }
  }
</script>
