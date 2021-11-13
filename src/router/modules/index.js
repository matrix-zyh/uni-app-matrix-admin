const files = require.context('.', false, /\.js$/)
const modules = []

// 统一导出路由信息
files.keys().forEach((key) => {
  if (key === './index.js') return
  const item = files(key).default
  modules.push(...item)
})

export default modules
