<template>
  <div class="main wrap clearfix">
    <div class="main-left">
      <div class="home-feeds cards-wrap">
        <topics-item-none v-if="!topics.path">Loading...</topics-item-none>
        <template v-else-if="topics.data.length > 0">
          <topics-item v-for="item in topics.data" :item="item" :key="item._id"></topics-item>
          <div class="load-more-wrap"><a v-if="topics.hasNext" @click="loadMore()" href="javascript:;" class="load-more">More<i class="icon icon-circle-loading"></i></a></div>
        </template>
        <topics-item-none v-else>No articles in this category</topics-item-none>
      </div>
    </div>
    <div class="main-right">
      <category :category="category"></category>
      <trending :trending="trending"></trending>
    </div>
  </div>
</template>

<script>
import ls from 'store2'
import {mapGetters} from 'vuex'
import topicsItem from '~components/topics-item.vue'
import topicsItemNone from '~components/topics-item-none.vue'
import category from '~components/aside-category.vue'
import trending from '~components/aside-trending.vue'
import {ssp} from '~utils'

const fetchInitialData = async (store, config = {page: 1}) => {
  const {params: {id, key, by}, path} = store.state.route
  const base = {...config, limit: 10, id, key, by}
  store.dispatch('global/category/getCategoryList')
  store.dispatch('frontend/article/getTrending')
  await store.dispatch('frontend/article/getArticleList', base)
  if (config.page === 1) ssp(path)
}

export default {
  name: 'frontend-index',
  prefetch: fetchInitialData,
  components: {
    topicsItem, topicsItemNone, category, trending
  },
  computed: {
    ...mapGetters({
      topics: 'frontend/article/getArticleList',
      category: 'frontend/category/getCategoryList',
      trending: 'frontend/article/getTrending'
    })
  },
  methods: {
    loadMore(page = this.topics.page + 1) {
      fetchInitialData(this.$store, {page})
    }
  },
  mounted() {
    fetchInitalData(this.$store, {page: 1})
  },
  watch: {
    '$route'() {
      fetchInitalData(this.$store, {page: 1})
    }
  },
  beforeRouteLeave(to, from, next) {
    const scrollTop = document.body.scrollTop
    const path = from.path
    if (scrollTop) {
      ls.set(path, scrollTop) 
    } else {
      ls.remove(path)
    }
    next()
  },
  metaInfo() {
    var title = 'Softteam'
    const {id, key, by} = this.$route.params
    if (id) {
      const obj = this.category.find(item => item._id === id)
      if (obj) {
        title = obj.cate_name + ' - ' + title
      }
    } else if (key) {
      title = 'Search: ' + key + ' - ' + title
    } else if (by) {
      title = 'Trending - ' + title
    }
    return {
      title,
      meta: [{vmid: 'description', name: 'description', content: title}]
    }
  }
}
</script>