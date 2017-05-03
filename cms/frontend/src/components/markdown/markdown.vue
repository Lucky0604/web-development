<template>
  <div id="cms-markdown">
    <textarea class="markdown"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'cms-markdown',
    data() {
      return {
        input: '### winter is coming'
      }
    },
    props: ['markdown'],
    mounted () {
      var simplemde = new SimpleMDE({
        autofocus: true,
        autosave: {
          enabled: true,
          uniqueId: 'UniqueID',
          delay: 1000
        },
        renderingConfig: {
          singleLineBreaks: false,
          codeSyntaxHighlighting: true
        }
      })
      simplemde.value(this.markdown || '')
      this.$store.commit('SET_ITEM', {
        key: 'editor',
        val: simplemde
      })
    }
  }
</script>

<style>
  #cms-markdown {
    font-size: 2.2rem;
    line-height: 25px;
  }
  .markdown {
    height: 400px;
    max-height: 500px;
  }
</style>