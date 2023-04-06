import { entries } from './utils/objects'
import Notification from './utils/notification'
import { LanType, Direction } from './locale/Props'
import { CartType } from './icons/Props'
import { isFunc } from "./utils/is"

export const noti = new Notification()

interface ConfigOption {
  cssModule: boolean
  prefix: string
  locale: LanType
  autoSSL: boolean
  delay?: number
  scrollRatio: number
  trim?: boolean
  spin?: string
  caret?: CartType
  direction: Direction
  popupContainer?: HTMLElement | (() => HTMLElement)
}

const config: ConfigOption = {
  cssModule: !!process.env.CSS_MODULE || false,
  prefix: process.env.SO_PREFIX || 'so',
  locale: (process.env.LOCALE as LanType) || 'en-US',
  autoSSL: false,
  delay: undefined,
  scrollRatio: 100,
  trim: undefined,
  spin: undefined,
  caret: undefined,
  direction: 'ltr',
  popupContainer: undefined,
}

export default config

export function set<Key extends keyof ConfigOption>(name: Key, value: ConfigOption[Key]) {
  if (value !== undefined && name in config) config[name] = value
  noti.dispatch(name)
}

export function setConfig(conf: Partial<ConfigOption>) {
  for (const [key, value] of entries(conf)) {
    set(key, value)
  }
}

export function isRTL() {
  return config.direction === 'rtl'
}

export function getDefaultContainer() {
  if (isFunc(config.popupContainer)) {
    const container = config.popupContainer()
    if (container instanceof HTMLElement) {
      return container
    }
  }

  if (config.popupContainer instanceof HTMLElement) return config.popupContainer

  return document.body
}
