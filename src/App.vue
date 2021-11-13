<script>
  import Vue from 'vue'

  export default {
    onLaunch: function () {
      uni.getSystemInfo({
        success: function (e) {
          // #ifndef MP
          Vue.prototype.StatusBar = e.statusBarHeight
          if (e.platform === 'android') {
            Vue.prototype.CustomBar = e.statusBarHeight + 50
          } else {
            Vue.prototype.CustomBar = e.statusBarHeight + 45
          }
          // #endif

          // #ifdef MP-WEIXIN
          Vue.prototype.StatusBar = e.statusBarHeight
          const custom = wx.getMenuButtonBoundingClientRect()
          Vue.prototype.Custom = custom
          Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight
          // #endif

          // #ifdef MP-ALIPAY
          Vue.prototype.StatusBar = e.statusBarHeight
          Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight
          // #endif
        }
      })
      // 兼容 小程序｜App｜H5 在App.vue页面获取 $Route 属性
      // 因为在 App端 App.vue 下的生命周期是优先执行于页面的，即：页面还未产生。
      this.$AppReady.then(() => {
        // 在这个试着打印路由信息瞧瞧 😊
      })
    },
    onShow: function () {
      // 兼容 小程序｜App｜H5 在App.vue页面获取 $Route 属性
      // 因为在 App端 App.vue 下的生命周期是优先执行于页面的，即：页面还未产生。
      this.$AppReady.then(() => {
        // 在这个试着打印路由信息瞧瞧 😊
      })
    },
    onHide: function () {
      // console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  /* 每个页面公共css */
  @import 'uview-ui/index.scss';
  @import '@/static/css/main.css';
  @import '@/static/css/icon.css';
  @import '@/static/css/global.css';
</style>
