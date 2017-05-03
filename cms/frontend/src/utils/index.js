/*
 * @Author: Lucky 
 * @Date: 2017-05-03 15:24:42 
 * @Last Modified by:   Lucky 
 * @Last Modified time: 2017-05-03 15:24:42 
 */
import moment from 'moment'
import wangEditor from 'wangeditor'
import config from '../config'
console.log(config)
const domain = config.qiniu

function printLog(title, info) {
  window.console && console.log(title, info)
}

export default {
  qiniu: (_this, btnId, dropElement, key, cb) => {
    let uploader = Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: btnId,
      uptoken: _this.$store.state.uptoken,
      uptoken_func: function () {
        return _this.$store.state.uptoken
      },
      unique_names: false,
      domain: domain,

      max_file_size: '100mb',
      // flash_swf_url: './assets/js/plupload/Moxie.swf',
      flash_swf_url: '',
      filters: {
        mime_types: [
          // only allowed upload Image files
          {title: 'Image File', extensions: 'jpg,gif,png,bmp,jpeg'}
        ]
      },
      max_retries: 3,     // if uploads failed, retry chances
      dragdrop: true,     // enable drag to upload
      drop_element: dropElement,    // drag element id
      chunk_size: '4mb',
      auto_start: true,
      init: {
        'FilesAdded': function (up, files) {
          plupload.each(files, function(file) {
            printLog('on Files Added')
          })
        },
        'BeforeUpload': function (up, file) {
          printLog('on BeforeUpload')
          console.log(up)
        },
        'UploadProgress': function (up, file) {
          // show the progress
          _this.$store.state.showUploadProgress && _this.$store.showUploadProgress(file.percent)
        },
        'FileUploaded': function (up, file, info) {
          printLog(info)
          let domain = up.getOption('domain')
          let res = $.parseJSON(info)
          let sourceLink = domain + res.key
          cb(sourceLink)
        },
        'UploadComplete': function () {
          printLog('on Upload complete')
          _this.$store.state.showUploadProgress && _this.$store.state.hideUploadProgress()
        },
        'Key': function (up, file) {
          let date = new Date()
          let format = moment(date).format('YYYY-MM-DD_H:mm:ss')
          return key + '/' + format + '.png'
        }
      }
    })
  },

  editor: function (vm) {
    let __this = this
    let uploadInit = function () {
      let token = vm.$store.state.uptoken
      let editor = this
      let btnId = editor.customUploadBtnId
      let containerId = editor.customUploadContainerId
      __this.qiniu(vm, btnId, 'editor-container', 'article', (sourceLink) => {
        const el = `<img src="${sourceLink}" style="max-width: 100%;" />`
        editor.command(null, 'insertHtml', el)
      })
    }
    
    let editor = new wangEditor('editor')
    editor.config.customUpload = true
    editor.config.customUploadInit = uploadInit
    wangEditor.config.printLog = false
    editor.config.emotions = {
      'default': {
        title: 'Default',
        data: 'http://oivm82a2h.bkt.clouddn.com/emotions.data'
      }
    }
    editor.create()
    vm.$store.commit('SET_ITEM', {key: 'editor', val: editor})
  }
}