<template>
  <div class="settings-main card">
    <div class="settings-main-content">
      <div class="list-section">
        <div class="list-title">
          Category Name
        </div>
        <div class="list-time">
          Category Order
        </div>
        <div class="list-action">
          Action
        </div>
      </div>
      <div class="list-section" v-for="item in category">
        <div class="list-title">
          {{item.cate_name}}
        </div>
        <div class="list-time">
          {{item.cate_order}}
        </div>
        <div class="list-action">
          <router-link :to="'/backend/category/modifyItem/' + item._id" class="badge badge-success">Edit</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
const fetchInitialData = async (store, config = {limit: 99}) => {
  await store.dispatch('global/category/getCategoryList', config)
}
export default {
  name: 'backend-category-list',
  computed: {
    ...mapGetters({
      category: 'global/category/getCategoryList'
    })
  },
  mounted() {
    if (this.category.length <= 0) {
      fetchInitialData(this.$store)
    }
  }
}
</script>
