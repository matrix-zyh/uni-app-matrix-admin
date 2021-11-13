import API from '@/api/interface/base'
import { request, METHOD } from '@/http/request'

// 登录
export async function login(data) {
  return request(API.login, METHOD.POST, data, { custom: { token: false } })
}
