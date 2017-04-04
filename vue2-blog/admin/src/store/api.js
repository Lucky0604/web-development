/**
 * Created by lucky on 4/4/17.
 */
import request from 'axios'

const store = {}

export default store

store.request = request

store.fetchList = (model, query) => {
  let target = `http://v2.mashupcloud.cn/LIST/${model}`
  return request.get(target, {params: query}).then((response) => {
    return response.data
  })
}
