<template>
  <view>
    <u-navbar
      :title="headerTitle"
      :background="background"
      title-color="#fff"
      back-icon-color="#fff"
    />

    <search v-model="searchValue" @filter="searchFilter" />

    <view class="padding ios-safety-btn-100">
      <u-checkbox-group size="50" @change="checkboxGroupChange">
        <view v-for="(item, index) in commodityList" :key="index" style="border-radius: 10upx">
          <u-checkbox v-model="item.checked" :name="item.name">
            <view @click.stop="" class="commodity-list margin-left-sm">
              <view class="commodity-title">
                <view>{{ item.name }}</view>
                <view class="commodity-reserve">{{ `库存：${item.reserve}` }}</view>
              </view>
              <view class="commodity-content">
                <view class="commodity-image">
                  <image src="https://i.loli.net/2021/08/21/25MJvf7eZ1oWt6m.jpg" />
                </view>
                <view class="commodity-info">
                  <view class="commodity-classify">
                    <u-input
                      type="select"
                      v-model="item.classifyName"
                      height="45"
                      placeholder="请选择"
                      :select-open="item.show"
                      disabled
                      @click="chooseClassify(item.id)"
                    />
                    <u-select
                      v-model="item.show"
                      :list="item.classifyList"
                      @confirm="classifyConfirm"
                    ></u-select>
                  </view>
                  <view>
                    <u-number-box
                      v-model="item.number"
                      :max="item.reserve"
                      @change="numberChange"
                    ></u-number-box>
                  </view>
                  <view class="commodity-money">
                    <text class="margin-right-xs text-sm">¥</text>
                    <text class="text-lg">76.00</text>
                  </view>
                </view>
              </view>
            </view>
          </u-checkbox>
        </view>
      </u-checkbox-group>
    </view>

    <view class="commodity-footer ios-safety">
      <view class="commodity-footer__block">
        <view class="commodity-footer__text margin-left">{{
          `选中 ${checkboxValues.length} 件商品`
        }}</view>
        <view class="commodity-footer__btn">添加</view>
      </view>
    </view>
  </view>
</template>

<script>
  import Search from '@/components/Search.vue'
  import goodsList from '@/mock/commodity-list'

  export default {
    components: { Search },
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
        // 控制商品分类下拉 打开/关闭
        classifyShow: false,
        // 商品分类列表
        classifyList: [],
        // 用于临时存储 商品的 id
        commodityId: '',
        // 商品列表
        commodityList: goodsList,
        // 选中的商品
        checkboxValues: []
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
       * 选择商品类别
       * @param {String} id 商品id
       * @author Matrix<matrix.zyh@gmail.com>
       */
      chooseClassify(id) {
        this.commodityId = id
        this.commodityList.forEach((element) => {
          if (element.id === id) {
            element.show = true
          }
        })
      },

      /**
       * 选择商品分类确认回调
       * @param {Array} e 选择商品分类数组[单例模式，所以直接e[0] 取第一个即可]
       * @author Matrix<matrix.zyh@gmail.com>
       */
      classifyConfirm(e) {
        this.commodityList.forEach((element) => {
          if (element.id === this.commodityId) {
            element.classifyId = e[0].value
            element.classifyName = e[0].label
            element.show = false
          }
        })
      },

      /**
       * 选中任一checkbox时，由checkbox-group触发
       * @param {Array} values checkbox[name]集合
       * @author Matrix<matrix.zyh@gmail.com>
       */
      checkboxGroupChange(values) {
        this.checkboxValues = values
      },

      /**
       * 计数器回调
       * @param {Number} value 当前计数器的值
       * @author Matrix<matrix.zyh@gmail.com>
       */
      numberChange({ value }) {}
    },
    beforeRouteLeave(to, from, next) {
      this.toggleDelay = false
      next()
    }
  }
</script>

<style lang="scss" scoped>
  @import './commodity.scss';
</style>
