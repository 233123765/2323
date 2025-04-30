/**
 * 格式化时间
 * @param {Date} date 日期对象
 * @returns {string} 格式化后的日期字符串，格式为：YYYY-MM-DD HH:mm:ss
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 格式化数字
 * @param {number} n 需要格式化的数字
 * @returns {string} 格式化后的字符串，如果小于10，则在前面补0
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 转换文件大小
 * @param {number} size 文件大小，单位为字节
 * @returns {string} 转换后的文件大小，带单位
 */
const formatSize = size => {
  if (size < 1024) {
    return size + 'B'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'KB'
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + 'MB'
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  }
}

/**
 * 计算两个日期之间的天数
 * @param {Date} date1 日期对象1
 * @param {Date} date2 日期对象2
 * @returns {number} 两个日期之间的天数
 */
const daysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000 // 一天的毫秒数
  const diffTime = Math.abs(date2 - date1)
  return Math.round(diffTime / oneDay)
}

/**
 * 获取当前设备信息
 * @returns {Object} 设备信息对象
 */
const getDeviceInfo = () => {
  return wx.getSystemInfoSync()
}

/**
 * 检查网络状态
 * @param {Function} callback 回调函数，参数为网络类型
 */
const checkNetworkStatus = callback => {
  wx.getNetworkType({
    success: res => {
      callback(res.networkType)
    }
  })
}

/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {number} delay 延迟时间，单位为毫秒
 * @returns {Function} 防抖后的函数
 */
const debounce = (fn, delay) => {
  let timer = null
  return function() {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param {Function} fn 需要节流的函数
 * @param {number} threshold 阈值，单位为毫秒
 * @returns {Function} 节流后的函数
 */
const throttle = (fn, threshold) => {
  let timeout
  let last = 0

  return function() {
    const context = this
    const args = arguments
    const now = +new Date()

    if (last && now < last + threshold) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        last = now
        fn.apply(context, args)
      }, threshold)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

module.exports = {
  formatTime,
  formatNumber,
  formatSize,
  daysBetween,
  getDeviceInfo,
  checkNetworkStatus,
  debounce,
  throttle
} 