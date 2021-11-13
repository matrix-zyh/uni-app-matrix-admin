<template>
  <view class="container">
    <u-navbar
      :title="headerTitle"
      :background="background"
      title-color="#fff"
      back-icon-color="#fff"
    />
    <image src="https://i.loli.net/2021/11/08/LrVieWHXYo7G9Ah.png"></image>
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

<style lang="scss" scoped>
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      width: 750rpx;
      height: 750rpx;
      margin-top: -100rpx;
    }
  }
</style>
