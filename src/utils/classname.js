import classnames from 'classnames'
import config from '../config'

/**
 * create a new className generate function, add namespace, handle css module
 * @param style - object; for css module
 * @param module - string
 * @param prefix - string, default value is 'shineout'
 * * */
export default (style, module, prefix = config.prefix) => (...args) => {
  const className = classnames(...args)
  if (!className) return ''

  const ns = `${prefix}${module ? `-${module}` : '-'}`
  let list = className.split(' ').map(c => (c === '_' ? ns : `${ns}-${c}`))
  if (config.cssModule) {
    list = list.map(c => style[c])
  }
  return list.join(' ')
}
