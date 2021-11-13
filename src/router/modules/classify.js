const routes = [
  {
    path: '/pages/classify/index',
    aliasPath: '/classify',
    name: 'classify',
    meta: {
      title: '分类'
    }
  },
  {
    path: '/pages-classify/pages/edit/good-classify',
    aliasPath: '/classify/good-classify-edit',
    name: 'good-classify-edit',
    meta: {
      title: '录入商品分类'
    }
  },
  {
    path: '/pages-classify/pages/list/good-classify',
    aliasPath: '/classify/good-classify-list',
    name: 'good-classify-list',
    meta: {
      title: '商品分类列表'
    }
  }
]

export default routes
