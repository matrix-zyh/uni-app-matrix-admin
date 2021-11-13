/**
 * 对数据进行格式化 (用于页面默认展示)
 * @param {String} formatData 需要进行格式化的数据
 * @returns {String}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function isEffectiveCommon(formatData) {
  if (['', undefined, 'undefined', null, 'null', 'NaN'].includes(formatData)) {
    return '-'
  }
  return formatData
}

/**
 * 对数字进行格式化 (用于页面默认展示)
 * @param {String} formatData 需要进行格式化的数据
 * @returns {String}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function isEffectiveNumber(formatData) {
  if (['', undefined, 'undefined', null, 'null', 'NaN'].includes(formatData)) {
    return '0'
  }
  return formatData
}

/**
 * 格式化手机号码
 * @param {String} phone 手机号码
 * @returns {String}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function formatPhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化金额
 * @param {Number|String} number 金额
 * @param {String} symbol 金额标识 [￥, $]
 * @param {Number} places 保留两位小数
 * @param {String} thousand 占位符
 * @param {String} decimal 分隔符 [.后保留两位小数]
 * @returns {String}
 * @author Matrix <matrix.zyh@gmail.com>
 */
export function formatMoney(number = 0, symbol = '￥', places = 2, thousand = ',', decimal = '.') {
  // places = !isNaN((places = Math.abs(places))) ? places : 2
  const negative = number < 0 ? '-' : ''
  const i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + ''
  let j = (j = i.length) > 3 ? j % 3 : 0
  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
    (places
      ? decimal +
        Math.abs(number - i)
          .toFixed(places)
          .slice(2)
      : '')
  )
}
