/**
 * Created by Matrix <matrix.zyh@gmail.com> on 2021/4/15
 */

import { loadInterceptors } from '@/http/request'
import interceptors from '@/http/interceptors'

// 启动引导方法，应用启动时需要执行的操作放在这里
function bootstrap({ Router, store }) {
  // 加载 luch-request 拦截器
  loadInterceptors(interceptors, { Router, store })
}

export default bootstrap
