<template>
  <view>
    <u-navbar
      :title="headerTitle"
      :background="background"
      title-color="#fff"
      back-icon-color="#fff"
    />

    <view class="margin-xl bg-white padding-xl radius shadow-lg">
      <view class="text-center text-lg text-grey">
        <u-avatar :src="useUser.avatar" mode="square" show-sex size="240" />
      </view>
      <view class="text-center margin-bottom-xl text-lg text-grey margin-top-sm"
        >UniApp Matrix Admin</view
      >
      <view class="text-content">
        <view>Hi！您好，开发者～ 欢迎使用 UniApp Matrix Admin 移动端跨平台模板！</view>
        <view class="margin-top-sm"
          >该模版为
          <u-tag text="UniApp Matrix Admin" mode="light" size="mini" class="margin-lr-xs" />
          精简版，您可直接用于开发，若您想要查看完整版，请访问
          <u-tag
            text="Github"
            mode="light"
            size="mini"
            class="margin-lr-xs"
            @click="copyAdminLink('Github')"
          />
          或者
          <u-tag
            text="Gitee"
            mode="light"
            size="mini"
            class="margin-lr-xs"
            @click="copyAdminLink('Gitee')"
          />进行查看。</view
        >
        <view class="margin-top-sm"
          >该项目的意图，是希望可以让开发者，能够快速的进行开发，生产。希望能够真正的做到开箱即用，节约搭建项目的成本，时间的成本，毕竟时间就是金钱。</view
        >
        <view class="margin-top-sm"
          >该项目是完全开源的，不收取任何费用，希望为开源社区贡献自己的一份努力。如果这个项目有帮到您，或者您觉得很
          🎉 ！您可以在
          <u-tag
            text="Github"
            mode="light"
            size="mini"
            class="margin-lr-xs"
            @click="copyLiteLink('Github')"
          />
          或者
          <u-tag
            text="Gitee"
            mode="light"
            size="mini"
            class="margin-lr-xs"
            @click="copyLiteLink('Gitee')"
          />
          中请作者喝杯咖啡，交个朋友。🙈</view
        >
      </view>
    </view>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        // 标题
        headerTitle: '',
        // 自定义 navBar 导航样式
        background: {
          'background-image': 'linear-gradient(45deg, rgb(90, 132, 244), rgb(137,111,236))'
        }
      }
    },
    computed: {
      ...mapGetters('user', ['useUser'])
    },
    onLoad() {
      this.headerTitle = this.$Route.meta.title
    },
    methods: {
      /**
       * Admin 演示版地址
       * @param {String} origin 镜像源
       * @author Matrix<matrix.zyh@gmail.com>
       */
      copyAdminLink(origin) {
        const link =
          origin === 'Github'
            ? 'https://github.com/matrix-zyh/uni-app-matrix-admin'
            : 'https://gitee.com/matrix-zyh/uni-app-matrix-admin'
        uni.setClipboardData({
          data: link,
          success: function () {
            uni.$u.toast(`${origin} 地址已复制！`, 1000)
          }
        })
      },

      /**
       * Admin 精简版地址
       * @param {String} origin 镜像源
       * @author Matrix<matrix.zyh@gmail.com>
       */
      copyLiteLink(origin) {
        const link =
          origin === 'Github'
            ? 'https://github.com/matrix-zyh/uni-app-admin-lite'
            : 'https://gitee.com/matrix-zyh/uni-app-admin-lite'
        uni.setClipboardData({
          data: link,
          success: function () {
            uni.$u.toast(`${origin} 地址已复制！`, 1000)
          }
        })
      }
    }
  }
</script>
