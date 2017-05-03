<template>
  <div class="commit-component">
    <template>
      <el-form-item label="Submit state">
        <el-select v-model="_form.status" placeholder="Please select">
          <el-option label="draft" value="draft"></el-option>
          <el-option label="schedule" value="schedule"></el-option>
          <el-option label="send" value="send"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="timing" v-if="_form.status === 'schedule'">
        <el-data-picker v-model="_form.sendAt" type="datetime" placeholder="Choose Date"></el-data-picker>
      </el-form-item>
      <el-button type="primary" size="large" @click="changeEditor">Toggle the editor</el-button>
      <el-button type="primary" size="large" @click="onSubmit">Submit</el-button>
      <el-dialog title="To view" v-model="dialogVisible">
        <div class="dialog-footer" slot="footer">
          <el-button @click=''>Cancel</el-button>
          <el-button type="primary" @click="dialogConfirm">Confirm</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'commit-component',
    computed: {},
    props: {
      _form: Object,
      dialogVisible: Boolean,
      dialogConfirm: Function,
      onSubmit: Function
    },
    data() {
      return {}
    },
    methods: {
      changeEditor () {
        if (this.$route.query.id) {
          this.$message.error('Already edit, can not change, please create a new article')
          return
        }
        const current = this.$store.state.isMarkdownEditor
        this.$store.commit('SET_ITEM', {
          key: 'isMarkdownEditor',
          val: !current
        })
        this.$message.success('Change successful!')
      }
    },
    beforeMount() {}
  }
</script>