// uni-simple-router
const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()
const ENV = require('./src/config/env.' + process.env.NODE_ENV)

// 获取路径
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  transpileDependencies: ['luch-request'],

  // 启用压缩代码
  configureWebpack: () => {
    return {
      // 配置 alias 路径别名
      resolve: {
        alias: {
          '@': resolve('src')
        }
      },
      optimization: {
        minimize: ENV.UNI_COMPRESSION_CODE
      },
      // 插件
      plugins: [
        // 配置 uni-simple-router 路由插件
        new webpack.DefinePlugin({
          ROUTES: webpack.DefinePlugin.runtimeValue(() => {
            const tfPages = new TransformPages({
              includes: ['path', 'name', 'meta', 'aliasPath']
            })
            return JSON.stringify(tfPages.routes)
          }, true)
        })
      ]
    }
  },

  chainWebpack: (config) => {
    config.optimization.minimizer('terser').tap((args) => {
      const compress = args[0].terserOptions.compress
      compress.drop_console = ENV.DROP_CONSOLE
      compress.pure_funcs = ['__f__']
      return args
    })
  },

  // 服务代理
  devServer: {
    proxy: {
      [ENV.UNI_PROXY_PREFIX]: {
        target: ENV.UNI_REQUEST_TYPE ? ENV.UNI_API_URL : ENV.UNI_API_IP_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          [`^${ENV.UNI_PROXY_PREFIX}`]: ENV.UNI_PROXY_PREFIX
        }
      }
    }
  }
}
