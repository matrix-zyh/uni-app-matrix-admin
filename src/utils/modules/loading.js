// 控制接口请求是否弹出 loading... 弹窗
var loadingTimer = null
var isLoading = false

/**
 * Loading 加载, 设置 timer 为 500ms, 接口返回数据的时间低于 500ms 没必要展示 Loading 加载弹框, 优化用户体验。
 * @param {Boolean} bool loading 开关
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function loading(bool = true) {
  const timer = 500
  if (bool) {
    loadingTimer = setTimeout(() => {
      isLoading = true
      uni.showLoading({
        title: '努力加载中~',
        mask: true
      })
    }, timer)
  } else {
    isLoading && uni.hideLoading()
    loadingTimer && clearTimeout(loadingTimer)
    loadingTimer = null
    isLoading = false
  }
}
