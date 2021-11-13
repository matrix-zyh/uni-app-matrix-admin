<template>
  <view class="wrap">
    <view class="bg-image">
      <image src="https://i.loli.net/2021/08/19/7v9eU15dMucymgX.png" />
    </view>
    <view class="login">
      <view class="title">账号密码登陆</view>
      <u-form
        :model="form"
        ref="uForm"
        label-position="top"
        :error-type="['message', 'border-bottom']"
      >
        <u-form-item prop="username">
          <u-input v-model="form.username" placeholder="请输入账号/admin" />
        </u-form-item>
        <u-form-item prop="password">
          <u-input type="password" v-model="form.password" placeholder="请输入密码/123456" />
        </u-form-item>
      </u-form>
      <view style="margin-top: 120upx">
        <u-button
          ripple
          type="primary"
          shape="circle"
          :custom-style="{ backgroundColor: '#8b7df6' }"
          :loading="loading"
          @click="loginIn"
        >
          登录
        </u-button>
      </view>
    </view>
  </view>
</template>

<script>
  import Cookie from '@/utils/cookie'
  import { mapMutations } from 'vuex'
  import { randomUUID } from '@/utils/tools'
  import menu from '@/mock/menu'

  export default {
    data() {
      return {
        // loading 加载
        loading: false,
        // 表单数据
        form: {
          // 账号
          username: 'admin',
          // 密码
          password: '123456'
        },
        // 校验规则
        rules: {
          username: [{ required: true, message: '请输入账号！', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码！', trigger: 'blur' }]
        }
      }
    },
    methods: {
      ...mapMutations('user', ['setUser', 'setRoutes']),

      /**
       * 模拟服务请求
       * @author Matrix<matrix.zyh@gmail.com>
       */
      fetchMenu() {
        const data = {
          menu: menu,
          token: randomUUID(),
          username: 'Matrix',
          avatar: 'https://i.loli.net/2021/11/08/leTkfE8ZYMVnzsF.jpg',
          email: 'matrix.zyh@gmail.com'
        }
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(data)
          }, 1000)
        })
      },

      /**
       * 登录
       * @author Matrix<matrix.zyh@gmai.com>
       */
      loginIn() {
        this.$refs.uForm.validate(async (valid) => {
          if (valid) {
            const { username, password } = this.form
            if (username === 'admin' && password === '123456') {
              this.loading = true
              const value = await this.fetchMenu()
              this.loading = false
              this.afterLogin(value)
            }
          }
        })
      },

      /**
       * 登录成功后进行的操作
       * @param {Object} record 服务端返回的用户数据
       * @author Matrix<matrix.zyh@gmai.com>
       */
      afterLogin(record) {
        const { menu, token, username, avatar, email } = record
        Cookie.set('access_token', token)
        this.setRoutes(menu)
        this.setUser({ username, avatar, email })
        this.$Router.pushTab({ name: 'home' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
