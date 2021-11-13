import Vue from 'vue'
import App from './App'
import { Router, RouterMount } from '@/router'
import store from '@/store'

Vue.config.productionTip = false

Vue.use(Router)

// 项目启动时，加载 bootstrap 启动文件
import bootstrap from './bootstrap'
bootstrap({ Router, store })

// 引入 uView
import uView from 'uview-ui'
Vue.use(uView)

// 全局混入文件
import globalMixin from '@/mixin/global-mixin'
Vue.use(globalMixin)

// 引入 utils 工具类
import utils from './utils'
Vue.use(utils)

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})

// #ifdef H5
RouterMount(app, Router, '#app') // 使用 uni-simple-router 插件，在H5端 需去除原有的app.$mount();使用路由自带的渲染方式
// #endif

// #ifndef H5
app.$mount() //为了兼容小程序及app端必须这样写才有效果
// #endif
