const routes = [
  {
    path: '/pages/commodity/index',
    aliasPath: '/commodity',
    name: 'commodity',
    meta: {
      title: '商品'
    }
  },
  {
    path: '/pages-commodity/pages/edit/commodity',
    aliasPath: '/commodity/edit',
    name: 'commodity-edit',
    meta: {
      title: '录入商品'
    }
  },
  {
    path: '/pages-commodity/pages/list/commodity',
    aliasPath: '/commodity/list',
    name: 'commodity-list',
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/pages-commodity/pages/detail/commodity',
    aliasPath: '/commodity/detail',
    name: 'commodity-detail',
    meta: {
      title: '商品详情'
    }
  }
]

export default routes
