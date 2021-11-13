<template>
  <view>
    <u-navbar
      :title="headerTitle"
      :background="background"
      title-color="#fff"
      back-icon-color="#fff"
    />

    <search v-model="searchValue" @filter="searchFilter" />

    <view class="options">
      <view @click="$u.throttle(classifyOptions)">
        <u-icon :name="iconName"></u-icon>
        <text>{{ optionTitle }}</text>
        <text v-show="iconName === 'setting'" class="text-grey">( 点我进行操作... )</text>
        <text v-show="iconName === 'setting-fill'" class="text-grey">( 向左滑动试试看～ )</text>
      </view>
    </view>
    <view v-for="item in classifyList" :key="item.id">
      <u-swipe-action
        :disabled="isDisabled"
        :index="item.id"
        :show="item.show"
        @click="optionClick"
        @open="open(item.id)"
        :options="options"
        btn-width="130"
      >
        <view class="item u-border-bottom">
          <!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
          <view @click="openClassify(item.id)" class="title-wrap">
            <text class="title u-line-2">{{ item.label }}</text>
            <image v-if="item.child.length > 0" src="@/static/images/classify/distribution.png" />
          </view>
        </view>
      </u-swipe-action>
      <u-swipe-action
        v-for="childItem in item.child"
        :key="childItem.id"
        :disabled="isDisabled"
        :index="childItem.id"
        :show="childItem.show"
        @click="(id, index) => optionClick(id, index, item.id)"
        @open="open(childItem.id, item.id)"
        :options="childOptions"
        btn-width="130"
      >
        <view v-if="item.open" class="item u-border-bottom bg-f9">
          <view class="title-wrap">
            <text class="title u-line-2 u-m-l-30">{{ childItem.label }}</text>
          </view>
        </view>
      </u-swipe-action>
    </view>
  </view>
</template>

<script>
  import Search from '@/components/Search.vue'
  import goodsClassify from '@/mock/good-classify'

  export default {
    components: { Search },
    data() {
      return {
        // 标题
        headerTitle: '',
        // 自定义 navBar 导航样式
        background: {
          'background-image': 'linear-gradient(45deg, rgb(90, 132, 244), rgb(137,111,236))'
        },
        // 搜索内容
        searchValue: '',
        // 滑动操作按钮
        options: [
          { text: '编辑', style: { backgroundColor: '#00e3a9' } },
          { text: '子类', style: { backgroundColor: '#8B7DF6' } },
          { text: '删除', style: { backgroundColor: '#dd524d' } }
        ],
        childOptions: [
          { text: '编辑', style: { backgroundColor: '#00e3a9' } },
          { text: '删除', style: { backgroundColor: '#dd524d' } }
        ],
        // 操作图标
        iconName: 'setting',
        // 操作文字
        optionTitle: '操作',
        // 商品分类列表
        classifyList: goodsClassify,
        // 是否禁止滑动 (true-禁止、false-滑动)
        isDisabled: true
      }
    },
    onLoad() {
      this.headerTitle = this.$Route.meta.title
    },
    methods: {
      /**
       * 搜索
       * @author Matrix<matrix.zyh@gmail.com>
       */
      searchFilter() {
        if (!this.$u.trim(this.searchValue)) return
        this.$u.toast(`搜索：${this.searchValue}`)
      },

      /**
       * 展开分类
       * @param {String} id 一级分类Id
       * @author Matrix<matrix.zyh@gmail.com>
       */
      openClassify(id) {
        for (const v of this.classifyList) {
          v.show = false
          for (const _v of v.child) {
            _v.show = false
          }
        }
        for (const v of this.classifyList) {
          if (v.id === id) {
            v.open = !v.open
          }
        }
      },

      /**
       * 操作
       * @author Matrix<matrix.zyh@gmail.com>
       */
      classifyOptions() {
        this.iconName = this.iconName === 'setting' ? 'setting-fill' : 'setting'
        this.optionTitle = this.optionTitle === '操作' ? '操作中 ...' : '操作'
        this.isDisabled = !this.isDisabled
        if (this.isDisabled) {
          for (const v of this.classifyList) {
            v.show = false
          }
        }
      },

      /**
       * 滑动操作
       * @param {String} id 一级分类Id
       * @param {String} parentId 子级分类Id
       * @author Matrix<matrix.zyh@gmail.com>
       */
      open(id, parentId) {
        if (!parentId) {
          for (const v of this.classifyList) {
            v.show = false
            for (const _v of v.child) {
              _v.show = false
            }
            if (v.id === id) {
              v.show = true
            }
          }
        } else {
          for (const v of this.classifyList) {
            v.show = false
            if (v.id === parentId) {
              for (const _v of v.child) {
                _v.show = false
                if (_v.id === id) {
                  _v.show = true
                }
              }
            }
          }
        }
      },

      /**
       * 对分类进行操作
       * @param {String} id 父级分类Id
       * @param {String} index 滑动操作选项下标
       * @param {String} parentId 子级分类Id
       * @author Matrix<matrix.zyh@gmail.com>
       */
      optionClick(id, index, parentId) {
        // 获取跳转页面需要传递的参数
        const params = this.mergeParam(id, parentId)

        switch (index) {
          case 0:
            // 参数中增加标识，判断是点击 “编辑” 进行页面跳转
            params.origin = 'edit'
            this.$Router.push({ name: 'good-classify-edit', params })
            break
          case 1:
            if (parentId) {
              this.classifyChildDel(id, parentId)
            } else {
              // 参数中增加标识，判断是点击 “二级分类” 进行页面跳转
              params.origin = 'level'
              this.$Router.push({ name: 'good-classify-edit', params })
            }
            break
          case 2:
            this.classifyFatherDel(id)
            break
          default:
            break
        }
      },

      /**
       * 封装参数
       * @param {String} id 父级分类Id
       * @param {String} parentId 子级分类Id
       * @returns {Object}
       * @author Matrix<matrix.zyh@gmail.com>
       */
      mergeParam(id, parentId) {
        let parentLabel = ''
        let childLabel = ''
        if (parentId) {
          for (const v of this.classifyList) {
            if (v.id === parentId) {
              parentLabel = v.label
              for (const _v of v.child) {
                if (_v.id === id) {
                  childLabel = _v.label
                }
              }
            }
          }
        } else {
          for (const v of this.classifyList) {
            if (v.id === id) {
              parentLabel = v.label
            }
          }
        }
        return { id, parentId, childLabel, parentLabel }
      },

      /**
       * 删除父级分类
       * @param {String} id 父级分类Id
       * @author Matrix<matrix.zyh@gmail.com>
       */
      classifyFatherDel(id) {
        for (const i in this.classifyList) {
          if (this.classifyList[i].id === id) {
            this.classifyList.splice(i, 1)
          }
        }
      },

      /**
       * 删除子级分类
       * @param {String} id 父级分类Id
       * @param {String} parentId 子级分类Id
       * @author Matrix<matrix.zyh@gmail.com>
       */
      classifyChildDel(id, parentId) {
        for (const v of this.classifyList) {
          if (v.id === parentId) {
            for (const i in v.child) {
              if (v.child[i].id === id) {
                v.child.splice(i, 1)
              }
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './good-classify.scss';
</style>
