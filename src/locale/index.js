import config from '../config'
import cn from './zh-CN'
import en from './en_US'

let locale = config.locale === 'zh-CN' ? cn : en

export function setLocale(arg) {
  if (typeof arg === 'string') {
    locale = arg === 'zh-CN' ? cn : en
  } else if (typeof arg === 'object') {
    locale = Object.assign({}, locale, arg)
  }
}

export function getLocale(name, def) {
  if (!name) return locale

  if (def && def[name]) return def[name]

  let value = { ...locale }
  name.split('.').forEach((n) => {
    if (value) value = value[n]
    else value = undefined
  })

  return value
}

