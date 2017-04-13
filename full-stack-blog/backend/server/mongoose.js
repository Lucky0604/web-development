/**
 * @Author: lucky
 * @Date:   2017-04-13T12:49:34+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T14:46:35+08:00
 */



var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/vue-blog')
// 将全局Promise指向mongoose的Promise
mongoose.Promise = global.Promise
module.exports = mongoose
