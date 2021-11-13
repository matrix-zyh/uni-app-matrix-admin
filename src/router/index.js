import { RouterMount, createRouter } from 'uni-simple-router'
import ROUTES from './modules'
import cookie from '@/utils/cookie'

const Router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routerErrorEach: (error, router) => {
    if (error.type === 0 || error.type === 3) {
      // 路由跳转锁 - 解锁
      router.$lockStatus = false
    }
  },
  applet: {
    // animationDuration 是保留给 redirectTo、push 足够的时间。让它真正切换完成页面后才会放行下一次跳转！
    animationDuration: 300
  },
  routes: [
    ...ROUTES,
    {
      path: '*',
      redirect: (to) => {
        return { name: '404' }
      }
    }
  ]
})

// 设置路由白名单
const routeWhiteList = ['/pages/login/index']

// 全局路由前置守卫
Router.beforeEach((to, from, next) => {
  // uni.$m.log('全局路由前置守卫开始！')
  const ACCESS_TOKEN = cookie.access_token()

  /**
   * 注意！！！！！！
   * H5下 uni-simple-router 是桥接的 vue-router
   * 而 vue-router 在匹配到通配符的情况下跳转404页面的时候，
   * 使用 name 是无法进行跳转的，只能使用 path 跳转才可以。按照官方的解释是故意而为之的。
   * 所以这部分使用了条件编译的写法，如果当前是 H5 端，匹配到通配符时，手动进行 path 跳转到 404 页面
   * 详情请查看：https://github.com/PanJiaChen/vue-element-admin/issues/1503
   */
  if (ACCESS_TOKEN) {
    //#ifndef H5
    next()
    //#endif

    //#ifdef H5
    if (to.path === '*') {
      if (from.path === '*') {
        next({ name: 'home' })
      } else {
        next({ name: '404' })
      }
    } else {
      next()
    }
    //#endif
  } else {
    if (routeWhiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/pages/login/index' })
    }
  }
})

// 全局路由后置守卫
Router.afterEach((to, from) => {
  // uni.$m.log('全局路由后置守卫结束！')
})

export { Router, RouterMount }
