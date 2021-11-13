const ENV = require('@/config/env.' + process.env.NODE_ENV)

export default {
  // 开启命名空间
  namespaced: true,

  state: {
    // 获取服务器静态文件 [图片、文件之类，手动上传，固定的]
    serverFile: '',
    // 获取服务器Icon文件 [图标之类，手动上传，固定的]
    serverIcon: '',
    // 获取服务器上传的文件 [通过接口，上传到服务器的文件]
    serverUploadFile: ''
  },

  getters: {
    useServeFile: (state) => {
      return (state.serverFile = ENV.UNI_REQUEST_TYPE
        ? ENV.UNI_API_URL + ENV.UNI_GLOB_STATIC_FILE
        : ENV.UNI_API_IP_URL + ENV.UNI_GLOB_STATIC_FILE)
    },
    useServeIcon: (state) => {
      return (state.serverIcon = ENV.UNI_REQUEST_TYPE
        ? ENV.UNI_API_URL + ENV.UNI_GLOB_STATIC_ICON
        : ENV.UNI_API_IP_URL + ENV.UNI_GLOB_STATIC_ICON)
    },
    useServeUploadFile: (state) => {
      return (state.serverUploadFile = ENV.UNI_REQUEST_TYPE
        ? ENV.UNI_API_URL + ENV.UNI_GLOB_UPLOAD_FILE
        : ENV.UNI_API_IP_URL + ENV.UNI_GLOB_UPLOAD_FILE)
    }
  }
}
