/*
 * @Author: Lucky 
 * @Date: 2017-05-02 15:22:29 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-02 15:23:54
 */

import $ from '../utils'
import qiniu from 'qiniu'

qiniu.conf.ACCESS_KEY = $.config.qiniu.ACCESS_KEY
qiniu.conf.SECRET_KEY = $.config.qiniu.SECRET_KEY

export default {
  uptoken: function (req, res, next) {
    const putPolicy = new qiniu.rs.PutPolicy($.config.qiniu.bucket)
    res.json({
      uptoken: putPolicy.token()
    })
  }
}