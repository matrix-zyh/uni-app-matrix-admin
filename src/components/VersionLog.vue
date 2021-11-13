<template>
  <view class="cu-timeline">
    <view class="cu-item cuIcon-form text-df text-purples">
      <view class="bg-gradual-purples content shadow-blur">
        <view class="cu-capsule radius">
          <view class="cu-tag bg-white text-purples">
            <slot name="version" />
          </view>
          <view class="cu-tag line-white">
            <slot name="date" />
          </view>
        </view>
        <view class="margin-top-sm text-content">
          <slot />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'VersionLog'
  }
</script>

<style scoped>
  .text-purples {
    color: #8b7df6;
  }

  .bg-gradual-purples {
    background-image: linear-gradient(45deg, rgb(90, 132, 244), rgb(137, 111, 236));
    color: #fff;
  }
</style>
