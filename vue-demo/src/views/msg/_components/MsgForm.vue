<template>
  <form class="p-10" @submit.prevent>
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" v-model="msg.title" id="title" class="form-control" placeholder="Please input the title" required>
    </div>
    <div class="form-group">
      <label for="content">Content</label>
      <textarea v-model="msg.content" rows="5" id="content" required class="form-control" placeholder="Please input the message"></textarea>
    </div>
    <div class="clearfix">
      <div class="pull-right">
        <span v-show="allowToSubmit">
          <slot name="opt"><!-- 操作按钮插槽 --></slot>
        </span>
        <span v-show="!allowToSubmit">
          <button class="btn" disabled>
            <i class="fa fa-pencil-square-o m-r-5"></i>
            Please fill the form
          </button>
        </span>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    msg: {type: Object, required: true, twoWay: true}
  },
  computed: {
    allowToSubmit () {
      let {title, content} = this.msg
      return title && content
    }
  }
}
</script>

<style>
.p-10{
  padding: 10px;
}
</style>
