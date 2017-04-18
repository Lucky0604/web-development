<template>
  <div class="settings-main card">
    <div class="settings-main-content">
      <div class="list-section list-header">
        <div class="list-username">
          Username
        </div>
        <div class="list-email">
          Email
        </div>
        <div class="list-date">
          Date
        </div>
        <div class="list-actions">
          Action
        </div>
      </div>
      <div class="list-section" v-for="item in user.data">
        <div class="list-username">
          {{item.username}}
        </div>
        <div class="list-email">
          {{item.email}}
        </div>
        <div class="list-date">
          {{item.update_date | timeYmd}}
        </div>
        <div class="list-action">
          <router-link :to="'/backend/user/modify/' + item._id" class="badge badge-success">Edit</router-link>
          <a href="javascript:;" v-if="item.is_delete" @click(recoverItem(item._id))>Recover</a>
          <a href="javascript:;" v-else @click="deleteItem(item._id)">Delete</a>
        </div>
      </div>
    </div>
    <div class="settings-footer clearfix" v-if="user.hasNext">
      <a href="javascript:;" class="admin-load-more" @click="loadMore()">Load More</a>
    </div>
  </div>
</template>

<script>
import api from '~api'
import {mapGetters} from 'vuex'

const fetchInitialData = async (store, config = {page: 1}) => {
  await store.dispatch('backend/user/getUserList', config)
}

export default {
  name: 'backend-user-list',
  computed: {
    ...mapGetters({
      user: 'backend/user/getUserList'
    })
  },
  methods: {
    loadMore(page = this.user.page + 1) {
      fetchInitialData(this.$store, {page})
    },
    async recoverItem(id) {
      const {data: {code, message}} = await api.get('backend/user/recover', {id})
      if (code === 200) {
        this.$store.dispatch('global/showMsg', {
          type: 'success',
          content: message
        })
        this.$store.commit('backend/user/RECOVER_USER', id)
      }
    },
    async deleteItem(id) {
      const {data: {code, message}} = await api.get('backend/user/delete', {id})
      if (code === 200) {
        this.$store.dispatch('global/showMsg', {
          type: 'success',
          content: message
        })
        this.$store.commit('backend/user/DELETE_USER', id)
      }
    }
  },
  mounted() {
    if (this.user.data.length <= 0) {
      fetchInitialData(this.$store)
    }
  }
}
</script>
