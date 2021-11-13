<template>
  <view>
    <u-navbar
      :title="headerTitle"
      :background="background"
      title-color="#fff"
      back-icon-color="#fff"
    />

    <view class="user-info padding-top padding-lr">
      <image src="@/static/images/order/user.png" />
      <view class="user-info__text">买家信息</view>
    </view>
    <view class="padding-tb padding-lr-xl bg-white">
      <view class="form-edit radius bg-white">
        <u-form
          :model="form"
          ref="uForm"
          :error-type="['message', 'border']"
          label-position="top"
          :border-bottom="false"
        >
          <u-form-item label="购买时间" required prop="dateTime" :border-bottom="false">
            <view class="order-time padding-lr-sm">
              <u-input
                v-model="form.dateTime"
                placeholder="请选择"
                disabled
                @click="pickerShow = true"
              />
              <view class="order-time__img">
                <image src="@/static/images/home/home-icon-date.png" />
              </view>
            </view>
          </u-form-item>
          <u-form-item label="用户地址" :border-bottom="false">
            <u-input
              type="select"
              v-model="form.province"
              placeholder="请选择"
              border
              disabled
              @click="citySelectShow = true"
            />
          </u-form-item>
          <u-form-item label="详细地址" :border-bottom="false">
            <u-input
              type="textarea"
              height="120"
              v-model="form.address"
              placeholder="请输入"
              border
            />
          </u-form-item>
          <u-form-item label="备注" :border-bottom="false">
            <u-input
              type="textarea"
              height="120"
              v-model="form.remark"
              placeholder="请输入"
              border
            />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <u-picker mode="time" v-model="pickerShow" :default-time="defaultTime" @confirm="dateConfirm" />
    <city-select
      v-model="citySelectShow"
      :defaultRegion="defaultRegion"
      @city-change="cityChange"
    />

    <view class="user-info padding margin-top-sm">
      <image src="@/static/images/order/commodity.png" />
      <view class="user-info__text">商品信息</view>
    </view>
    <view class="order-commodity padding">
      <block v-for="item in commodityList" :key="item.id">
        <view class="order-commodity__list padding">
          <view class="order-commodity__image">
            <image src="https://i.loli.net/2021/08/21/25MJvf7eZ1oWt6m.jpg" />
          </view>
          <view class="order-commodity__info">
            <view class="order-commodity__info-header">
              <view class="order-commodity__info-header__title">{{ item.name }}</view>
              <view class="order-commodity__info-header__reserve">{{
                `库存：${item.reserve}`
              }}</view>
            </view>
            <view class="order-commodity__info-classify">
              <u-input
                type="select"
                v-model="item.classifyName"
                height="45"
                placeholder="请选择"
                :select-open="item.show"
                disabled
                @click="chooseClassify(item.id)"
              />
              <u-select v-model="item.show" :list="item.classifyList" @confirm="classifyConfirm" />
            </view>
            <view class="order-commodity__info-footer">
              <view class="order-commodity__info-footer__money">
                <text class="margin-right-xs text-sm">¥</text>
                <text class="text-lg">76.00</text>
              </view>
              <view class="order-commodity__info-footer__number">
                <u-number-box
                  v-model="item.number"
                  :max="item.reserve"
                  bg-color="#ff6d00"
                  color="#fff"
                  @change="numberChange"
                />
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>
    <view class="bg-white order-add-btn u-border-top">
      <view @click="commodityAdd">
        <u-icon name="plus" color="#896FEC" />
        <text class="margin-left-xs" style="color: #896fec">添加商品</text>
      </view>
    </view>

    <view class="confirm-button padding">
      <button @click="confirmEnter" class="cu-btn round block button-purple lg"> 确认录入 </button>
    </view>
    <view class="ios-safety"></view>
  </view>
</template>

<script>
  import CitySelect from '@/components/CitySelect.vue'
  import { formatDate } from '@/utils/tools'
  import goodsList from '@/mock/commodity-list'

  export default {
    components: { CitySelect },
    data() {
      return {
        // 标题
        headerTitle: '',
        // 自定义 navBar 导航样式
        background: {
          'background-image': 'linear-gradient(45deg, rgb(90, 132, 244), rgb(137,111,236))'
        },
        // 默认时间
        defaultTime: formatDate(),
        form: {
          // 购买时间
          dateTime: '',
          // 省市区
          province: '',
          // 详细地址
          address: '',
          // 备注
          remark: ''
        },
        // 时间 显示/隐藏
        pickerShow: false,
        // 控制城市联级选择 弹出/关闭
        citySelectShow: false,
        // 默认城市
        defaultRegion: ['辽宁省', '大连市', '西岗区'],

        // 控制商品分类下拉 打开/关闭
        classifyShow: false,
        // 商品分类列表
        classifyList: [],
        // 用于临时存储 商品的 id
        commodityId: '',
        // 商品列表
        commodityList: goodsList,
        // 校验规则
        rules: {
          dateTime: [{ required: true, message: '请选择购买时间！', trigger: 'change' }]
        }
      }
    },
    onLoad() {
      this.headerTitle = this.$Route.meta.title
    },
    methods: {
      /**
       * 筛选 选择时间确认回调
       * @param {String} year 年
       * @param {String} month 月
       * @param {String} day 日
       * @author Matrix<matrix.zyh@gmai.com>
       */
      dateConfirm({ year, month, day }) {
        this.$set(this.form, 'dateTime', `${year}-${month}-${day}`)
      },

      /**
       * 选择城市回调
       * @param {Object} province 省份
       * @param {Object} city 城市
       * @param {Object} area 区县
       * @author Matrix<matrix.zyh@gmai.com>
       */
      cityChange({ province, city, area }) {
        this.$set(this.form, 'province', `${province.label}-${city.label}-${area.label}`)
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
       * 计数器回调
       * @param {Number} value 当前计数器的值
       * @author Matrix<matrix.zyh@gmail.com>
       */
      numberChange({ value }) {},

      /**
       * 添加订单商品
       * @author Matrix<matrix.zyh@gmai.com>
       */
      commodityAdd() {
        this.$Router.push({ name: 'order-choose-commodity' })
      },

      /**
       * 确认录入
       * @author Matrix<matrix.zyh@gmai.com>
       */
      confirmEnter() {
        this.$refs.uForm.validate((valid) => {
          if (valid) {
            this.$u.toast('商品录入成功！')
            setTimeout(() => {
              this.$Router.back(1)
            }, 1500)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './order.scss';
</style>
