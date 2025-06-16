import { isRTL } from '../config'

export function capitalize(str: string) {
  if (typeof str !== 'string') {
    console.error(new Error('str should be a string'))
  }
  return str && str[0].toUpperCase() + str.slice(1)
}

export function substitute(str: string | Function, obj: { [x: string]: any }) {
  if (typeof str === 'string') {
    if (str.indexOf('{') < 0) {
      return str
    }

    return str.replace(/\\?\{([^{}]+)\}/g, (match, name) => {
      if (match.charAt(0) === '\\') {
        return match.slice(1)
      }
      return obj[name] === null || obj[name] === undefined ? '' : obj[name]
    })
  }
  if (typeof str === 'function') {
    let val = str(obj)
    if (val === obj && typeof val === 'object') {
      val = Object.assign({}, obj)
    }
    return val
  }

  return ''
}

export function removeProtocol(url: string) {
  if (url.indexOf('http') !== 0) return url
  try {
    const { href, protocol } = new URL(url)
    return href.slice(protocol.length)
  } catch (error) {
    return url
  }
}

export function getRTLPosition(position: string) {
  if (!position) return position
  // position.replace('left', 'right').replace('right', 'left')
  if (position.indexOf('left') !== -1) {
    return position.replace('left', 'right')
  }
  if (position.indexOf('right') !== -1) {
    return position.replace('right', 'left')
  }
  return position
}

export function getDirectionIconName(mode = 'left', double = false) {
  const rtl = isRTL()
  if (mode === 'left') {
    if (rtl) {
      return double ? 'AngleDoubleRight' : 'AngleRight'
    }
    return double ? 'AngleDoubleLeft' : 'AngleLeft'
  }

  if (rtl) {
    return double ? 'AngleDoubleLeft' : 'AngleLeft'
  }
  return double ? 'AngleDoubleRight' : 'AngleRight'
}

/**
 * 在字符串层面实现四舍五入
 * @param {string} numStr 数字字符串
 * @param {number} precision 精度
 * @returns {string} 四舍五入后的字符串
 */
function roundString(numStr: string, precision: number) {
  if (precision < 0) return numStr

  const parts = numStr.split('.')
  const intPart = parts[0]
  const decimalPart = parts[1] || ''

  if (decimalPart.length <= precision) {
    return intPart + (decimalPart ? `.${decimalPart.padEnd(precision, '0')}` : '')
  }

  // 需要进行四舍五入
  const roundPos = precision
  let carry = 0

  // 确定是否需要进位
  if (parseInt(decimalPart[roundPos], 10) >= 5) carry = 1

  // 如果不需要进位，直接截断
  if (carry === 0) {
    return intPart + (precision > 0 ? `.${decimalPart.slice(0, precision)}` : '')
  }

  // 处理进位
  const digits = (intPart + (decimalPart ? `.${decimalPart}` : '')).replace('.', '').split('')
  const dotPos = intPart.length

  // 从小数位开始向前进位
  let i = dotPos + precision - 1
  while (carry > 0 && i >= 0) {
    // 跳过小数点
    if (i === dotPos - 1) {
      i -= 1
      continue
    }

    const d = parseInt(digits[i], 10) + carry
    digits[i] = (d % 10).toString()
    carry = Math.floor(d / 10)
    i -= 1
  }

  // 处理最高位进位
  let result = ''
  if (carry > 0) result = '1'

  // 重建数字字符串
  for (let j = 0; j < digits.length; j++) {
    // 插入小数点
    if (j === dotPos && precision > 0) result += '.'
    // 只添加到所需精度
    if (j < dotPos || j < dotPos + precision) {
      result += digits[j]
    }
  }

  return result
}

/**
 * 格式化数字字符串到指定小数位
 * @param {string} value 数字字符串
 * @param {number} precision 小数位数
 * @returns {string} 格式化后的字符串
 * @example
 * console.log(preciseString('111111111111111.888', 2)) // "111111111111111.89"
 * console.log(preciseString('9.999', 2)) // "10.00"
 */
export const preciseString = (value: string, precision = -1) => {
  // 如果不是数字字符串，则返回原值
  if (!/^-?\d+(\.\d+)?$/.test(value)) {
    return value
  }

  // 分离整数和小数部分
  const parts = value.split('.')
  const intPart = parts[0]
  const decimalPart = parts[1] || ''

  // 如果不需要格式化精度，直接返回
  if (precision < 0) return value

  // 截断或补零
  if (decimalPart.length > precision) {
    // 需要四舍五入
    if (precision < decimalPart.length && parseInt(decimalPart[precision], 10) >= 5) {
      // 手动实现字符串层面的四舍五入
      return roundString(`${intPart}.${decimalPart}`, precision)
    }
    return intPart + (precision > 0 ? `.${decimalPart.slice(0, precision)}` : '')
  }
  return intPart + (precision > 0 ? `.${decimalPart.padEnd(precision, '0')}` : '')
}
