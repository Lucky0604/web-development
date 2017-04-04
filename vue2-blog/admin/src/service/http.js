/**
 * Created by lucky on 4/4/17.
 *
 * 封装axios相关的http方法
 */
import axios from 'axios'

export const http = {
  request (method, url, data, successCb = null, errorCb = null) {
    axios.request({
      url,
      data,
      method: method.toLowerCase()
    }).then(successCb).catch(errorCb)
  },

  get (url, successCb = null, errorCb = null) {
    return this.request('get', url, data, successCb, errorCb)
  },

  post (url, data, successCb = null, errorCb = null) {
    return this.request('post', url, data, successCb, errorCb)
  },

  put (url, data, successCb = null, errorCb = null) {
    return this.request('put', url, data, successCb, errorCb)
  },

  delete (url, data = {}, successCb = null, errorCb = null) {
    return this.request('delete', url, data, successCb, errorCb)
  }
}
