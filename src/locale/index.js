import { deepMerge, deepGet } from '../utils/objects'
import config from '../config'
import cn from './zh-CN'
import en from './en_US'

let locale = config.locale === 'zh-CN' ? cn : en

export function setLocale(arg) {
  if (typeof arg === 'string') {
    locale = arg === 'zh-CN' ? cn : en
  } else if (typeof arg === 'object') {
    locale = deepMerge(locale, arg, { clone: true })
  }
}

export function getLocale(name, def) {
  if (!name) return locale
  if (def && def[name]) return def[name]
  return deepGet(locale, name)
}

