/**
 * @Author: lucky
 * @Date:   2017-04-13T12:30:51+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T12:33:59+08:00
 */



var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var ArticleSchema = new Schema({
  title: String,
  content: String,
  html: String,
  category: String,
  category_name: String,
  visit: Number,
  like: Number,
  commnet_count: Number,
  create_date: String,
  update_date: String,
  is_delete: Number,
  timestamp: Number
})

var Article = mongoose.model('Article', ArticleSchema)
Promise.promisifyAll(Article)
Promise.promisifyAll(Article.prototype)

module.exports = Article
