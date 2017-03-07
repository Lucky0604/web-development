import updateQuery from 'UTIL/updateQuery'

export default {
  methods: {
    /**
     * 更新当前URL中的query string
     * @param {Object} newQsObj
     */
    updateQuery (newQsObj) {
      this.$router.go(updateQuery(this.$route.path, newQsObj))
    }
  }
}
