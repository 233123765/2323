/**
 * 网络请求封装
 */

// 基础URL，实际项目中替换为真实的API地址
const BASE_URL = 'https://api.example.com'

// 默认超时时间
const TIMEOUT = 10000

/**
 * 处理请求参数
 * @param {Object} options 请求选项
 * @returns {Object} 处理后的请求选项
 */
const handleOptions = (options) => {
  // 默认选项
  const defaultOptions = {
    url: '',
    method: 'GET',
    data: {},
    header: {
      'content-type': 'application/json'
    },
    timeout: TIMEOUT,
    dataType: 'json',
    responseType: 'text'
  }
  
  // 合并选项
  const mergedOptions = {...defaultOptions, ...options}
  
  // 添加基础URL
  if (mergedOptions.url.indexOf('http') !== 0) {
    mergedOptions.url = BASE_URL + mergedOptions.url
  }
  
  // 添加token
  const token = wx.getStorageSync('token')
  if (token) {
    mergedOptions.header.Authorization = `Bearer ${token}`
  }
  
  return mergedOptions
}

/**
 * 统一的响应处理
 * @param {Object} response 响应对象
 * @returns {Promise} Promise对象
 */
const handleResponse = (response) => {
  return new Promise((resolve, reject) => {
    const statusCode = response.statusCode
    
    if (statusCode >= 200 && statusCode < 300) {
      resolve(response.data)
    } else if (statusCode === 401) {
      // 未授权，需要登录
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      // 跳转到登录页或其他处理
      // wx.navigateTo({
      //   url: '/pages/login/login'
      // })
      reject(response)
    } else if (statusCode === 403) {
      // 无权限
      wx.showToast({
        title: '无操作权限',
        icon: 'none'
      })
      reject(response)
    } else if (statusCode === 404) {
      // 资源不存在
      wx.showToast({
        title: '请求的资源不存在',
        icon: 'none'
      })
      reject(response)
    } else if (statusCode >= 500) {
      // 服务器错误
      wx.showToast({
        title: '服务器开小差了，请稍后再试',
        icon: 'none'
      })
      reject(response)
    } else {
      // 其他错误
      wx.showToast({
        title: response.data.message || '请求失败',
        icon: 'none'
      })
      reject(response)
    }
  })
}

/**
 * 发起请求
 * @param {Object} options 请求选项
 * @returns {Promise} Promise对象
 */
const request = (options) => {
  const mergedOptions = handleOptions(options)
  
  return new Promise((resolve, reject) => {
    wx.request({
      ...mergedOptions,
      success: (res) => {
        handleResponse(res)
          .then(resolve)
          .catch(reject)
      },
      fail: (error) => {
        if (error.errMsg.indexOf('timeout') >= 0) {
          wx.showToast({
            title: '请求超时，请检查网络',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '网络错误，请稍后再试',
            icon: 'none'
          })
        }
        reject(error)
      }
    })
  })
}

/**
 * GET请求
 * @param {string} url 请求URL
 * @param {Object} data 请求参数
 * @param {Object} options 其他选项
 * @returns {Promise} Promise对象
 */
const get = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'GET',
    data,
    ...options
  })
}

/**
 * POST请求
 * @param {string} url 请求URL
 * @param {Object} data 请求参数
 * @param {Object} options 其他选项
 * @returns {Promise} Promise对象
 */
const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'POST',
    data,
    ...options
  })
}

/**
 * PUT请求
 * @param {string} url 请求URL
 * @param {Object} data 请求参数
 * @param {Object} options 其他选项
 * @returns {Promise} Promise对象
 */
const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'PUT',
    data,
    ...options
  })
}

/**
 * DELETE请求
 * @param {string} url 请求URL
 * @param {Object} data 请求参数
 * @param {Object} options 其他选项
 * @returns {Promise} Promise对象
 */
const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'DELETE',
    data,
    ...options
  })
}

/**
 * 上传文件
 * @param {string} url 上传URL
 * @param {string} filePath 文件路径
 * @param {string} name 文件对应的key
 * @param {Object} formData 其他表单数据
 * @param {Object} options 其他选项
 * @returns {Promise} Promise对象
 */
const uploadFile = (url, filePath, name = 'file', formData = {}, options = {}) => {
  const mergedOptions = handleOptions({url, ...options})
  
  return new Promise((resolve, reject) => {
    const uploadTask = wx.uploadFile({
      url: mergedOptions.url,
      filePath,
      name,
      formData,
      header: mergedOptions.header,
      success: (res) => {
        if (res.statusCode === 200) {
          let data = res.data
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data)
            } catch (e) {
              console.error('Parse response JSON error', e)
            }
          }
          resolve(data)
        } else {
          reject(res)
        }
      },
      fail: (error) => {
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        })
        reject(error)
      }
    })
    
    // 上传进度
    if (options.onProgress) {
      uploadTask.onProgressUpdate(options.onProgress)
    }
  })
}

module.exports = {
  request,
  get,
  post,
  put,
  del,
  uploadFile
} 