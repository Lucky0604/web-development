/**
 * @Author: lucky
 * @Date:   2017-04-06T16:16:12+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-11T16:44:59+08:00
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
      // let getSideBarList = res.data.resultData
      // cb(getSideBarList)
      let sideBar = res.data.resultData
      cb(sideBar)
    })
    .catch(function(err) {
      console.log(err)
    })
}

export const fetchList = (cb) => {
  axios.get('http://v2.mashupcloud.cn/LIST/User/',
  {params:
    {appid: 235,
     token: 'IupjzTcqIHzvRiMbjHjjfzYgyKPxvMFw'
   }
 })
    .then(function(res) {
      let list = res.data[2]
      cb(list)
    })
    .catch(function(err) {
      console.log(err)
    })
}

export const postUserData = (data) => {
  axios.get('http://hw.mashupcloud.cn/ADD/User/', {
    params: {
      appid: 235,
      token: 'IupjzTcqIHzvRiMbjHjjfzYgyKPxvMFw',
      ...data
    }
  })
    .then(function(res) {
      console.log(res)
    })
}

export const fetchListById = (cb) => {

}
