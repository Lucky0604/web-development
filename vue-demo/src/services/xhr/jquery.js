import {rootPath, errHandler} from './config'

const xhr = ({method = 'get', url, body = null}) => {
  // 由于引入了es6-shim，这里可以使用原生的Promise
  const defer = $.Deferred()

  $.ajax({
    type: method,
    url: rootPath + url,
    data: body
    // crossDomain: true, // 跨域
    // xhrFields: {withCredentials: true}  // 跨域允许带上cookie
  })
  .done(({success, errMsg, data}) => {
    if (!success) return $.toast({
      heading: '操作失败',
      text: errMsg,
      icon: 'warning',
      stack: false
    })
    defer.resolve(data)
  })
  .fail(errHandler)

  return defer.promise()
}


export default xhr
