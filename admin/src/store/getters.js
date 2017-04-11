/**
 * @Author: lucky
 * @Date:   2017-04-06T15:58:51+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-11T13:58:16+08:00
 */



export const breadcrumbLevel = state => state.viewState.breadcrumbLevel    // viewState - 面包屑级别
export const get_sideBarList = state => state.viewState.sideBarList    // viewState - 用户侧导航栏级别
export const get_userList = state => state.viewState.userList
export const get_userById = state => state.viewState.userDetail
