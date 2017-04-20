<template>
  <div class="settings-main card">
    <div class="settings-main-content">
      <a-input title="Title">
        <input type="text" name="title" v-model="form.title" placeholder="Title" class="base-input">
        <span class="input-info error">Please input title</span>
      </a-input>
      <a-input title="Category" :classes="'select-item-wrap'">
        <i class="icon icon-arror-down"></i>
        <select class="select-item" name="category" v-model="form.category">
          <option value="">Please select the category</option>
          <option :value="item._id + '|' + item.cate_name" v-for="item in category">{{item.cate_name}}</option>
        </select>
        <span class="input-info error">Please input category</span>
      </a-input>
      <div class="settings-section">
        <div id="post-content" class="settings-item-content">
          <textarea name="content" id="editor" class="form-control hidden" data-autosave="editor-content"></textarea>
        </div>
      </div>
    </div>
    <div class="settings-footer clearfix">
      <a href="javascript:;" @click="add" class="btn btn-yellow">Add Post</a>
    </div>
  </div>
</template>

<script>

/** global post editor */
import api from '~api'
import {mapGetters} from 'vuex'
import aInput from '~components/_input.vue'

const fetchInitialData = async (store, config = {limit: 99}) => {
  await store.dispatch('global/category/getCategoryList', config)
}
export default {
  name: 'backend-article-add',
  data () {
    return {
      form: {
        title: '',
        category: '',
        content: ''
      }
    }
  },
  components: {
    aInput
  },
  computed: {
    ...mapGetters({
      category: 'global/category/getCategoryList'
    })
  },
  methods: {
    async add() {
      const content = postEditor.getMarkdown()
      if (!this.form.title || !this.form.category || !content) {
        console.log(this.form.category)
        console.log(content)
        this.$store.dispatch('global/showMsg', 'Please complete the form!')
        return
      }
      this.form.content = content
      const {data: {message, code, data}} = await api.post('backend/article/add', this.form)
      if (code === 200) {
        this.$store.dispatch('global/showMsg', {
          type: 'success',
          content: message
        })
        this.$store.commit('backend/article/ADD_ARTICLE_ITEM', data)
        this.$router.push('/backend/article/list')
      }
    }
  },
  mounted() {
    if (this.category.length <= 0) {
      fetchInitialData(this.$store)
    }
    window.postEditor = editormd('post-content', {
      width: '100%',
      height: 500,
      markdown: '',
      placeholder: 'Please input content...',
      path: '/static/editor.md/lib/',
      toolbarIcons() {
        return [
          'bold', 'italic', 'quote', '|',
          'list-ul', 'list-ol', '|',
          'link', 'reference-link', 'image', 'code', 'table', '|',
          'watch', 'preview', 'fullscreen'
        ]
      },
      watch: false,
      saveHTMLToTextarea: true
    })
  }
}
</script>
