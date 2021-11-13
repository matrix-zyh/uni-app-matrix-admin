const cookie = {
  // 从 StorageSync 中获取用户账号
  account: () => uni.getStorageSync('account'),

  // 从 StorageSync 中获取用户密码
  password: () => uni.getStorageSync('password'),

  // 从 StorageSync 中获取唯一标识 OpenId
  openId: () => uni.getStorageSync('openId'),

  // 从 StorageSync 中获取 token
  access_token: () => uni.getStorageSync('access_token'),

  // 清空缓存
  removeCookie: (key) => {
    if (key) {
      uni.removeStorageSync(key)
    } else {
      uni.removeStorageSync('account')
      uni.removeStorageSync('password')
      uni.removeStorageSync('openId')
      uni.removeStorageSync('access_token')
    }
  },

  // 添加缓存
  set: (key, value) => {
    uni.setStorageSync(key, value)
  }
}

export default cookie
