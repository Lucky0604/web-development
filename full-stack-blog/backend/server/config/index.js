/**
 * @Author: lucky
 * @Date:   2017-04-13T12:56:32+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T13:10:42+08:00
 */



require('../utils').createSecret()
const secret = require('./secret.js')

// MD5加密前缀，如用户密码为123456，存入数据库将会变成md5('!@#$%^' + '123456')
exports.md5Pre = '!@#$%^'
exports.secretServer = secret.secretServer
exports.secretClient = secret.secretClient
