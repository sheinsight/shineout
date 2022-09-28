export function range(end: number, start = 0) {
  const delta = end - start
  if (typeof delta !== 'number' || Number.isNaN(delta)) {
    console.error(new Error('end can not computed with start'))
  }
  return Array.from({ length: end - start }, (_v, k) => k + start)
}

export function split(total: number, nums: number[]) {
  if (typeof total !== 'number' || total === 0) {
    console.error(new Error('total mast be a number(not equal 0)'))
  }
  let remain = 1
  let nilCount = 0
  const ratios = nums.map(n => {
    if (n) {
      const r = n / total
      remain -= n
      return r
    }
    nilCount += 1
    return null
  })

  return ratios.map(r => {
    if (!r) r = remain / nilCount
    return total * r
  })
}

export function toPrecision(num: number, precision = 12) {
  return +parseFloat(num.toPrecision(precision))
}

export function validateNumber(num: unknown) {
  if (typeof num === 'number') {
    return !Number.isNaN(num)
  }

  // Empty
  if (!num) {
    return false
  }

  return (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(String(num)) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(String(num)) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(String(num))
  )
}
export function isE(number: unknown) {
  const str = String(number)

  return !Number.isNaN(Number(str)) && str.includes('e')
}
export function getNumberPrecision(number: unknown) {
  const numStr = String(number)

  if (isE(number)) {
    let precision = Number(numStr.slice(numStr.indexOf('e-') + 2))

    const decimalMatch = numStr.match(/\.(\d+)/)
    if (decimalMatch && decimalMatch[1]) {
      precision += decimalMatch[1].length
    }
    return precision
  }

  return numStr.includes('.') && validateNumber(numStr) ? numStr.length - numStr.indexOf('.') - 1 : 0
}

export function sub(num1: number, num2: number) {
  const number = Number(num1) + Number(num2)
  if (Number.isNaN(number)) return NaN
  if (number > Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER
  }

  if (number < Number.MIN_SAFE_INTEGER) {
    return Number.MIN_SAFE_INTEGER
  }
  const maxPrediction = Math.max(getNumberPrecision(num1), getNumberPrecision(num2))
  return Number(number.toFixed(maxPrediction))
}
