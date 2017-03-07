<template>
  <div class="input-group">
    <div class="input-group-addon clickable unselectable" v-el:addon @dblclick="loadOptions(true)" data-toggle="tooltip" title="双击刷新下拉框">
      <i class="fa fa-filter"></i>
      Authors Fitler:
    </div>
    <select2 :models.sync="authors$" :options="opts" :config="{multiple: true, placeholder: 'Please select the author...'}"></select2>
  </div>
</template>

<script>
import Select2 from 'COMPONENT/Select/Select2'
import autoSyncWithQuery from 'MIXIN/autoSyncWithQuery'
import msgService from 'SERVICE/msgService'

export default {
  mixins: [autoSyncWithQuery],
  components: {Select2},
  data: () => ({authors$: '', authorList: []}),
  computed: {
    opts () {
      return this.authorList.map(
        author => ({value: author, text: author})
      )
    }
  },
  attached () {
    $(this.$els.addon).tooltip()
  },
  ready () {
    this.autoSyncWithQuery()

    if (msgService.authorList) {    // 使用服务中的缓存
      return this.authorList = msgService.authorList
    }
    this.loadOptions()
  },
  methods: {
    loadOptions (shouldNotify) {
      msgService.fetchAuthorList().then(authorList => {
        // 将数据缓存在服务中
        this.authorList = msgService.authorList = authorList

        shouldNotify && $.toast({
          heading: '已刷新', icon: 'success', stack: false
        })
      })
    }
  }
}
</script>

<style>
.clickable {
  cursor: pointer;
}
.clickable:hover {
  background-color: #dadada;
}
.clickable:active {
  background-color: blue;
}
.unselectable {
  user-select: none;
}
</style>
