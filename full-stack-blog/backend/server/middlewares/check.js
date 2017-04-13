/**
 * @Author: lucky
 * @Date:   2017-04-13T13:16:00+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T13:18:12+08:00
 */



var jwt = require('jsonwebtoken')
var config = require('../config')

module.exports = (token, type) => {
  var secret = type === 'admin' ? config.secretServer : config.secretClient
  return new Promise(resolve => {
    jwt.verify(token, secret, function(err, decoded) {
      resolve(decoded)
    })
  })
}
