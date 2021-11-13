<template>
  <view>
    <u-navbar
      :title="headerTitle"
      :background="background"
      title-color="#fff"
      back-icon-color="#fff"
    />

    <u-index-list :scrollTop="-CustomBar" :index-list="indexList">
      <view v-for="(item, index) in list" :key="index">
        <u-index-anchor :index="item.letter" />
        <view class="list-cell u-border-bottom" v-for="(item1, index) in item.data" :key="index">
          {{ item1.name }}
        </view>
      </view>
    </u-index-list>
  </view>
</template>

<script>
  import indexList from '@/mock/user.js'

  const letterArr = indexList.list.map((val) => {
    return val.letter
  })

  export default {
    data() {
      return {
        CustomBar: this.CustomBar,
        // 标题
        headerTitle: '',
        // 动画
        toggleDelay: false,
        // 自定义 navBar 导航样式
        background: {
          'background-image': 'linear-gradient(45deg, rgb(90, 132, 244), rgb(137,111,236))'
        },
        // 定位
        scrollTop: 0,
        // 英文字母列表
        indexList: letterArr,
        list: indexList.list
      }
    },
    onLoad() {
      this.headerTitle = this.$Route.meta.title
    },
    onShow() {
      this.toggleDelay = true
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop
    }
  }
</script>

<style lang="scss" scoped>
  @import './user.scss';
</style>
