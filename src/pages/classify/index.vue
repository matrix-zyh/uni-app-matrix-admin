<template>
  <view>
    <u-navbar :is-back="false" :title="headerTitle" :background="background" title-color="#fff" />

    <view v-show="toggleDelay" class="flex">
      <view
        :style="[{ animationDelay: '0.1s' }]"
        :class="{ 'animation-slide-bottom': toggleDelay }"
        class="flex-sub bg-gradual-blue padding margin-sm shadow-blur classify-enter"
      >
        <view class="text-xl">录入商品分类</view>
        <view class="margin-top-xm text-eee">商品分类</view>
        <view class="margin-top">
          <button @click="enterProductCategory" class="cu-btn round line-white">录入</button>
        </view>
      </view>
      <view
        :style="[{ animationDelay: '0.2s' }]"
        :class="{ 'animation-slide-bottom': toggleDelay }"
        class="flex-sub bg-gradual-purple padding margin-sm shadow-blur classify-list"
      >
        <view class="text-xl">商品分类列表</view>
        <view class="margin-top-xm text-eee">商品分类</view>
        <view class="margin-top">
          <button @click="viewProductList" class="cu-btn round line-white">查看</button>
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
       * 录入商品信息
       * @author Matrix<matrix.zyh@gmail.com>
       */
      enterProductCategory() {
        this.$Router.push({ name: 'good-classify-edit' })
      },

      /**
       * 商品列表
       * @author Matrix<matrix.zyh@gmail.com>
       */
      viewProductList() {
        this.$Router.push({ name: 'good-classify-list' })
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
