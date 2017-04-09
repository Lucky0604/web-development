/**
 * @Author: lucky
 * @Date:   2017-04-06T16:26:36+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-09T23:48:14+08:00
 */



import * as viewAPI from './api'
import * as types from './mutation-types'
import axios from 'axios'

export default {
  // 获取导航栏'导航列表'
  getSideBarList: ({commit}) => {

    viewAPI.getAPISideBarList(
      getSideBarList => {
        commit(types.SET_SIDE_BAR_LIST, {getSideBarList})
      }
    )


  /*
   axios.get('./static/api/viewAPI.json', {})
    .then(function(res) {
      commit(types.SET_SIDE_BAR_LIST, {list: res.data.resultData})
    })
    */
  },

  // 改变面包屑
  setBreadcrumbLevel: ({commit}, breadcrumbLevelObj) => {
    commit(types.SET_BREADCRUMB_LEVEL, breadcrumbLevelObj)
  },
  getList: ({commit}) => {

    viewAPI.fetchList(
      getList => {
        commit(types.SET_LIST, {getList})
      }
    )

   /*
   axios.get('http://v2.mashupcloud.cn/LIST/User/', {
     params: {
       appid: 235,
       token: 'IupjzTcqIHzvRiMbjHjjfzYgyKPxvMFw'
     }
   })
   .then(function(res) {
     commit(types.SET_LIST, {list: res.data[2]})
   })
   */
 },
 postList: ({commit}, body) => {
   axios.get('http://hw.mashupcloud.cn/ADD/User/', {params: {
     appid: 235,
     token: 'IupjzTcqIHzvRiMbjHjjfzYgyKPxvMFw',
     ...body
   }})
    .then(function(res) {
      commit(types.POST_LIST, res)
      console.log(res.data[0])      // if post successfully, it output 'OK'
      console.log('------------------')
      
    })
 }
}
