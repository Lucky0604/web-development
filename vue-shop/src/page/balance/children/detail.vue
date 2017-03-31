<template>
  <div class="page">
    <head-top head-title="余额问题" go-back="true"></head-top>
    <div class="markdown"><h3 id="q1-">Q1:使用余额的条件</h3>
      <p>为了保护账户安全，使用余额前必须先绑定手机号。</p>
    </div>
  </div>
</template>

<script>
  import headTop from 'src/components/header/head'
  import {mapState, mapMutations} from 'vuex'
  import {payRequest} from 'src/service/getData'
  import alertTip from 'src/components/common/alertTip'
  import loading from 'src/components/common/loading'

  export default {
    data () {
      return {}
    },
    components: {
      headTop
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  .page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
    z-index: 203;
    background-color: #fff;
    p, span {
      font-family: Helvetica Neue, Tahoma, Arial;
    }
  }
  .markdown {
    @include sc(.6rem, #666);
    padding: 0 0.5rem 0.5rem;
    h3 {
      line-height:2rem;
    }
    p, li {
      @include sc(.6rem, #666);
      line-height:1rem;
    }
  }
</style>
