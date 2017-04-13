/**
 * @Author: lucky
 * @Date:   2017-04-13T12:57:32+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-13T13:03:38+08:00
 */



var fs = require('fs')
const fsExistsSync = path => {
  try {
    fs.accessSync(path, fs.F_OK)
  } catch(e) {
    return false
  }
  return true
}
exports.fsExistsSync = fsExistsSync

exports.strlen = str => {
  var charCode = -1
  var len = str.length
  var realLength = 0
  for (var i = 0; i < len; i ++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      realLength += 2
    }
  }
  return realLength
}

exports.createSecret = () => {
  if (!fsExistsSync('./server/config/secret.js')) {
    const secretServer = Math.random() * 1000000
    const secretClient = Math.random() * 1000000
    const secret = `
      exports.secretServer = '${secretServer}'
      exports.secretClient = '${secretClient}'
    `
    fs.writeFileSync('./server/config/secret.js', secret)
  }
}
