const ENV = require('@/config/env.' + process.env.NODE_ENV)

export default {
  // 开启命名空间
  namespaced: true,

  state: {
    // 存储用户信息
    user: undefined,
    routes: undefined
  },

  getters: {
    useUser: (state) => {
      if (!state.user) {
        try {
          const user = uni.getStorageSync(ENV.UNI_GLOB_USER_KEY)
          state.user = JSON.parse(user)
        } catch (e) {
          console.log('获取用户信息失败！', e)
        }
      }
      return state.user
    },
    useRoutes: (state) => {
      if (!state.routes) {
        try {
          const routes = uni.getStorageSync(ENV.UNI_GLOB_ROUTES_KEY)
          state.routes = JSON.parse(routes)
        } catch (e) {
          console.log('获取用户信息失败！', e)
        }
      }
      return state.routes
    }
  },

  mutations: {
    setUser: (state, user) => {
      state.user = user
      uni.setStorageSync(ENV.UNI_GLOB_USER_KEY, JSON.stringify(user))
    },
    setRoutes: (state, routes) => {
      state.routes = routes
      uni.setStorageSync(ENV.UNI_GLOB_ROUTES_KEY, JSON.stringify(routes))
    }
  }
}
