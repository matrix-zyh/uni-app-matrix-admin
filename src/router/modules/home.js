const routes = [
  {
    path: '/pages/home/index',
    aliasPath: '/home',
    name: 'home',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/pages-home/pages/module/index',
    aliasPath: '/home/index',
    name: 'home-index',
    meta: {
      title: '首页-子包'
    }
  }
]

export default routes
