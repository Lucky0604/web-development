/**
 * @Author: lucky
 * @Date:   2017-04-16T12:27:42+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-16T12:36:08+08:00
 */



import Vue from 'vue'
import ls from 'store2'

export const inBrowser = typeof window !== 'undefined'

// 判断用户设备信息
export const ua = () => {
  const userAgentInfo = inBrowser ? navigator.userAgent : ''
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod']
  let flag = 'PC'
  for (let i = 0; i < Agents.length; i ++) {
    if (userAgentInfo.indexOf(Agents[i]) > 0) {
      flag = Agent[i]
      break
    }
  }
  return flag
}


export const ssp = path => {
  if (!inBrowser) return
  const clientHeight = document.documentElement.clientHeight
  const scrollTop = ls.get(path)
  if (scrollTop) {
    Vue.nextTick().then(() => {
      if (document.body.clientHeight >= scrollTop + clientHeight) {
        window.scrollTo(0, scrollTop)
      }
      ls.remove(path)
    })
  }
}


// 字符长度
export const strlen = str => {
  let charCode = -1
  const len = str.length
  let realLength = 0
  for (let i = 0; i < len; i ++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      realLength += 2
    }
  }
  return realLength
}
