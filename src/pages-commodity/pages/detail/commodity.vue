<template>
  <view>
    <u-navbar
      :title="headerTitle"
      :background="background"
      title-color="#fff"
      back-icon-color="#fff"
    />

    <view class="commodity-image">
      <image src="https://i.loli.net/2021/08/21/25MJvf7eZ1oWt6m.jpg" />
    </view>
    <view class="padding-lg bg-white">
      <view class="commodity-header">
        <view class="commodity-header__title">
          <text>碧螺春</text><text class="margin-left-lg">320g</text>
        </view>
        <view class="commodity-header__reserve">库存120件</view>
      </view>
      <view class="margin-top commodity-tip">
        <view class="commodity-code">商品编号：MED2106250SDQ</view>
        <view>
          <text class="commodity-symbol">¥</text>
          <text class="commodity-money">369</text>
          <text class="commodity-unit">/件</text>
        </view>
      </view>
    </view>

    <view class="margin-top-sm padding-lg bg-white">
      <view class="commodity-detail">
        <view class="commodity-detail__title">品牌</view>
        <view class="commodity-detail__content">鸿星尔克</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">产地</view>
        <view class="commodity-detail__content">中国大陆</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">省份</view>
        <view class="commodity-detail__content">辽宁省</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">工艺</view>
        <view class="commodity-detail__content">炒青绿茶</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">包装方式</view>
        <view class="commodity-detail__content">袋装</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">价格</view>
        <view class="commodity-detail__content">100～300元</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">厂家</view>
        <view class="commodity-detail__content">福建省和盛生物科技有限公司</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">厂家电话</view>
        <view class="commodity-detail__content">0595-26108906</view>
      </view>

      <view class="ios-safety"></view>
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
      this.headerTitle = this.$Route.query.title
    }
  }
</script>

<style lang="scss" scoped>
  @import './commodity.scss';
</style>
