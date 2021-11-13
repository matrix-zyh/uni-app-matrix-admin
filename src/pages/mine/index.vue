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
        <view class="cu-list menu-avatar">
          <view class="cu-item arrow">
            <view class="cu-avatar bg-white">
              <u-avatar :src="useUser.avatar" mode="circle" show-sex size="120"
            /></view>

            <view class="content">
              <view class="text-lg">
                <text class="text-white">{{ useUser.username }}</text>
                <text class="shop-sign">作者</text>
              </view>
              <view style="color: #dddae6" class="text-sm flex">
                <view style="font-size: 26upx; display: flex; align-items: center" class="text-cut"
                  ><u-icon name="email" color="#ffffff" size="36" /><text
                    @click="email"
                    class="text-white margin-left-xs"
                    >{{ useUser.email }}</text
                  ></view
                >
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view v-show="toggleDelay" class="wrap">
      <view
        :style="[{ animationDelay: '0.1s' }]"
        :class="{ 'animation-slide-bottom': toggleDelay }"
        class="wrap-content"
      >
        <view class="cu-list menu">
          <view @click="gitHub" class="cu-item arrow">
            <view class="content">
              <image src="@/static/images/git/GitHub.png" class="png" mode="aspectFit"></image>
              <text class="text-grey">GitHub</text>
            </view>
          </view>
          <view @click="gitee" class="cu-item arrow">
            <view class="content">
              <image src="@/static/images/git/Gitee.png" class="png" mode="aspectFit"></image>
              <text class="text-grey">Gitee</text>
            </view>
          </view>
          <view @click="log" class="cu-item arrow">
            <view class="content">
              <text class="cuIcon-formfill text-green"></text>
              <text class="text-grey">日志</text>
            </view>
          </view>
          <view class="cu-item arrow">
            <button class="cu-btn content" open-type="feedback">
              <text class="cuIcon-writefill text-cyan"></text>
              <text class="text-grey">意见反馈</text>
            </button>
          </view>
          <view @click="actionShow = true" class="cu-item arrow">
            <view class="content">
              <text class="cuIcon-appreciatefill text-red"></text>
              <text class="text-grey">赞赏支持</text>
            </view>
          </view>
          <view @click="about" class="cu-item arrow">
            <view class="content">
              <image :src="useUser.avatar" class="png" mode="aspectFit"></image>
              <text class="text-grey">关于 Admin</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <u-action-sheet
      v-model="actionShow"
      :list="actionList"
      safe-area-inset-bottom
      @click="actionOption"
    />
    <u-tabbar :list="useRoutes" :mid-button="false"></u-tabbar>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        // 计算不同手机 navBar 安全高度
        StatusBar: this.StatusBar,
        CustomBar: this.CustomBar,
        // 动画
        toggleDelay: false,
        // 操作菜单 收起/展开
        actionShow: false,
        // 操作菜单列表
        actionList: [{ text: '支付宝' }, { text: '微信' }],
        // 标题
        headerTitle: ''
      }
    },
    computed: {
      ...mapGetters('user', ['useUser', 'useRoutes']),

      style() {
        var StatusBar = this.StatusBar
        var CustomBar = this.CustomBar
        var style = `height: ${CustomBar}px; padding-top: ${StatusBar}px;`
        return style
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
       * 复制 Email 地址
       * @author Matrix<matrix.zyh@gmail.com>
       */
      email() {
        uni.setClipboardData({
          data: 'matrix.zyh@gmail.com',
          success: function () {
            uni.$u.toast('Email 已复制！', 1000)
          }
        })
      },

      /**
       * GitHub 地址
       * @author Matrix<matrix.zyh@gmail.com>
       */
      gitHub() {
        uni.setClipboardData({
          data: 'https://github.com/matrix-zyh/uni-app-matrix-admin',
          success: function () {
            uni.$u.toast('Github 地址已复制！', 1000)
          }
        })
      },

      /**
       * Gitee 地址
       * @author Matrix<matrix.zyh@gmail.com>
       */
      gitee() {
        uni.setClipboardData({
          data: 'https://gitee.com/matrix-zyh/uni-app-matrix-admin',
          success: function () {
            uni.$u.toast('Gitee 地址已复制！', 1000)
          }
        })
      },

      /**
       * log 日志
       * @author Matrix<matrix.zyh@gmail.com>
       */
      log() {
        this.$Router.push({ name: 'mine-log' })
      },

      /**
       * 赞赏支持
       * @param {Number} index 下标
       * @author Matrix<matrix.zyh@gmail.com>
       */
      actionOption(index) {
        const urls =
          index === 0
            ? ['https://i.loli.net/2021/11/10/hEGJ1nQiXNMZjCP.png']
            : ['https://i.loli.net/2021/11/10/781lbLQPJBOWUo6.png']
        uni.previewImage({
          urls: urls,
          current: urls[0]
        })
      },

      /**
       * 关于 Admin
       * @author Matrix<matrix.zyh@gmail.com>
       */
      about() {
        this.$Router.push({ name: 'mine-about' })
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

  .cu-list.menu > .cu-item .content > text[class*='cuIcon'] {
    display: inline-block;
    margin-right: 10upx;
    width: 1.2em;
    font-size: 38upx;
    text-align: center;
  }
</style>
