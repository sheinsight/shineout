import { entries } from './utils/objects'
import Notification from './utils/notification'

export const noti = new Notification()

const config = {
  cssModule: process.env.CSS_MODULE || false,
  prefix: process.env.SO_PREFIX || 'so',
  locale: process.env.LOCALE || 'en-US',
  autoSSL: false,
  delay: undefined,
  scrollRatio: 100,
  trim: undefined,
  spin: undefined,
  caret: undefined,
  direction: 'ltr',
}

export default config

export function set(name, value) {
  if (value !== undefined && name in config) config[name] = value
  noti.dispatch(name)
}

export function setConfig(conf) {
  for (const [key, value] of entries(conf)) {
    set(key, value)
  }
}

export function isRTL() {
  return config.direction === 'rtl'
}
