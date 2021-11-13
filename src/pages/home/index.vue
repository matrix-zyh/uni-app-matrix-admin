<template>
  <view>
    <view class="bg-image">
      <image src="https://i.loli.net/2021/08/19/ud3erYbg6Pa8ExB.png" />
      <view
        :style="[{ width: '100%', height: CustomBar + 'px' }]"
        style="position: absolute; z-index: 1; top: 0"
      >
        <view :style="style">
          <view
            class="text-white"
            :style="[{ height: '100%', top: StatusBar + 'px' }]"
            style="font-size: 32upx; display: flex; align-items: center; justify-content: center"
            >{{ headerTitle }}</view
          >
        </view>
      </view>
      <view class="statistics">
        <text>统计时间：</text>
        <button @click="popupShow = true" class="cu-btn round line-white sm margin-left-xs"
          >{{ statisticsFilterText }}
          <text class="cuIcon-order margin-left-xs" />
        </button>
      </view>
    </view>

    <view v-show="toggleDelay" class="wrap">
      <view class="content">
        <view
          :style="[{ animationDelay: '0.1s' }]"
          :class="{ 'animation-slide-bottom': toggleDelay }"
          class="eye"
        >
          <view class="eye-list margin-bottom-xs">
            <view class="eye-main margin-bottom-sm">
              <view class="eye-main__title">应收金额</view>
              <view class="eye-main__icon">
                <image src="@/static/images/home/home-icon-ysje.png" />
              </view>
            </view>
            <view class="eye-money">¥1999.00</view>
          </view>
          <view class="eye-list margin-bottom-xs">
            <view class="eye-main margin-bottom-sm">
              <view class="eye-main__title">实收金额</view>
              <view class="eye-main__icon">
                <image src="@/static/images/home/home-icon-ssje.png" />
              </view>
            </view>
            <view class="eye-money">¥199.00</view>
          </view>
          <view class="eye-list">
            <view class="eye-main margin-bottom-sm">
              <view class="eye-main__title">订单总数</view>
              <view class="eye-main__icon">
                <image src="@/static/images/home/home-icon-ddzs.png" />
              </view>
            </view>
            <view class="eye-number">36</view>
          </view>
          <view class="eye-list">
            <view class="eye-main margin-bottom-sm">
              <view class="eye-main__title">待送货</view>
              <view class="eye-main__icon">
                <image src="@/static/images/home/home-icon-dsh.png" />
              </view>
            </view>
            <view class="eye-number">9</view>
          </view>
        </view>

        <view
          :style="[{ animationDelay: '0.2s' }]"
          :class="{ 'animation-slide-bottom': toggleDelay }"
          class="notice"
        >
          <u-notice-bar
            mode="horizontal"
            :more-icon="true"
            :list="notices"
            @getMore="getMore"
          ></u-notice-bar>
        </view>

        <view
          :style="[{ animationDelay: '0.3s' }]"
          :class="{ 'animation-slide-bottom': toggleDelay }"
          class="eChart"
        >
          <view class="eChart-layout">
            <view class="eChart-header">
              <text class="eChart-header__title">订单状态统计</text>
              <text class="eChart-header__text">近7天</text>
            </view>
            <view class="eChart-content">
              <view class="eChart-radius"></view>
            </view>
          </view>
          <view class="eChart-layout margin-top-xl">
            <view class="eChart-header">
              <text class="eChart-header__title">库存信息</text>
              <text class="eChart-header__text">近7天</text>
            </view>
            <view class="eChart-content">
              <view class="eChart-radius"></view>
            </view>
          </view>
        </view>

        <view
          :style="[{ animationDelay: '0.4s' }]"
          :class="{ 'animation-slide-bottom': toggleDelay }"
          class="new-order"
        >
          <view class="order-header">
            <text class="order-header__title">最新订单</text>
            <text class="order-header__text">近7天</text>
          </view>
          <view class="order-content">
            <view v-for="item in 5" :key="item" class="order-list">
              <view class="order-list__title">
                <text class="cuIcon-warn text-green"></text>
                <text class="margin-left-sm" style="color: #354052">西湖龙井</text>
                <view class="margin-left-lg"
                  ><u-tag size="mini" mode="plain" text="已下单" type="success"
                /></view>
              </view>
              <view style="color: #999999">2021-05-21 13:14:00</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <u-popup v-model="popupShow" mode="bottom" border-radius="36" safe-area-inset-bottom>
      <view class="padding-xl">
        <view class="text-lg" style="color: #222">选择时间区间</view>
        <view class="statistics-date">
          <view class="text-lg" style="color: #222; margin-top: 80upx">时间</view>
          <view class="statistics-content">
            <view
              v-for="item in statisticsDate"
              :key="item.value"
              @click="chooseTime(item.value)"
              :class="
                timeFilter === item.value
                  ? 'statistics-content__list-select'
                  : 'statistics-content__list'
              "
            >
              <view
                :class="
                  timeFilter === item.value
                    ? 'statistics-content__list-select__text'
                    : 'statistics-content__list-text'
                "
                >{{ item.title }}</view
              >
            </view>
            <button @click="$u.throttle(customDate, 800)" class="cu-btn round statistics-btn">
              自定义
              <text class="cuIcon-unfold margin-left-xs" />
            </button>
          </view>
        </view>
        <view
          v-if="customShow"
          class="margin-top-lg"
          :class="{ 'animation-scale-up': animationName, 'animation-reverse': !animationReverse }"
        >
          <view class="statistics-custom">
            <view class="statistics-custom__start-end">
              <view class="statistics-custom__start-end-title">开始时间</view>
              <view class="statistics-custom__start-end-date">
                <view class="statistics-custom__start-end-date__text">
                  <u-input
                    type="text"
                    v-model="startTime"
                    :placeholder="placeholder"
                    disabled
                    @click=";(dateType = 'startTime'), (pickerShow = true)"
                  />
                </view>
                <view class="statistics-custom__start-end-date__icon">
                  <image src="@/static/images/home/home-icon-date.png" />
                </view>
              </view>
            </view>
            <view style="height: 94upx; display: flex; align-items: flex-end">至</view>
            <view class="statistics-custom__start-end">
              <view class="statistics-custom__start-end-title">结束时间</view>
              <view class="statistics-custom__start-end-date">
                <view class="statistics-custom__start-end-date__text">
                  <u-input
                    type="text"
                    v-model="endTime"
                    :placeholder="placeholder"
                    disabled
                    @click=";(dateType = 'endTime'), (pickerShow = true)"
                  />
                </view>
                <view class="statistics-custom__start-end-date__icon">
                  <image src="@/static/images/home/home-icon-date.png" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="statistics-footer solid-top">
        <button @click="conditionClear" class="cu-btn button-grey"> 清空条件 </button>
        <button @click="conditionConfirm" class="cu-btn button-purple"> 确认 </button>
      </view>
    </u-popup>

    <u-picker mode="time" v-model="pickerShow" @confirm="dateConfirm"></u-picker>

    <u-tabbar :list="useRoutes" :mid-button="false"></u-tabbar>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        StatusBar: this.StatusBar,
        CustomBar: this.CustomBar,
        // 标题
        headerTitle: '',
        toggleDelay: false,
        // banner 统计筛选文本
        statisticsFilterText: '',
        // 通知 滚动播放内容
        notices: ['寒雨连江夜入吴', '平明送客楚山孤', '洛阳亲友如相问', '一片冰心在玉壶'],
        // 抽屉 显示/隐藏
        popupShow: false,
        // 筛选中 统计项列表选项
        statisticsDate: [
          { value: '一周内', title: '一周内' },
          { value: '一月内', title: '一月内' },
          { value: '三月内', title: '三月内' },
          { value: '半年内', title: '半年内' },
          { value: '一年内', title: '一年内' }
        ],
        placeholder: '',
        // 默认动画
        animationName: false,
        // 动画反转
        animationReverse: false,
        // 时间 显示/隐藏
        pickerShow: false,
        // 筛选 开始时间
        startTime: null,
        // 筛选 结束时间
        endTime: '',
        // 时间回调之时，时间的类型
        dateType: '',
        // 标识，当前选中的是筛选项标识
        timeFilter: '',
        // 自定义时间筛选项
        customShow: false
      }
    },
    computed: {
      ...mapGetters('user', ['useUser', 'useRoutes']),

      style() {
        var StatusBar = this.StatusBar
        var CustomBar = this.CustomBar
        var style = `height: ${CustomBar}px; padding-top: ${StatusBar}px;`
        return style
      },

      chooseTime_block() {
        return (value) =>
          this.timeFilter === value ? 'statistics-content__list-select' : 'statistics-content__list'
      },

      chooseTime_text() {
        return (value) =>
          this.timeFilter === value
            ? 'statistics-content__list-select__text'
            : 'statistics-content__list-text'
      }
    },
    onLoad() {
      this.headerTitle = this.$Route.meta.title
      // 筛选项默认值，默认筛选项的第一个值
      this.statisticsFilterText = this.timeFilter = this.statisticsDate[0].title
    },
    onShow() {
      this.toggleDelay = true
    },
    methods: {
      /**
       * notice 通知右侧箭头回调
       * @author Matrix<matrix.zyh@gmai.com>
       */
      getMore() {
        this.$u.toast('通知滚动横幅点击事件！')
      },

      /**
       * 筛选中自定义按钮点击事件
       * @author Matrix<matrix.zyh@gmai.com>
       */
      customDate() {
        this.animationName = true
        this.animationReverse = !this.customShow
        if (!this.customShow) {
          this.customShow = true
          setTimeout(() => {
            this.placeholder = '请选择'
            this.animationName = false
          }, 500)
        } else {
          setTimeout(() => {
            this.customShow = false
            this.animationName = false
            this.startTime = null
            this.endTime = null
            this.placeholder = ''
          }, 650)
        }
      },

      /**
       * 选择自定义时间点击事件
       * @param {String} value statisticsDate中的value值
       * @author Matrix<matrix.zyh@gmai.com>
       */
      chooseTime(value) {
        this.timeFilter = value
      },

      /**
       * 筛选 选择时间确认回调
       * @param {String} year 年
       * @param {String} month 月
       * @param {String} day 日
       * @author Matrix<matrix.zyh@gmai.com>
       */
      dateConfirm({ year, month, day }) {
        this.$set(this, `${this.dateType}`, `${year}-${month}-${day}`)
      },

      /**
       * 清空按钮点击事件
       * @author Matrix<matrix.zyh@gmai.com>
       */
      conditionClear() {
        this.timeFilter = this.statisticsDate[0].title
        this.startTime = null
        this.endTime = null
      },

      /**
       * 确认按钮点击事件
       * @author Matrix<matrix.zyh@gmai.com>
       */
      conditionConfirm() {
        if (this.customShow) {
          if (this.startTime && this.endTime) {
            this.statisticsFilterText = '自定义'
          } else {
            this.statisticsFilterText = this.timeFilter
          }
        } else {
          this.statisticsFilterText = this.timeFilter
        }
        this.popupShow = false
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

  /deep/ .u-input__input {
    padding: 0 20upx;
  }
</style>
