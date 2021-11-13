const { merge } = require('webpack-merge')
const commConfig = require('./env')

module.exports = merge(commConfig, {
  // 当前环境所属 API域名
  UNI_API_URL: 'http://www.prev.com',
  // 当前环境所属 API域名所对应的 内网 ip:port
  UNI_API_IP_URL: 'http://127.0.0.1:0000',
  // 是否删除 console.log()
  UNI_DROP_CONSOLE: true,
  // 是否压缩代码
  UNI_COMPRESSION_CODE: true
})
