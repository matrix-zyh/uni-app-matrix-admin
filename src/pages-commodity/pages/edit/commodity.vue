<template>
  <view>
    <u-navbar
      :title="headerTitle"
      :background="background"
      title-color="#fff"
      back-icon-color="#fff"
    />

    <view v-show="toggleDelay" class="padding">
      <view
        :style="[{ animationDelay: '0.1s' }]"
        :class="{ 'animation-slide-bottom': toggleDelay }"
        class="form-edit radius bg-white"
      >
        <u-form
          :model="form"
          ref="uForm"
          :error-type="['message', 'border']"
          label-position="top"
          :border-bottom="false"
        >
          <u-form-item label="商品名称" prop="name" required :border-bottom="false">
            <u-input v-model="form.name" placeholder="请输入" border />
          </u-form-item>
          <u-form-item label="商品分类" prop="typeName" required :border-bottom="false">
            <u-input
              type="select"
              v-model="form.typeName"
              :select-open="classifySelectShow"
              placeholder="请选择"
              border
              @click="classifySelectShow = true"
            />
          </u-form-item>
          <u-form-item label="商品单位" prop="unit" required :border-bottom="false">
            <u-input
              type="select"
              v-model="form.unit"
              :select-open="unitSelectShow"
              placeholder="请选择"
              border
              @click="unitSelectShow = true"
            />
          </u-form-item>
          <u-form-item label="商品单价" prop="price" required :border-bottom="false">
            <u-input v-model="form.price" placeholder="请输入" border />
          </u-form-item>
          <u-form-item label="初始库存" prop="stock" required :border-bottom="false">
            <u-input v-model="form.stock" placeholder="请输入" border />
          </u-form-item>
          <u-form-item label="活动价格" prop="activity_price" required :border-bottom="false">
            <u-input v-model="form.activity_price" placeholder="请输入" border />
          </u-form-item>
        </u-form>
      </view>
    </view>

    <u-select
      mode="mutil-column-auto"
      v-model="classifySelectShow"
      :list="classifyList"
      @confirm="classifyChange"
    />
    <u-select v-model="unitSelectShow" :list="unitList" @confirm="unitChange" />

    <view
      v-show="toggleDelay"
      :style="[{ animationDelay: '0.2s' }]"
      :class="{ 'animation-slide-bottom': toggleDelay }"
      class="confirm-button padding"
    >
      <button @click="confirm" class="cu-btn round block button-purple lg"> 确认录入 </button>
    </view>
    <view class="ios-safety"></view>

    <u-modal
      title="温馨提示"
      content="是否确认创建该商品？"
      v-model="modalShow"
      show-cancel-button
      @confirm="modalConfirm"
      :async-close="true"
    />
  </view>
</template>

<script>
  import goodUnit from '@/mock/good-unit'
  import goodClassify from '@/mock/good-classify'

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
        },
        // 表单数据
        form: {
          // 商品名称
          name: '',
          // 商品分类 Id
          type: '',
          // 商品分类名称
          typeName: '',
          // 商品单位
          unit: '',
          // 商品单价
          price: '',
          // 初始库存
          stock: '',
          // 活动价格
          activity_price: ''
        },
        // 控制商品分类下拉框 弹出/关闭
        classifySelectShow: false,
        // 商品分类列表
        goodClassify,
        classifyList: [],
        // 控制商品单位下拉框 弹出/关闭
        unitSelectShow: false,
        // 商品单位列表
        unitList: goodUnit,
        // 校验规则
        rules: {
          name: [{ required: true, message: '请填写商品名称！', trigger: 'blur' }],
          typeName: [{ required: true, message: '请选择商品分类！', trigger: 'change' }],
          unit: [{ required: true, message: '请选择商品单位！', trigger: 'change' }],
          price: [{ required: true, message: '请填写商品单价！', trigger: 'blur' }],
          stock: [{ required: true, message: '请填写初始库存！', trigger: 'blur' }],
          activity_price: [{ required: true, message: '请填写活动价格！', trigger: 'blur' }]
        },
        // 模态框
        modalShow: false
      }
    },
    onLoad() {
      this.headerTitle = this.$Route.meta.title
      this.initData()
    },
    onShow() {
      this.toggleDelay = true
    },
    methods: {
      /**
       * 商品添加初始化 (商品分类)
       * @author Matrix<matrix.zyh@gmai.com>
       */
      initData() {
        // 拼装商品分类的级联选择数据格式
        for (const v of this.goodClassify) {
          const items = {}
          items.value = v.value
          items.label = v.label
          items.children = v.child
          this.classifyList.push(items)
        }
      },

      /**
       * 商品分类变更回调事件
       * @param {Array} values 选择的商品分类[返回数组，取第一个即可]
       * @author Matrix<matrix.zyh@gmai.com>
       */
      classifyChange(values) {
        const len = values.length
        let typeName = ''
        let typeId = ''
        for (let i = 0; i < len; i++) {
          if (i !== 0) {
            if (values[i].label) {
              typeId = values[i].value
              typeName = `${typeName} / ${values[i].label}`
            }
          } else {
            typeId = values[i].value
            typeName = values[i].label
          }
        }
        this.$set(this.form, 'type', typeId)
        this.$set(this.form, 'typeName', typeName)
      },

      /**
       * 商品单位变更回调事件
       * @param {Array} values 选择的商品单位[返回数组，取第一个即可]
       * @author Matrix<matrix.zyh@gmai.com>
       */
      unitChange(values) {
        this.$set(this.form, 'unit', values[0].label)
      },

      /**
       * 确认按钮点击事件
       * @author Matrix<matrix.zyh@gmai.com>
       */
      confirm() {
        this.$refs.uForm.validate((valid) => {
          if (valid) {
            this.modalShow = true
          }
        })
      },

      /**
       * 模态框确认回调
       * @author Matrix<matrix.zyh@gmai.com>
       */
      modalConfirm() {
        setTimeout(() => {
          this.modalShow = false
          this.$u.toast('商品添加成功！', 1000)
        }, 700)
        setTimeout(() => {
          this.$Router.back(1)
        }, 1500)
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
