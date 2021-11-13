/**
 * Created by Matrix <matrix.zyh@gmail.com> on 2021/4/15
 */

// 定义类型
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const nullTag = '[object Null]'
const undefinedTag = '[object Undefined]'
const numberTag = '[object Number]'
const stringTag = '[object String]'

// 需要深度循环
const deep = [arrayTag, objectTag]

const filterEmpty = {
  // 使用while来实现一个通用的forEach遍历
  forEach(array, fn) {
    let index = -1
    const length = array.length
    while (++index < length) {
      fn(array[index], index)
    }
    return array
  },

  // 获取参数类型
  getType(target) {
    return Object.prototype.toString.call(target)
  },

  // 执行删除
  canIRemove(target, type) {
    /* eslint-disable */
    switch (type) {
      case nullTag:
      case undefinedTag:
        return true
      case stringTag:
        return target.trim().length < 1
      case objectTag:
        return Object.keys(target).length === 0
      case arrayTag:
        return target.length === 0
      case numberTag:
        return isNaN(target)
      default:
        return false
    }
    /* eslint-enable */
  },

  /**
   * @description 过滤参数中的空数据
   * @function removeEmptyFields
   * @param {*} obj 需要过滤的参数
   * @author Matrix <matrix.zyh@gmail.com>
   * @returns {*}
   */
  removeEmptyFields(obj) {
    const type = filterEmpty.getType(obj)
    const keys = type === arrayTag ? undefined : Object.keys(obj)
    // 循环
    filterEmpty.forEach(keys || obj, (value, key) => {
      if (keys) {
        key = value
      }
      if (filterEmpty.canIRemove(obj[key], filterEmpty.getType(obj[key]))) {
        delete obj[key]
      } else {
        // 循环数组、对象
        if (deep.includes(filterEmpty.getType(obj[key]))) {
          filterEmpty.removeEmptyFields(obj[key])
          if (filterEmpty.isEmpty(obj[key])) {
            delete obj[key]
          }
        }
      }
    })
    return obj
  },

  // 是否为空
  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }
}

export default filterEmpty
