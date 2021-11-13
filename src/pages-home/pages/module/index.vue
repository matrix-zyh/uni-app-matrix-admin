<template>
  <view>
    <u-navbar
      :title="headerTitle"
      :background="background"
      title-color="#fff"
      back-icon-color="#fff"
    />

    <view class="content text-gray">
      <text>此处演示分包能力</text>
      <text>开发者, 现在您可以安心开发了</text>
      <text>您可以点我返回到首页</text>
      <u-button
        ripple
        type="primary"
        size="medium"
        :custom-style="{ backgroundColor: '#8b7df6' }"
        @click="$Router.back()"
        class="margin-top"
      >
        返回
      </u-button>
    </view>
  </view>
</template>

<script>
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
    onLoad() {
      this.headerTitle = this.$Route.meta.title
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 200upx 30upx 0 30upx;
    font-size: 40upx;
    text-align: center;
    line-height: 80upx;
    font-weight: bold;
  }
</style>
