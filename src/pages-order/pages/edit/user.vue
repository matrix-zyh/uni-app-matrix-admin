<template>
  <view>
    <u-navbar
      :title="headerTitle"
      :background="background"
      title-color="#fff"
      back-icon-color="#fff"
    />
    <view class="padding">
      <view
        :style="[{ animationDelay: '0.1s' }]"
        :class="{ 'animation-slide-bottom': toggleDelay }"
        class="form-edit radius bg-white"
      >
        <u-form
          :model="user"
          ref="uForm"
          :error-type="['message', 'border']"
          label-position="top"
          :border-bottom="false"
        >
          <u-form-item label="用户姓名" prop="name" required :border-bottom="false">
            <u-input v-model="user.name" placeholder="请输入" border />
          </u-form-item>
          <u-form-item label="用户性别" prop="sex" required :border-bottom="false">
            <u-radio-group v-model="user.sex" size="50" width="50%">
              <u-radio v-for="item in sexList" :key="item.id" :name="item.label">
                {{ item.label }}
              </u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="用户电话" prop="mobile" required :border-bottom="false">
            <u-input v-model="user.mobile" placeholder="请输入" border />
          </u-form-item>
          <u-form-item label="用户姓名首字母" prop="letter" required :border-bottom="false">
            <u-input
              type="select"
              v-model="user.letter"
              :select-open="letterSelectShow"
              placeholder="请选择"
              border
              @click="letterSelectShow = true"
            />
          </u-form-item>
          <u-form-item label="用户地址" :border-bottom="false">
            <u-input
              type="select"
              v-model="user.province"
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
              v-model="user.address"
              placeholder="请输入"
              border
            />
          </u-form-item>
        </u-form>
      </view>
    </view>

    <u-select v-model="letterSelectShow" :list="letterList" @confirm="letterChange" />
    <city-select
      v-model="citySelectShow"
      :defaultRegion="defaultRegion"
      @city-change="cityChange"
    />

    <view
      :style="[{ animationDelay: '0.2s' }]"
      :class="{ 'animation-slide-bottom': toggleDelay }"
      class="confirm-button ios-safety"
    >
      <button
        @click="confirm"
        class="cu-btn round block button-purple margin-top-xs margin-bottom lg"
      >
        确认录入
      </button>
    </view>
  </view>
</template>

<script>
  import { letter } from '@/utils/projectUtils'
  import CitySelect from '@/components/CitySelect.vue'

  export default {
    components: { CitySelect },
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
        // 表单数据
        user: {
          // 姓名
          name: '',
          // 性别
          sex: '',
          // 手机号
          mobile: '',
          // 姓名首字母
          letter: '',
          // 城市
          province: '',
          // 地址
          address: ''
        },
        // 性别列表
        sexList: [
          { id: 1, label: '男', value: '1' },
          { id: 2, label: '女', value: '0' }
        ],
        // 控制商品单位下拉框 弹出/关闭
        letterSelectShow: false,
        // 商品单位列表
        letterList: letter,
        // 控制城市联级选择 弹出/关闭
        citySelectShow: false,
        // 默认城市
        defaultRegion: ['辽宁省', '大连市', '西岗区'],
        // 校验规则
        rules: {
          name: [{ required: true, message: '请填写用户姓名！', trigger: 'blur' }],
          sex: [{ required: true, message: '请选择用户性别！', trigger: 'change' }],
          mobile: [{ required: true, message: '请填写用户手机号码！', trigger: 'blur' }],
          letter: [{ required: true, message: '请选择用户姓名首字母！', trigger: 'change' }]
        }
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
       * 商品单位变更回调事件
       * @param {Array} values 选择的商品单位[返回数组，取第一个即可]
       * @author Matrix<matrix.zyh@gmai.com>
       */
      letterChange(values) {
        this.$set(this.user, 'letter', values[0].label)
      },

      /**
       * 选择城市回调
       * @param {Object} province 省份
       * @param {Object} city 城市
       * @param {Object} area 区县
       * @author Matrix<matrix.zyh@gmai.com>
       */
      cityChange({ province, city, area }) {
        this.$set(this.user, 'province', `${province.label}-${city.label}-${area.label}`)
      },

      /**
       * 确认按钮点击事件
       * @author Matrix<matrix.zyh@gmai.com>
       */
      confirm() {
        this.$refs.uForm.validate((valid) => {
          if (valid) {
            this.$u.toast('用户新增成功！')
            setTimeout(() => {
              this.$Router.back(1)
            }, 1500)
          }
        })
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
  @import './user.scss';
</style>
