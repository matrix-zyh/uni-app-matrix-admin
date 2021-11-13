/**
 * 时间段欢迎语
 * @returns {String}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function welcomeMessage() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? '早上好'
    : hour <= 11
    ? '上午好'
    : hour <= 13
    ? '中午好'
    : hour < 20
    ? '下午好'
    : '晚上好'
}

/**
 * 格式化时间
 * @param date
 * @param fmt
 * @returns {*}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (typeof date !== 'object') {
    date = !date ? new Date() : new Date(date)
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

/**
 * 设备判断
 * @returns {string}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function isDevice() {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.match(/iPhone\sOS/i) === 'iphone os' || ua.match(/iPad/i) === 'ipad') {
    // ios
    return 'iOS'
  }
  if (ua.match(/Android/i) === 'android') {
    return 'Android'
  }
  return 'Web'
}

/**
 * 设备是否为微信
 * @returns {boolean}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function isWechat() {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  }
  return false
}

/**
 * 判断是否为一个数组
 * @param {Array} arr 判断的值
 * @returns {boolean}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * 判断是否为一个对象
 * @param {Array} arr 判断的值
 * @returns {boolean}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 去除空格
 * @param {String} str 文本
 * @param {Number} type 去除类型 (1:所有空格  2:前后空格  3:前空格  4:后空格)
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function trim(str, type) {
  type = type || 1
  switch (type) {
    case 1:
      return str.replace(/\s+/g, '')
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '')
    case 3:
      return str.replace(/(^\s*)/g, '')
    case 4:
      return str.replace(/(\s*$)/g, '')
    default:
      return str
  }
}

/**
 * 字符串大小写转换
 * @param {String} str 文本
 * @param {Number} type 去除类型 (1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写)
 * @returns {string|*}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function changeCase(str, type) {
  type = type || 4
  switch (type) {
    case 1:
      return str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
      })
    case 2:
      return str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
      })
    case 3:
      return str
        .split('')
        .map(function (word) {
          if (/[a-z]/.test(word)) {
            return word.toUpperCase()
          } else {
            return word.toLowerCase()
          }
        })
        .join('')
    case 4:
      return str.toUpperCase()
    case 5:
      return str.toLowerCase()
    default:
      return str
  }
}

/**
 * 阿拉伯数字转中文大写数字
 * @param {Number} num 阿拉伯数字
 * @returns {string}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function numberToChinese(num) {
  // eslint-disable-next-line no-array-constructor
  const AA = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十')
  // eslint-disable-next-line no-array-constructor
  const BB = new Array('', '十', '百', '仟', '萬', '億', '点', '')
  const a = ('' + num).replace(/(^0*)/g, '').split('.')
  let k = 0
  let re = ''
  for (let i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re
        break
      case 4:
        if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$').test(a[0])) {
          re = BB[4] + re
        }
        break
      case 8:
        re = BB[5] + re
        BB[7] = BB[5]
        k = 0
        break
    }
    if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0) {
      re = AA[0] + re
    }
    if (a[0].charAt(i) !== 0) {
      re = AA[a[0].charAt(i)] + BB[k % 4] + re
    }
    k++
  }
  if (a.length > 1) {
    // 加上小数部分(如果有小数部分)
    re += BB[6]
    for (let i = 0; i < a[1].length; i++) {
      re += AA[a[1].charAt(i)]
    }
  }
  if (re === '一十') {
    re = '十'
  }
  if (re.match(/^一/) && re.length === 3) {
    re = re.replace('一', '')
  }
  return re
}

/**
 * 生成随机 UUID
 * @returns {string}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function randomUUID() {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
