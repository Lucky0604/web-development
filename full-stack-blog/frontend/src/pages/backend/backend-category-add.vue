<template>
  <div class="settings-main card">
    <div class="settings-main-content">
      <a-input title="Category Name">
        <input type="text" name="cate_name" v-model="form.cate_name" placeholder="Category Name" class="base-input">
        <span class="input-info error">Please input Category name</span>
      </a-input>
      <a-input title="Category Order">
        <input type="text" name="cate_order" v-model="form.cate_order" placeholder="Category Order" class="base-input">
        <span class="input-info error">Please input Category Order</span>
      </a-input>
    </div>
    <div class="setting-footer clearfix">
      <a href="javascript:;" @click="add" class="btn btn-yellow">Add Category</a>
    </div>
  </div>
</template>

<script>
import api from '~api'
import aInput from '~components/_input.vue'
export default {
  name: 'backend-category-add',
  data() {
    return {
      form: {
        cate_name: '',
        cate_order: ''
      }
    }
  },
  components: {
    aInput
  },
  methods: {
    async add() {
      if (!this.form.cate_name || !this.form.cate_order) {
        this.$store.dispatch('global/showMsg', 'Please Complete the form!')
        return
      }
      const {data: {message, code, data}} = await api.post('backend/category/add', this.form)
      if (code === 200) {
        this.$store.dispatch('global/showMsg', {
          type: 'success',
          content: message
        })
        this.$store.commit('global/category/ADD_CATEGORY_ITEM', {
          ...this.form,
          _id: data
        })
        this.$router.push('/backend/category/list')
      }
    }
  }
}
</script>
