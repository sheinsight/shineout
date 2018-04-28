import cn from './zh-CN'
import en from './en_US'
import config from '../../config'

let locate = config.locate === 'zh-CN' ? cn : en

export function setLocate(arg) {
  if (typeof arg === 'string') {
    locate = arg === 'zh-CN' ? cn : en
  } else if (typeof arg === 'object') {
    locate = Object.assign({}, locate, arg)
  }
}

export function getLocate(name) {
  if (!name) return undefined
  let value = { ...locate }
  name.split('.').forEach((n) => {
    if (value) value = value[n]
    else value = undefined
  })

  return value
}
