/*
 * @Author: Lucky 
 * @Date: 2017-05-03 13:09:09 
 * @Last Modified by: Lucky
 * @Last Modified time: 2017-05-03 13:10:04
 */

const isDev = process.env.NODE_ENV === 'development'

export default {
  host: isDev ? 'http://127.0.0.1:3000': 'http://xxxx.com',
  qiniu: 'http://xxxx.clouddn.com'
}