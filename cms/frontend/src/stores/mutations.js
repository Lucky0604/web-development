/*
 * @Author: Lucky 
 * @Date: 2017-05-03 15:25:17 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-03 15:29:43
 */


import * as types from './mutation-types'

export default {
  [types.SET_ITEM] (state, obj) {
    state[obj.key] = obj.val
  },
  [types.DELETE_ITEM] (state, obj) {
    state[obj.key].splice(obj.index, 1)
  },
  [types.ADD_ITEM] (state, obj) {
    state[obj.key].unshift(obj.val)
  },
  [types.UPDATE_ARRAY_ITEM] (state, obj) {
    let array = state[obj.key]
    for (let item in array) {
      if (item._id === obj.id) {
        item = obj.val
        break
      }
    }
  }
}