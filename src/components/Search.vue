<template>
  <view>
    <view class="commodity-search">
      <view class="cu-bar search bg-white">
        <view class="search-form round">
          <text class="cuIcon-search"></text>
          <input
            :adjust-position="false"
            v-model="searchValue"
            @input="searchinput"
            :placeholder="placeholder"
            confirm-type="search"
          />
        </view>
        <view class="action">
          <button @click="commodityFilter" class="cu-btn round">
            <text class="cuIcon-similar margin-right-xs" /> {{ searchTitle }}
          </button>
        </view>
      </view>

      <!-- 插槽 -->
      <slot />
    </view>

    <view style="height: 100upx"></view>
  </view>
</template>

<script>
  export default {
    name: 'Search',
    props: {
      // v-model
      value: {
        type: String,
        required: false,
        default: ''
      },
      // 搜索按钮文字。默认【搜索】
      searchTitle: {
        type: String,
        required: false,
        default: '搜索'
      },
      // placeholder文字。默认【输入想要搜索的商品名称】
      placeholder: {
        type: String,
        required: false,
        default: '输入想要搜索的商品名称'
      }
    },
    data() {
      return {
        // 搜索框值
        searchValue: this.value
      }
    },
    watch: {
      value(val) {
        this.searchValue = val
      }
    },
    methods: {
      searchinput() {
        this.$emit('input', this.searchValue)
      },

      /**
       * 点击搜索按钮
       * @author Matrix<matrix@gmail.com>
       */
      commodityFilter() {
        this.$emit('filter')
      }
    }
  }
</script>

<style scoped>
  .commodity-search {
    width: 100%;
    position: fixed;
    z-index: 9;
  }

  .cu-bar .search-form {
    background-color: #fff;
    border: 1upx solid #7a76ef;
  }

  .cu-btn {
    color: #222;
    border: 0;
    padding: 0;
    background-color: transparent;
  }
</style>
