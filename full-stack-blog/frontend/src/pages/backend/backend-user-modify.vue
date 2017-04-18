<template>
  <div class="settings-main card">
    <div class="settings-main-content">
      <a-input title="Nickname">
        <input type="text" name="username" v-model="form.username" placeholder="nickname" class="base-input">
        <span class="input-info error">Please input user's nickname</span>
      </a-input>
      <a-input title="Email">
        <input type="text" name="email" v-model="form.email" placeholder="email" class="base-input">
        <span class="input-info error">Please input user's email</span>
      </a-input>
      <a-input title="Password">
        <input type="password" name="password" v-model="form.password" placeholder="password" class="base-input">
        <span class="input-info error">Please input user's password</span>
      </a-input>
    </div>
    <div class="settings-footer clearfix">
      <router-link to="/backend/user/list" class="btn btn-blue">Back</router-link>
      <a href="javascript:;" @click="modifyItem" class="btn btn-yellow">Edit User</a>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import api from '~api'
import aInput from '~components/_input.vue'

const fetchInitialData = async store => {
  await store.dispatch('backend/user/getUserItem')
}

export default {
  data () {
    return {
      form: {
        id: this.$route.params.id,
        username: '',
        email: '',
        password: ''
      }
    }
  },
  components: {
    aInput
  },
  computed: {
    ...mapGetters({
      item: 'backend/user/getUserItem'
    })
  },
  methods: {
    async modifyItem() {
      if (!this.form.username || !this.form.email) {
        this.$store.dispatch('global/showMsg', 'Please complete the form!')
        return
      }
      const {data: {message, code, data}} = await api.post('backend/user/modify', this.form)
      if (code === 20) {
        this.$store.dispatch('global/showMsg', {
          type: 'success',
          content: message
        })
        this.$store.commit('backend/user/UPDATE_USER_ITEM', data)
        this.$router.push('/backend/user/list')
      }
    }
  },
  mounted() {
    if (!this.item.path !== this.$route.path) {
      fetchInitialData(this.$store)
    } else {
      this.form.username = this.item.data.username
      this.form.email = this.item.data.email
    }
  },
  watch: {
    item (val) {
      this.form.username = val.data.username
      this.form.email = val.data.email
    }
  }
}
</script>
