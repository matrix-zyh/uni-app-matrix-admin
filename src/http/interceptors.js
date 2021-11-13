import Cookie from '@/utils/cookie'
import filterEmpty from '@/utils/filterEmpty'

// 请求拦截
const reqCommon = {
  // 发送请求之前做些什么
  onResolved(config, { Router }) {
    // 格式化参数 (过滤参数中的空值)
    config.params = config.params ? filterEmpty.removeEmptyFields(config.params) || {} : {}
    if (config.method !== 'GET') {
      config.data = filterEmpty.removeEmptyFields(config.data || {}) || {}
    }
    // 请求携带 token 认证
    const access_token = Cookie.access_token()
    if (config.custom.token) {
      if (access_token) {
        config.header['X-Access-Token'] = access_token
      } else {
        uni.$u.toast('登录时效过期，请重新登录！')
        setTimeout(() => {
          Router.replaceAll({ path: '/login' })
        }, 1500)
      }
    }
    return config
  },
  // 请求出错时做些什么
  onRejected(error) {
    return Promise.reject(error)
  }
}

// 响应拦截 statusCode === 401
const resp401 = {
  onResolved(response) {
    if (response.statusCode === 401) {
      uni.$m.warning(response.config.url)
    }
    return response
  },
  onRejected(error) {
    if (error.statusCode === 401) {
      uni.$m.error(error.config.url)
    }
    return Promise.reject(error)
  }
}

// 响应拦截 statusCode === 404
const resp404 = {
  onResolved(response) {
    if (response.statusCode === 404) {
      uni.$m.warning(response.config.url)
    }
    return response
  },
  onRejected(error) {
    if (error.statusCode === 404) {
      uni.$m.error(error.config.url)
    }
    return Promise.reject(error)
  }
}

// 响应拦截 statusCode === 500
const resp500 = {
  onResolved(response) {
    if (response.statusCode === 500) {
      uni.$m.warning(response.config.url)
    }
    return response
  },
  onRejected(error) {
    if (error.statusCode === 500) {
      uni.$m.error(error.config.url)
    }
    return Promise.reject(error)
  }
}

// 响应拦截 statusCode === 502
const resp502 = {
  onResolved(response) {
    if (response.statusCode === 502) {
      uni.$m.warning(response.config.url)
    }
    return response
  },
  onRejected(error) {
    if (error.statusCode === 502) {
      uni.$m.error(error.config.url)
    }
    return Promise.reject(error)
  }
}

// 响应拦截 statusCode === 503
const resp503 = {
  onResolved(response) {
    if (response.statusCode === 503) {
      uni.$m.warning(response.config.url)
    }
    return response
  },
  onRejected(error) {
    if (error.statusCode === 503) {
      uni.$m.error(error.config.url)
    }
    return Promise.reject(error)
  }
}

// 响应拦截 statusCode === 200
const resp200 = {
  onResolved(response, { Router }) {
    if (response.statusCode === 200) {
      /* eslint-disable */
      switch (String(response.data.code)) {
        case '200':
          return response.data.value
        case '800':
        case '900':
          uni.$u.toast(response.data.message)
          return Promise.reject(response.data.message)
        case '90000':
          uni.$u.toast('登录时效过期，请重新登录！')
          setTimeout(() => {
            Router.replaceAll({ name: 'login' })
          }, 1500)
          break
        default:
          break
      }
      /* eslint-enable */
    }
  }
}

// 响应拦截 请求超时
const timeout = {
  onRejected(error) {
    const { errMsg } = error
    if (errMsg === 'request:fail timeout') {
      uni.$u.toast('请求超时！')
    }
    return Promise.reject(error)
  }
}

// 响应拦截 设备断网
const noNetwork = {
  onRejected(error) {
    const { errMsg } = error
    if (errMsg === 'request:fail ') {
      uni.$u.toast('网络连接失败，请检查网络！')
    }
    return Promise.reject(error)
  }
}

export default {
  // 请求拦截
  request: [reqCommon],
  // 响应拦截
  response: [resp401, resp404, resp500, resp502, resp503, timeout, noNetwork, resp200]
}
