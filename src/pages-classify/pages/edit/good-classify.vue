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
          ref="uForm"
          :model="form"
          :error-type="['message', 'border']"
          label-position="top"
          :border-bottom="false"
        >
          <block v-if="origin === 'edit'">
            <block v-if="level === 1">
              <u-form-item label="商品分类名称" prop="name" required :border-bottom="false">
                <u-input v-model="form.name" placeholder="请输入" border />
              </u-form-item>
            </block>
            <block v-else>
              <u-form-item label="商品分类名称" prop="name" required :border-bottom="false">
                <u-input v-model="label" placeholder="请输入" disabled border />
              </u-form-item>
              <u-form-item label="子级分类名称" prop="name" required :border-bottom="false">
                <u-input v-model="form.name" placeholder="请输入" border />
              </u-form-item>
            </block>
          </block>

          <block v-else-if="origin === 'level'">
            <u-form-item label="商品分类名称" prop="name" required :border-bottom="false">
              <u-input v-model="label" placeholder="请输入" disabled border />
            </u-form-item>
            <u-form-item label="子级分类名称" prop="name" required :border-bottom="false">
              <u-input v-model="form.name" placeholder="请输入" border />
            </u-form-item>
          </block>

          <block v-else>
            <u-form-item label="商品分类名称" prop="name" required :border-bottom="false">
              <u-input v-model="form.name" placeholder="请输入" border />
            </u-form-item>
          </block>
        </u-form>
      </view>
    </view>

    <view class="confirm-button">
      <button @click="confirm" class="cu-btn round block button-purple margin-tb-sm lg">
        确认
      </button>
    </view>
  </view>
</template>

<script>
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
        // 表单
        form: {
          // 当前分类自己的 Id
          id: '',
          // 父级分类 Id
          parent_id: '',
          // 分类名称
          name: ''
        },
        // 校验规则
        rules: {
          name: [{ required: true, message: '请填写商品分类名称！', trigger: 'blur' }]
        },
        // 判断当前页面是通过 “编辑” 进来还是新增 “二级分类” 进来的
        origin: '',
        // 当前操作的是父级数据还是子级数据
        level: 0,
        // 当父子数据不可操作时，父级数据显示的默认值
        label: ''
      }
    },
    onLoad() {
      this.headerTitle = this.$Route.meta.title
      const { id, parentId, childLabel, parentLabel, origin } = this.$Route.query
      this.origin = origin
      this.form.id = id
      this.form.parent_id = 0
      if (origin === 'edit') {
        if (!parentId) {
          this.level = 1
          this.label = ''
          this.form.name = parentLabel
        } else {
          this.level = 2
          this.label = parentLabel
          this.form.name = childLabel
          this.form.parent_id = parentId
        }
      } else {
        this.level = 2
        this.label = parentLabel
        this.form.name = ''
        this.form.parent_id = id
      }
    },
    onShow() {
      this.toggleDelay = true
    },
    methods: {
      /**
       * 确认按钮点击事件
       * @author Matrix<matrix.zyh@gmai.com>
       */
      confirm() {
        this.$refs.uForm.validate((valid) => {
          if (valid) {
            if (this.origin === 'edit') {
              this.classifyEdit()
            } else {
              this.classifyAdd()
            }
          }
        })
      },

      /**
       * 添加商品分类
       * @author Matrix<matrix.zyh@gmai.com>
       */
      classifyAdd() {
        this.$u.toast('商品分类添加成功！', 1000)
        setTimeout(() => {
          this.$Router.back(1)
        }, 1000)
      },

      /**
       * 编辑商品分类
       * @author Matrix<matrix.zyh@gmai.com>
       */
      classifyEdit() {
        this.$u.toast('商品分类编辑成功！', 1000)
        setTimeout(() => {
          this.$Router.back(1)
        }, 1000)
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
  @import './good-classify.scss';
</style>
