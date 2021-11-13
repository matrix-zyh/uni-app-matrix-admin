<template>
  <view>
    <u-navbar
      :title="headerTitle"
      :background="background"
      title-color="#fff"
      back-icon-color="#fff"
    />

    <search v-model="searchValue" @filter="searchFilter">
      <u-tabs
        :list="tabs"
        :is-scroll="false"
        :current="tabCurrent"
        active-color="#7A76EF"
        @change="tabChange"
      />
    </search>

    <view style="height: 70upx"></view>

    <view v-show="toggleDelay" class="padding">
      <block v-if="tabCurrent === 0">
        <view
          v-for="(item, index) in 10"
          :key="item"
          @click="commodityView"
          :style="[{ animationDelay: (index + 1) * 0.1 + 's' }]"
          :class="{ 'animation-slide-bottom': toggleDelay }"
          class="padding radius-20 bg-white"
        >
          <view class="commodity-header">
            <view class="commodity-header__title">艾草</view>
            <view><u-tag text="已入库" type="warning" /></view>
          </view>
          <view class="margin-top-xs">商品编号：MED2106250SDQ</view>
          <view class="margin-top-xs">总计：120件</view>
          <view class="commodity-footer margin-top-xs solid-top">
            <view class="commodity-footer__user">Matrix</view>
            <view class="commodity-footer__date">入库时间：2021-05-21 13:14:00</view>
          </view>
        </view>
      </block>
      <block v-else>
        <Empty />
      </block>
    </view>
    <view class="ios-safety"></view>
  </view>
</template>

<script>
  import Empty from '@/components/Empty.vue'
  import Search from '@/components/Search.vue'

  export default {
    components: { Empty, Search },
    data() {
      return {
        // 标题
        headerTitle: '',
        // 动画
        toggleDelay: false,
        // 自定义 navBar 导航样式
        background: {
          'background-image': 'linear-gradient(45deg, rgb(90, 132, 244), rgb(137,111,236))'
        },
        // 搜索框值
        searchValue: '',
        // tabs 标签
        tabs: [{ name: '已入库' }, { name: '已出库' }],
        // 当前所在 tab 索引
        tabCurrent: 0
      }
    },
    onLoad() {
      this.headerTitle = this.$Route.meta.title
    },
    onShow() {
      this.toggleDelay = true
    },
    methods: {
      /**
       * 搜索功能
       * @author Matrix<matrix.zyh@gmail.com>
       */
      searchFilter() {
        if (!this.$u.trim(this.searchValue)) return
        this.$u.toast(`搜索：${this.searchValue}`)
      },

      /**
       * tabs 切换回调
       * @param {Number} index tab索引
       * @author Matrix<matrix.zyh@gmail.com>
       */
      tabChange(index) {
        this.tabCurrent = index
      },

      /**
       * 查看商品详情
       * @author Matrix<matrix.zyh@gmail.com>
       */
      commodityView() {
        this.$Router.push({ name: 'commodity-detail', params: { title: '艾草' } })
      }
    },
    beforeRouteLeave(to, from, next) {
      this.toggleDelay = false
      next()
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/static/css/animation.css';
  @import './commodity.scss';
</style>
