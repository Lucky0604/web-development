/**
 * @Author: lucky
 * @Date:   2017-04-16T12:18:16+08:00
 * @Last modified by:   lucky
 * @Last modified time: 2017-04-16T12:25:35+08:00
 */



function pluralize(date, label) {
  return date + label
}

export function timeAgo(date) {
  const preg = /^[\d]+$/
  const timestamp = preg.test(date)
  if (!timestamp) {
    const tmp = Date.parse(date)
    date = tmp / 1000
  }
  const between = Date.now() / 1000 - Number(date)
  if (between < 60) {
    return 'Just before'
  } else if (between < 3600) {
    return pluralize(parseInt(between / 60, 10), ' minutes ago')
  } else if (between < 86400) {
    return pluralize(parseInt(between / 3600, 10), ' hours ago')
  }
  return pluralize(parseInt(between / 86400, 10), ' days ago')
}

export function timeYmd(timestamp) {
  const preg = /^[\d]+$/
  const isTimestamp = preg.test(timestamp)
  if (!isTimestamp) {
    let date = Date.parse(timestamp)
    date /= 1000
    timestamp = date
  }
  const tmp = new Date(timestamp * 1000)
  var year = tmp.getFullYear()
  var month = tmp.getMonth() + 1
  var day = tmp.getDate()
  return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
}
