<template>
  <div>
    <ul :data="userDetail">
      <li>{{userDetail.username}}</li>
      <li>{{userDetail.password}}</li>
      <li>{{userDetail.email}}</li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
export default {
  data () {
    return {
      userDetail: []
    }
  },
  computed: {
    ...mapState([
      'userDetail'
    ]),
    ...mapGetters({
      get_userById: 'get_userById'
    })
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
