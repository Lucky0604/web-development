<template>
  <div class="main wrap clearfix">
    <div class="main-left">
      <div class="card card-answer">
        <div class="answer-content">
          <h3 class="about-title">About author</h3>
          <div class="flex-item">
            <div class="flex-label">Name:</div>
            <div class="flex-content">Lucky</div>
          </div>
          <div class="flex-item">
            <div class="flex-label">Age:</div>
            <div class="flex-content">27</div>
          </div>
          <div class="flex-item">
            <div class="flex-label">Job:</div>
            <div class="flex-content">Frontend Developer</div>
          </div>
          <div class="flex-item">
            <div class="flex-label">Github:</div>
            <div class="flex-content"><a href="https://github.com/lucky0604" target="_blank">@Lucky</a></div>
          </div>
          <div class="flex-item">
            <div class="flex-label">Skills:</div>
            <div class="flex-content">
              <ul class="about-ul">
                <li>Javascript</li>
                <li>Python</li>
                <li>Nodejs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-right">
      <trending :trending="trending"></trending>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import trending from '~components/aside-trending.vue'

const fetchInitialData = async store => {
  await store.dispatch('frontend/article/getTrending')
}

export default {
  name: 'frontend-index',
  prefetch: fetchInitialData,
  components: {
    trending
  },
  computed: {
    ...mapGetters({
      trending: 'frontend/article/getTrending'
    })
  },
  mounted() {
    if (this.trending.length <= 0) {
      fetchInitialData(this.$store)
    } else {
      this.$store.dispatch('global/gProgress', 100)
    }
  },
  metaInfo() {
    return {
      title: 'About - Softteam',
      meta: [{vmid: 'description', name: 'description', content: 'Softteam'}]
    }
  }
}
</script>