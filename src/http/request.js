/* eslint-disable */
import Request from 'luch-request'
const http = new Request()

import { BASE_URL } from './baseUrl'
http.setConfig((config) => {
  config.baseURL = BASE_URL
  config.custom = { token: true }
  config.timeout = 1000 * 5
  return config
})

// Http Method
const METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}

/**
 * luch-request 请求封装
 * @param {String} url 请求的 URL
 * @param {String} method 请求方式
 * @param {Object}} params 请求参数
 * @returns <Promise>
 */
async function request(url, method, params, urlParams) {
  switch (method) {
    case METHOD.GET:
      return http.get(url, { params: params, custom: urlParams?.custom })
    case METHOD.POST:
    case METHOD.PUT:
      return http.post(url, params, { params: urlParams?.params, custom: urlParams?.custom })
    case METHOD.DELETE:
      return http.delete(url, {}, { params: urlParams?.params, custom: urlParams?.custom })
    default:
      return http.get(url, { params: params, custom: urlParams?.custom })
  }
}

// 加载 luch-request 拦截器
function loadInterceptors(interceptors, options) {
  const { request, response } = interceptors
  // 加载请求拦截器
  request.forEach((item) => {
    let { onResolved, onRejected } = item
    if (!onResolved || typeof onResolved !== 'function') {
      onResolved = (config) => config
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = (error) => Promise.reject(error)
    }
    http.interceptors.request.use(
      (config) => onResolved(config, options),
      (error) => onRejected(error, options)
    )
  })

  // 加载响应拦截器
  response.forEach((item) => {
    let { onResolved, onRejected } = item
    if (!onResolved || typeof onResolved !== 'function') {
      onResolved = (response) => response
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = (error) => Promise.reject(error)
    }
    http.interceptors.response.use(
      (response) => onResolved(response, options),
      (error) => onRejected(error, options)
    )
  })
}

export { request, METHOD, loadInterceptors }
