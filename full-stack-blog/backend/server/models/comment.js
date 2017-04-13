/**
 * @Author: lucky
 * @Date:   2017-04-13T12:39:26+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T12:41:30+08:00
 */



var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var CommentSchema = new Schema({
  article_id: String,
  userid: String,
  username: String,
  email: String,
  content: String,
  create_date: String,
  is_delete: Number,
  timestamp: Number
})

var Comment = mongoose.model('Comment', CommentSchema)
Promise.promisifyAll(Comment)
Promise.promisifyAll(Comment.prototype)

module.exports = Comment
