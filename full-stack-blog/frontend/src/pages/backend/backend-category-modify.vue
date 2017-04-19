<template>
  <div class="settings-main card">
    <div class="settings-main-content">
      <a-input title="Category Name">
        <input type="text" name="cate_name" v-model="form.cate_name" placeholder="Category name" class="base-input">
        <span class="input-info error">Please input category name</span>
      </a-input>
      <a-input title="Category Order">
        <input type="text" name="cate_order" v-model="form.cate_order" placeholder="Category order" class="base-input">
        <span class="input-info error">Please input category order</span>
      </a-input>
    </div>
    <div class="settings-footer clearfix">
      <router-link to="/backend/category/list" class="btn btn-blue">Back</router-link>
      <a href="javascript:;" @click="modifyItem" class="btn btn-yellow">Edit category</a>
    </div>
  </div>
</template>

<script>

import api from '~api'
import {mapGetters} from 'vuex'
import aInput from '~components/_input.vue'

const fetchInitialData = async store => {
  await store.dispatch('global/category/getCategoryItem')
}

export default {
  name: 'backend-category-modify',
  data() {
    return {
      form: {
        id: this.$route.params.id,
        cate_name: '',
        cate_order: ''
      }
    }
  },
  components: {
    aInput
  },
  computed: {
    ...mapGetters({
      item: 'global/category/getCategoryItem'
    })
  },
  methods: {
    async modifyItem() {
      if (!this.form.cate_name || !this.form.cate_order) {
        this.$route.dispatch('global/showMsg', 'Please complete the form!')
        return
      }
      const {data: {message, code, data}} = await api.post('backend/category/modify', this.form)
      if (code === 200 && data) {
        this.$store.dispatch('global/showMsg', {
          type: 'success',
          content: message
        })
        this.$store.commit('global/category/UPDATE_CATEGORY_ITEM', data)
        this.$router.push('/backend/category/list')
      }
    }
  },
  mounted() {
    if (!this.item._id || this.item.path !== this.$route.path) {
      fetchInitialData(this.$store)
    } else {
      this.form.cate_name = this.item.cate_name
      this.form.cate_order = this.item.cate_order
    }
  },
  watch: {
    item (val) {
      this.form.cate_name = val.cate_name
      this.form.cate_order = val.cate_order
    }
  }
}
</script>
