/**
 * @Author: lucky
 * @Date:   2017-04-13T12:47:24+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T12:49:12+08:00
 */



var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  create_date: String,
  update_date: String,
  is_delete: Number,
  timestamp: Number
})

var User = mongoose.model('User', UserSchema)
Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)

module.exports = User
