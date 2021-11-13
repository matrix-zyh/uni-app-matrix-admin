const apiContext = require.context('./modules/', true, /\.js$/)

const m = {}
apiContext.keys().forEach((key) => {
  const apiName = key
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')

  switch (apiName) {
    // loading 加载......
    case 'loading':
      for (const field in apiContext(key)) {
        m[field] = apiContext(key)[field]
      }
      break
    // log 日志
    case 'log':
      for (const field in apiContext(key)) {
        m[field] = apiContext(key)[field]
      }
      break
    // 通用 工具类
    case 'tools':
      for (const field in apiContext(key)) {
        m[field] = apiContext(key)[field]
      }
      break
    default:
      break
  }
})

uni.$m = m

const install = (Vue) => {
  Vue.prototype.$m = m
}

export default { install }
