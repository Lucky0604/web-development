<template>
  <div class="card">
    <div class="comments">
      <div class="comment-items-wrap">
        <div class="comment-item" v-for="item in comments.data">
          <a href="javascript:;" class="comment-author-avatar-link">
            <img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" alt="" class="avatar-img">
          </a>
          <div class="comment-content-wrap">
            <span class="comment-author-wrap">
              <a href="javascript:;" class="comment-author">{{item.username}}</a>
            </span>
            <div class="comment-content">{{item.content}}</div>
            <div class="comment-footer">
              <span class="comment-time">{{item.timestamp | timeAgo}}</span>
              <a v-if="item.is_delete" @click="recoverItem(item._id)" href="javascript:;" class="comment-action-item comment-reply">Recover</a>
              <a v-else @click="deleteItem(item._id)" href="javascript:;" class="comment-action-item comment-reply">Delete</a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="comments.hasNext" class="load-more-wrap">
        <a @click="loadMore()" href="javascript:;" class="comments-load-more">Load More</a>
      </div>
    </div>
  </div>
</template>

<script>

import api from '~api'
import {mapGetters} from 'vuex'
const fetchInitialData = async (store, config = {page: 1}) => {
  config.all = 1
  await store.dispatch('global/comment/getCommentList', config)
}

export default {
  name: 'backend-article-comment',
  computed: {
    ...mapGetters({
      comments: 'global/comment/getCommentList'
    })
  },
  methods: {
    loadMore(page = this.comments.page + 1) {
      fetchInitialData(this.$store, {page})
    },
    async recoverItem (id) {
      const {data: {code, message}} = await api.get('frontend/comment/recover', {id})
      if (code === 200) {
        this.$store.dispatch('global/showMsg', {
          type: 'success',
          content: message
        })
        this.$store.commit('global/comment/RECOVER_COMMENT', id)
      }
    },
    async deleteItem (id) {
      const {data: {code, message}} = await api.get('frontend/comment/delete', {id})
      if (code === 200) {
        this.$store.dispatch('global/showMsg', {
          type: 'success',
          content: message
        })
        this.$store.commit('global/comment/DELETE_COMMENT', id)
      }
    }
  },
  mounted() {
    if (this.comments.data.length <= 0) {
      fetchInitialData(this.$store)
    }
  }
}

</script>