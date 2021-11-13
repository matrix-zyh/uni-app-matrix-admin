<template>
  <view>
    <u-navbar :is-back="false" :title="headerTitle" :background="background" title-color="#fff" />

    <view v-show="toggleDelay">
      <view class="flex">
        <view
          :style="[{ animationDelay: '0.1s' }]"
          :class="{ 'animation-slide-bottom': toggleDelay }"
          class="flex-sub bg-gradual-blue padding margin-sm shadow-blur classify-enter"
        >
          <view class="text-xl">新增用户</view>
          <view class="margin-top-xm text-eee">用户管理</view>
          <view class="margin-top">
            <button @click="userEnter" class="cu-btn round line-white">录入</button>
          </view>
        </view>
        <view
          :style="[{ animationDelay: '0.2s' }]"
          :class="{ 'animation-slide-bottom': toggleDelay }"
          class="flex-sub bg-gradual-blue padding margin-sm shadow-blur classify-enter"
        >
          <view class="text-xl">用户列表</view>
          <view class="margin-top-xm text-eee">用户管理</view>
          <view class="margin-top">
            <button @click="userList" class="cu-btn round line-white">查看</button>
          </view>
        </view>
      </view>

      <view class="flex">
        <view
          :style="[{ animationDelay: '0.3s' }]"
          :class="{ 'animation-slide-bottom': toggleDelay }"
          class="flex-sub bg-gradual-blue padding margin-sm shadow-blur user-enter"
        >
          <view class="text-xl">新增订单</view>
          <view class="margin-top-xm text-eee">商品订单</view>
          <view class="margin-top">
            <button @click="orderEnter" class="cu-btn round line-white">录入</button>
          </view>
        </view>
        <view
          :style="[{ animationDelay: '0.4s' }]"
          :class="{ 'animation-slide-bottom': toggleDelay }"
          class="flex-sub bg-gradual-blue padding margin-sm shadow-blur user-list"
        >
          <view class="text-xl">订单列表</view>
          <view class="margin-top-xm text-eee">商品订单</view>
          <view class="margin-top">
            <button @click="orderList" class="cu-btn round line-white">查看</button>
          </view>
        </view>
      </view>
    </view>

    <u-tabbar :list="useRoutes" :mid-button="false"></u-tabbar>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        // 标题
        headerTitle: '',
        // 动画
        toggleDelay: false,
        // 自定义 navBar 导航样式
        background: {
          'background-image': 'linear-gradient(45deg, rgb(90, 132, 244), rgb(137,111,236))'
        }
      }
    },
    computed: {
      ...mapGetters('user', ['useRoutes'])
    },
    onLoad() {
      this.headerTitle = this.$Route.meta.title
    },
    onShow() {
      this.toggleDelay = true
    },
    methods: {
      /**
       * 录入用户
       * @author Matrix<matrix.zyh@gmail.com>
       */
      userEnter() {
        this.$Router.push({ name: 'user-edit' })
      },

      /**
       * 查看用户列表
       * @author Matrix<matrix.zyh@gmail.com>
       */
      userList() {
        this.$Router.push({ name: 'user-list' })
      },

      /**
       * 订单录入
       * @author Matrix<matrix.zyh@gmail.com>
       */
      orderEnter() {
        this.$Router.push({ name: 'order-edit' })
      },

      /**
       * 订单录入
       * @author Matrix<matrix.zyh@gmail.com>
       */
      orderList() {
        this.$Router.push({ name: 'order-list' })
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.path !== from.path) {
        this.toggleDelay = false
        next()
      } else {
        next(false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/static/css/animation.css';
  @import './index.scss';
</style>
