<template>
  <div class="settings-main card">
    <div class="settings-main-content">
      <div class="list-section list-header">
      <div class="list-title">Title</div>
      <div class="list-category">Category</div>
      <div class="list-date">Date</div>
      <div class="list-action">Action</div>
    </div>
    <div class="list-section" v-for="item in topics.data">
      <div class="list-title">{{item.title}}</div>
      <div class="list-category">{{item.category_name}}</div>
      <div class="list-date">{{item.update_date | timeAgo}}</div>
      <div class="list-action">
        <router-link :to="'/backend/article/modify/' + item._id" class="badge badge-success">Edit</router-link>
        <a v-if="item.is_delete" @click="recoverItem(item._id)" href="javascript:;">Recover</a>
        <a v-else @click="deleteItem(item._id)" href="javascript:;">Delete</a>
        <router-link v-if="item.comment_count > 0" :to="'/backend/article/comment/' + item._id" class="badge badge-success">Comment</router-link>
      </div>
    </div>
  </div>
  <div v-if="topics.hasNext" class="settings-footer clearfix">
    <a @click="loadMore()" class="admin-load-more" href="javascript:;">Load more</a>
  </div>
  </div>
</template>

<script>

import api from '~api'
import {mapGetters} from 'vuex'
const fetchInitialData = async (store,config = {page: 1}) => {
  await store.dispatch('backend/article/getArticleList', config)
}

export default {
  name: 'backend-article-list',
  computed: {
    ...mapGetters({
      topics: 'backend/article/getArticleList'
    })
  },
  methods: {
    loadMore(page = this.topics.page + 1) {
      fetchInitialData(this.$store, {page})
    },
    async recoverItem (id) {
      const {data: {code, message}} = await api.get('backend/article/recoverItem', {id})
      if (code === 200) {
        this.$store.dispatch('global/showMsg', {
          type: 'success',
          content: message
        })
        this.$store.commit('backend/article/RECOVER_ARTICLE', id)
      }
    },
    async deleteItem(id) {
      const {data: {code, message}} = await api.get('backend/article/delete', {id})
      if (code === 200) {
        this.$store.dispatch('global/showMsg', {
          type: 'success',
          content: message
        })
        this.$store.commit('backend/article/DELETE_ARTICLE', id)
      }
    },
  },
  mounted() {
    if (this.topics.data.length <= 0) {
      fetchInitialData(this.$store)
    }
  }
}

</script>
