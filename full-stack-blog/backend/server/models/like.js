/**
 * @Author: lucky
 * @Date:   2017-04-13T12:45:16+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T12:47:08+08:00
 */



var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var LikeSchema = new Schema({
  article_id: String,
  user_id: String,
  create_date: String,
  timestamp: Number
})

var Like = mongoose.model('Like', LikeSchema)
Promise.promisifyAll(Like)
Promise.promisifyAll(Like.prototype)

module.exports = Like
