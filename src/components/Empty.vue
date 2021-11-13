<template>
  <view class="container">
    <view v-show="isEmpty" class="empty-content">
      <view class="empty-image">
        <image :src="icon" />
      </view>
      <view class="empty-text">
        <text class="empty-text">{{ message }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'Empty',
    props: {
      icon: {
        type: String,
        required: false,
        default: require('@/static/images/empty/empty.png')
      },
      message: {
        type: String,
        required: false,
        default: '系统没有查询到您想要的信息~'
      }
    },
    data() {
      return {
        isEmpty: false
      }
    },
    created() {
      this.isEmpty = false
      setTimeout(() => {
        this.isEmpty = true
      }, 100)
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;

    .empty-content {
      width: 100%;
      margin-top: 250upx;

      .empty-image {
        width: 100%;
        display: flex;
        justify-content: center;

        image {
          width: 400rpx;
          height: 400rpx;
        }
      }

      .empty-text {
        width: 100%;
        font-size: 28upx;
        color: #abaab3;
        margin-top: 20upx;
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
