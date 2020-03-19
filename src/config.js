import { deepGet } from './utils/objects'

const config = {
  cssModule: process.env.CSS_MODULE || false,
  prefix: process.env.SO_PREFIX || 'so',
  locale: process.env.LOCALE || 'en-US',
  delay: undefined,
  scrollRatio: 100,
  trim: undefined,
  spin: undefined,
}

export default config

export function setConfig(conf) {
  for (const [key, value] of Object.entries(conf)) {
    if (value !== undefined && key in config) config[key] = value
  }
}

export function syncConfig(conf) {
  if (!conf) return
  const delay = deepGet(conf, 'common.inputDelay')
  const trim = !!deepGet(conf, 'common.inputTrim')
  const scrollRatio = deepGet(conf, 'table.scrollRatio')
  const spin = deepGet(conf, 'common.spinDefaultName')
  setConfig({ delay, scrollRatio, trim, spin })
}
