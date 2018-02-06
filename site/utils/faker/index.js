import { format } from '../date'

export function pickNumber(max = 65555, min = 0, fixed = 2) {
  if (typeof max === 'string') max = parseInt(max, 10)
  if (typeof min === 'string') min = parseInt(min, 10)

  const num = (Math.random() * (max - min)) + min
  return parseFloat(num.toFixed(fixed), 0)
}

export function pickInteger(...args) {
  return Math.round(pickNumber(...args))
}

export function random(max) {
  return Math.ceil(Math.random() * max)
}

export function pickDate(fmt = 'yyyy-MM-dd', offset = 10000000000) {
  const date = Date.now() - random(offset)
  return format(date, fmt)
}

export function one(items) {
  return items[Math.floor(Math.random() * items.length)]
}

export function pick(items, max = 1, min) {
  let length = max
  if (min) {
    length = pickInteger(max, min)
  }

  const buffer = []
  while (length--) {
    buffer.push(one(items))
  }

  return buffer
}
