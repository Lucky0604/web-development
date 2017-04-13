/**
 * @Author: lucky
 * @Date:   2017-04-13T12:34:20+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T12:39:11+08:00
 */



var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var CategorySchema = new Schema({
  cate_name: String,
  cate_order: String,
  cate_num: Number,
  create_date: String,
  update_date: String,
  is_delete: Number,
  timestamp: Number
})

var Category = mongoose.model('Category', CategorySchema)
Promise.promisifyAll(Category)
Promise.promisifyAll(Category.prototype)

module.exports = Category
