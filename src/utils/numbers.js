export function range(end, start = 0) {
  const delta = end - start
  if (typeof delta !== 'number' || Reflect.isNaN(delta)) {
    throw new Error('end can not computed with start')
  }
  return Array.from({ length: (end - start) }, (v, k) => k + start)
}

export function split(total, nums) {
  if (typeof total !== 'number' || total === 0) {
    throw new Error('total mast be a number(not equal 0)')
  }
  let remain = 1
  let nilCount = 0
  const ratios = nums.map((n) => {
    if (n) {
      const r = n / total
      remain -= n
      return r
    }
    nilCount += 1
    return null
  })

  return ratios.map((r) => {
    if (!r) r = remain / nilCount
    return total * r
  })
}

export function toPrecision(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision))
}
