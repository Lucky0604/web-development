/**
 * @Author: lucky
 * @Date:   2017-04-06T16:26:36+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-06T16:28:32+08:00
 */



import * as viewAPI from './api'
import * as types from './mutation-types'

export default {
  // 获取导航栏'导航列表'
  getSideBarList: ({commit}) => {
    viewAPI.getAPISideBarList(
      getSideBarList => {
        commit(types.SET_SIDE_BAR_LIST, {getSideBarList})
      }
    )
  },

  // 改变面包屑
  setBreadcrumbLevel: ({commit}, breadcrumbLevelObj) => {
    commit(types.SET_BREADCRUMB_LEVEL, breadcrumbLevelObj)
  }
}
