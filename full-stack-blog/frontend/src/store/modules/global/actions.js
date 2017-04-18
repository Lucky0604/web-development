/**
 * @Author: lucky
 * @Date:   2017-04-16T13:22:48+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-17T16:57:58+08:00
 */



import toastr from 'toastr'
import {inBrowser} from '~utils'
import * as types from './mutation-types'

toastr.options.positionClass = 'toastr-top-center'

export default {
  ['gProgress']({commit}, payload) {
    commit(types.PROGRESS, payload)
  },
  ['showMsg']({commit}, config) {
    let content, type
    if (typeof config === 'string') {
      content = config
      console.log('-----action------showMsg-----')
      console.log(config)
      type = 'error'
    } else {
      content = config.content
      type = config.type
    }
    if (inBrowser) toastr[type](content)
  },
  ['hideMsg']() {
    toastr.clear()
  }
}
