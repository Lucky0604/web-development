/**
 * @Author: lucky
 * @Date:   2017-04-06T16:19:00+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-06T23:27:30+08:00
 */



import * as types from './mutation-types'

export default {
  [types.SET_BREADCRUMB_LEVEL](state, res_breadcrumbLevel) {
    state.breadcrumbLevel = []
    state.breadcrumbLevel = res_breadcrumbLevel.attrObj
  },
  // 保存侧导航栏 导航列表
  [types.SET_SIDE_BAR_LIST](state, res_sideBarList) {
    state.sideBarList = []
    let resArr = res_sideBarList.getSideBarList
    for (let i = 0; i < resArr.length; i ++) {
      state.sideBarList.push(resArr[i])
    }
  },
  [types.SET_LIST](state, res_list) {
    state.userList = []
    let resArr = res_list.getList
    for (let i = 0; i < resArr.length; i ++) {
      state.userList.push(resArr[i])
    }
  }
}
