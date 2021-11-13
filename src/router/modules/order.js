const routes = [
  {
    path: '/pages/order/index',
    aliasPath: '/order',
    name: 'order',
    meta: {
      title: '订单'
    }
  },
  {
    path: '/pages-order/pages/edit/user',
    aliasPath: '/user/edit',
    name: 'user-edit',
    meta: {
      title: '录入用户'
    }
  },
  {
    path: '/pages-order/pages/list/user',
    aliasPath: '/user/list',
    name: 'user-list',
    meta: {
      title: '用户列表'
    }
  },
  {
    path: '/pages-order/pages/edit/order',
    aliasPath: '/order/edit',
    name: 'order-edit',
    meta: {
      title: '录入订单'
    }
  },
  {
    path: '/pages-order/pages/list/order',
    aliasPath: '/order/list',
    name: 'order-list',
    meta: {
      title: '订单列表'
    }
  },
  {
    path: '/pages-order/pages/view/order',
    aliasPath: '/order/view',
    name: 'order-view',
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/pages-order/pages/list/commodity',
    aliasPath: '/order/choose/commodity',
    name: 'order-choose-commodity',
    meta: {
      title: '选择商品'
    }
  }
]

export default routes
