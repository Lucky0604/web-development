/**
 * @Author: lucky
 * @Date:   2017-04-06T16:16:12+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-06T23:43:10+08:00
 */



import Vue from 'vue'
import axios from 'axios'
import * as types from './mutation-types'
const qs = require('qs')

// 设置content types
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// API获取侧导航列表
export const getAPISideBarList = (cb) => {
  axios.get('./static/api/viewAPI.json', {})
    .then(function(res) {
      let getSideBarList = res.data.resultData
      cb(getSideBarList)
    })
    .catch(function(err) {
      console.log(err)
    })
}

export const fetchList = (cb) => {
  axios.get('http://v2.mashupcloud.cn/LIST/User/', {params: {appid: 235, token: 'IupjzTcqIHzvRiMbjHjjfzYgyKPxvMFw'}})
    .then(function(res) {
      let list = res.data[2]
      console.log(list)
      cb(list)
    })
    .catch(function(err) {
      console.log(err)
    })
}
