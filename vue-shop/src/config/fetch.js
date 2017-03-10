/**
 * Created by lucky on 17-3-10.
 *
 * 获取数据接口方法，自定义fetch
 */
import {baseUrl} from './env'

export default async (type = 'GET', url = '', data = {}, method = 'fetch') => {
  // 请求方式名为大写
  type = type.toUpperCase();
  url = baseUrl + url;

  // 若请求方法为'GET'方法
  if (type === 'GET') {
    let dataStr = '';    // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }

  // 若是原生fetch
  if (window.fetch && method == 'fetch') {
    // request请求头设置
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'force-cache'
    }

    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      // ES7 await
      // https://jigsawye.com/2016/04/18/understanding-javascript-async-await/
      // https://blog.leancloud.cn/3910/
      // 关于ES7的async/await，主要目的解决callback
      var response = await fetch(url, requestConfig);
      var responseJson = await response.json();
    } catch (err) {
      throw new Error(err)
    }
    return responseJson
  } else {

    // 原生ajax
    let requestObj;
    if (window.XMLHttpRequest) {
      requestObj = new XMLHttpRequest();
    } else {
      requestObj = new ActiveXObject;
    }

    let sendData = '';
    if (type === 'POST') {
      sendData = JSON.stringify(data);
    }

    requestObj.open(type, url, true);
    requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    requestObj.send(sendData)

    requestObj.onreadystatechange = () => {
      if (requestObj.readyState == 4) {
        if (requestObj.status == 200) {
          let obj = requestObj.response
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj);
          }
          return obj
        } else {
          throw new Error(requestObj)
        }
      }
    }
  }
}
