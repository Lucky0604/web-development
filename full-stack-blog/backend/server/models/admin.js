/**
 * @Author: lucky
 * @Date:   2017-04-13T12:20:25+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T12:23:10+08:00
 */



var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var AdminSchema = new Schema({
  username: String,
  email: String,
  password: String,
  create_date: String,
  update_date: String,
  is_delete: Number,
  timestamp: Number
})

var Admin = mongoose.model('Admin', AdminSchema)
Promise.promisifyAll(Admin)
Promise.promisifyAll(Admin.prototype)

module.exports = Admin
