/**
 * @Author: lucky
 * @Date:   2017-04-16T12:41:25+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-16T13:04:50+08:00
 */


import axios from 'axios'
import qs from 'qs'
import store from '../store'
import config from './config-client'

axios.interceptors.request.use(config => {
  store.dispatch('global/gProgress', 50)
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

// 检查请求状态
function checkStatus(res) {
  store.dispatch('global/gProgress', 100)
  if (res.status === 200 || res.status === 304) {
    return res
  }
  return {
    data: {
      code: -404,
      message: res.statusText,
      data: ''
    }
  }
}

// 检查请求状态码
function checkCode(res) {
  if (res.data.code === -500) {
    window.location.href = '/backend'
  } else if (res.data.code === -400) {
    window.location.href = '/'
  } else if (res.data.code !== 200) {
    store.dispatch('global/showMsg', res.data.message)
  }
  return res
}


// 封装axios中的post, get方法
export default {
  post (url, data) {
    return axios({
      method: 'post',
      url: config.api + url,
      data: qs.stringify(data),
      timeout: config.timeout,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }).then(checkStatus).then(checkCode)
  },

  get(url, params) {
    return axios({
      method: 'get',
      url: config.api + url,
      params,
      timeout: config.timeout,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(checkStatus).then(checkCode)
  }
}
