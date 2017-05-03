<template>
  <div id="admin" class="admin">
    <section>
      <el-card clas="box-card">
        <span>Users {{total.user}}</span>
      </el-card>
      <el-card class="box-card">
        <span>Articles {{total.article}}</span>
      </el-card>
      <el-card class="box-card">
        <span>Comments {{total.comment}}</span>
      </el-card>
      <el-card class="box-card">
        <span>Votes {{total.vote}}</span>
      </el-card>
    </section>
  </div>
</template>

<script>
  import * as api from '../stores/api'

  export default {
    name: 'admin',
    data () {
      return {
        total: {}
      }
    },
    methods: {
      fetch () {
        const _this = this
        api._get({
          url: 'statistics/total',
          data: _this.ruleForm
        }).then((result) => {
          _this.$set(_this, 'total', result.data.data)
        }).catch((err) => {
          console.log(err)
          _this.$message.error(err.toString())
        })
      }
    },
    beforeMount() {
      this.fetch()
    }
  }
</script>

<style scoped>
  #admin el-card {
    cursor: pointer;
    position: relative;
    width: calc(20% - 25px);
    margin: 30px;
    display: inline-block;
  }
  #admin span {
    font-size: 2rem;
  }
</style>