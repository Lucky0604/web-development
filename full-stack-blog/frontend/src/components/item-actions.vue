<template>
  <div class="actions-wrap">
    <a @click="like" href="javascript:;" class="action-item" :class="item.like_status ? 'active': ''">
      <i class="icon" :class="item.like_status ? 'icon-voteup-active': 'icon-action-voteup'"></i>
      <span class="text">{{item.like}} Likes</span>
    </a>
    <a href="javascript:;" class="action-item">
      <i class="icon icon-action-comment"></i>
      <span class="text">{{item.comment_count}} Comments</span>
    </a>
    <a href="javascript:;" class="action-item action-item-fav">
      <i class="icon icon-action-fav"></i>
      <span class="text">{{item.visit}} Read</span>
    </a>
    <a @click="share" href="javascript:;" class="action-item">
      <i class="icon icon-action-share"></i>
      <span class="text">Share</span>
    </a>
  </div>
</template>

<script>
import cookies from 'js-cookie'
import api from '~api'
export default {
  name: 'item-actions',
  serverCacheKey: props => {
    return `frontend::topics::item::actions::${props.item._id}`
  },
  props: ['item'],
  methods: {
    async like() {
      const username = cookies.get('user')
      if (!username) {
        this.$store.dispatch('global/showMsg', 'Please Login First!')
        this.$store.commit('global/SHOW_LOGIN_MODAL', true)
        return
      }
      let url = 'frontend/like'
      if (this.item.like_status) url = 'frontend/unlike'
      const {data: {code, message}} = await api.get(url, {id: this.item._id})
      if (code === 200) {
        this.$store.commit('frontend/article/MODIFY_LIKE_STATUS', {id: this.item._id, status: !this.item.like_status})
        this.$store.dispatch('global/showMsg', {
          content: message,
          type: 'success'
        })
      }
    },
    share() {
      const top = window.screen.height / 2 - 250
      const left = window.screen.width / 2 -300
      const title = this.item.title + ' - Softteam'
      
    }
  }
}
</script>