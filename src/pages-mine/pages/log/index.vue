<template>
  <view>
    <u-navbar :title="headerTitle" :background="background" title-color="#fff" />

    <view class="page-content">
      <version-log>
        <view slot="version">v1.0.0</view>
        <view slot="date">2021-11-11</view>
        <view
          >🎉 Create a mobile cross-platform project template based on uni-app uni-app-matrix-admin
          v1.0.0</view
        >
        <u-line color="info" border-style="dashed" :hair-line="false" margin="30rpx 0" />
        <view>🎉 创建 基于 uni-app 移动端跨平台项目演示模板 uni-app-matrix-admin v1.0.0</view>
      </version-log>
    </view>
  </view>
</template>

<script>
  import VersionLog from '@/components/VersionLog'

  export default {
    components: { VersionLog },
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
    onLoad() {
      this.headerTitle = this.$Route.meta.title
    }
  }
</script>
