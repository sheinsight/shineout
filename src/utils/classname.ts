import classnames from 'classnames'
import { CSSProperties } from 'react'
import config, { isRTL } from '../config'

interface CSSModule {
  [key: string]: string
}

export const getDirectionClass = (c: string) => `${c} ${c}-${isRTL() ? 'rtl' : 'ltr'}`

/**
 * create a new className generate function, add namespace, handle css module
 * @param style - object; for css module
 * @param module - string
 * @param prefix - string, default value is 'shineout'
 * * */
export default (style: CSSModule, module: string, prefix: string = config.prefix) => (...args: any) => {
  const className = classnames(...args)
  if (!className) return ''

  const ns = `${prefix}${module ? `-${module}` : '-'}`
  let list: (string | number)[] = className.split(' ').map(c => (c === '_' ? ns : `${ns}-${c}`))
  if (config.cssModule) {
    list = list.map((c: keyof CSSProperties) => style[c] || c)
  }
  return list.join(' ')
}
