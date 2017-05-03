/*
 * @Author: Lucky 
 * @Date: 2017-05-03 15:25:04 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-03 17:10:02
 */
import config from '../config'
import {router} from '../router'

const base_url = `${config.host}/api/admin`

const axios = require('axios').create({
  baseURL: base_url,
  timeout: 10000,
  withCredentials: true,      // allow cross domain
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  transformResponse: [function (data) {
    console.log(data)
    let json = {}

    try {
      json = JSON.parse(data)
    } catch(e) {
      json = {}
    }

    if (json.msg === 'session error') {
      console.log('session error')
      router.push('/login')
    }

    return json
  }]
})

export const _get = (req) => {
  return axios.get(req.url, {params: req.data})
}

export const _put = (req) => {
  return axios({method: 'put', url: `/${req.url}`, data: req.data})
}


export const _post = (req) => {
  return axios({method: 'post', url: `/${req.url}`, data: req.data})
}

export const _delete = (req) => {
  return axios({method: 'delete', url: `/${req.url}`, data: req.data})
}