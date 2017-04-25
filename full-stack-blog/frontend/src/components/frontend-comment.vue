<template>
  <div class="card">
    <div class="comments">
      <div class="comment-post-wrap">
        <img src="http://tva1.sinaimg.cn/crop.0.0.180.180.180/bfc09297jw1e8qgp5bmzyj2050050aa8.jpg" class="avatar-img" />
        <div class="comment-post-input-wrap base-textarea-wrap">
          <textarea v-model="form.content" id="content" class="textarea-input base-input" cols="30" rows="4"></textarea>
        </div>
        <div class="comment-post-actions clearfix">
          <a @click="postComment" href="javascript:;" class="btn btn-blue">Post comment</a>
        </div>
      </div>

      <div class="comment-items-wrap">
        <div v-for="item in comments.data" class="comment-item">
          <a href="javascript:;" class="comment-author-avatar-link">
            <img src="http://tva1.sinaimg.cn/crop.0.0.180.180.180/bfc09297jw1e8qgp5bmzyj2050050aa8.jpg" class="avatar-img" />
          </a>
          <div class="comment-content-wrap">
            <span class="comment-author-wrap">
              <a href="javascript:;" class="comment-author">{{item.username}}</a>
            </span>
            <div class="comment-content" v-text="item.content"></div>
            <div class="comment-footer">
              <span class="comment-time" v-text="item.create_date"></span>
              <a @click="replay(item)" href="javascript:;" class="comment-action-item comment-reply">Reply</a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="comments.hasNext" class="load-more-wrap">
        <a @click="loadComment()" href="javascript:;" class="comments-load-more">Load more</a>
      </div>
    </div>
  </div>
</template>

<script>
import cookies from 'js-cookie'
import api from '~api'
export default {
  props: ['comments'],
  data () {
    return {
      form: {
        id: this.$route.params.id,
        content: ''
      }
    }
  },
  methods: {
    loadComment() {
      this.$store.dispatch(`global/comment/getCommentList`, {
        page: this.comments.page + 1,
        limit: 10
      })
    },
    async postComment() {
      const username = cookies.get('user')
      if (!username) {
        this.$store.dispatch('global/showMsg', 'Please login first!')
        this.$store.commit('global/SHOW_LOGIN_MADAL', true)
      } else if (this.form.content == '') {
        this.$store.dispatch('global/showMsg', 'Please input comment!')
      } else {
        const {data: {code, data}} = await api.post('frontend/comment/add', this.form)
        if (code === 200) {
          this.form.content = ''
          this.$store.dispatch('global/showMsg', {
            content: 'Successful!',
            type: 'success'
          })
          this.$store.commit('global/comment/ADD_COMMENT_ITEM', data)
        }
      }
    },
    reply(item) {
      this.form.content = 'Reply @' + item.username + ': '
      document.querySelector('#content').focus()
    }
  }
}
</script>