<template>
  <view>
    <u-navbar
      :title="headerTitle"
      :background="background"
      title-color="#fff"
      back-icon-color="#fff"
    />

    <view>
      <view v-for="item in 3" :key="item" class="order-commodity u-border-bottom">
        <view class="order-commodity__list padding">
          <view class="order-commodity__image">
            <image src="https://i.loli.net/2021/08/21/25MJvf7eZ1oWt6m.jpg" />
          </view>
          <view class="order-commodity__info">
            <view class="order-commodity__info-header">碧螺春礼盒装 400g</view>
            <view class="order-commodity__info-status">
              <u-tag text="待交易" type="warning" />
              <text class="order-commodity__info-status__number">x 10</text>
            </view>
            <view class="order-commodity__info-footer">
              <view class="order-commodity__info-footer__money">
                <text class="margin-right-xs text-sm">¥</text>
                <text class="text-lg">76.00</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="margin-top-sm padding-lg bg-white">
      <view class="commodity-detail">
        <view class="commodity-detail__title">交易流水</view>
        <view class="commodity-detail__content">JFKG89385NDF934895JD</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">下单时间</view>
        <view class="commodity-detail__content">2021-05-21 13:14:00</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">商品总价</view>
        <view class="commodity-detail__content">999元</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">实际收款</view>
        <view class="commodity-detail__content">888元</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">支付方式</view>
        <view class="commodity-detail__content">微信支付</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">所在地址</view>
        <view class="commodity-detail__content">辽宁省-大连市-沙河口区</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">详细地址</view>
        <view class="commodity-detail__content">大黑石 枫叶职业技术学院 14级 520室</view>
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">备注</view>
        <view class="commodity-detail__content"
          >总要备注点什么，这人已经是老客户了，下次给他卖便宜点。</view
        >
      </view>
      <view class="commodity-detail">
        <view class="commodity-detail__title">下单人</view>
        <view class="commodity-detail__content">Matrix</view>
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
  @import './order.scss';
</style>
