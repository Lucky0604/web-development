<template>
  <div class="page">
    <head-top head-title="红包说明" go-back="true"></head-top>
    <section id="scroll_section" class="scroll_container">
      <div class="markdown">
        <h3 id="q1-">Q1: 怎么获得红包？</h3>
        <ul>
          <li>通过邀请好友获得</li>
          <li>在下单返红包的商家下单获得</li>
          <li>抢微信朋友分享的红包获得</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
  import headTop from 'src/components/header/head'
  import {mapState, mapMutations} from 'vuex'
  import {payRequest} from 'src/service/getData'
  import alertTip from 'src/components/common/alertTip'
  import loading from 'src/components/common/loading'
  import BScroll from 'better-scroll'

  export default {
    data () {
      return {}
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('#scroll_section', {
          deceleration: 0.001,
          bounce: true,
          swipeTime: 1800,
          click: true
        })
      })
    },
    components: {
      headTop
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  .page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
    z-index: 203;
    background-color: #fff;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .scroll_container{
    @include wh(100%, 100%);
  }
  .markdown{
    padding-bottom: 2rem;
    @include sc(.6rem, #666);
    padding: 0 0.5rem 0.5rem;
    h3{
      line-height: 2rem;
    }
    p,li{
      @include sc(.6rem, #666);
      line-height: 1rem;
    }
  }
