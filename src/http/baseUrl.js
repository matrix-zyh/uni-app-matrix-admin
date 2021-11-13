const ENV = require('@/config/env.' + process.env.NODE_ENV)

let BASE_URL = ''
// #ifdef H5
BASE_URL = ENV.UNI_PROXY_PREFIX
// #endif
// #ifndef H5
BASE_URL = ENV.UNI_REQUEST_TYPE
  ? ENV.UNI_API_URL + ENV.UNI_PROXY_PREFIX
  : ENV.UNI_IP_API_URL + ENV.UNI_PROXY_PREFIX
// #endif

export { BASE_URL }
