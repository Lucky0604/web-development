/**
 * @Author: lucky
 * @Date:   2017-04-13T14:41:00+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T14:42:44+08:00
 */



var md5 = require('md5')
var fs = require('fs')
var moment = require('moment')
var jwt = require('jsonwebtoken')

var mongoose = require('../mongoose')
var Admin = mongoose.model('Admin')
var fsExistsSync = require('../utils').fsExistsSync
var config = require('../config')
var md5Pre = config.md5Pre
var secret = config.secretServer
const general = require('./general')
