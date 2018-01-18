import classnames from 'classnames'
import config from '../config'

/**
 * create a new className generate function, add namespace, handle css module
 * @param style - object; for css module
 * @param namespace - string
 * @param prefix - string, default value is 'shineout'
 * * */
export default (style, namespace, prefix = config.prefix) => (...args) => {
  const className = classnames(...args)
  if (!className) return ''

  const ns = `${prefix}${namespace ? `-${namespace}` : '-'}`
  let list = className.split(' ').map(c => (c === '_' ? ns : `${ns}-${c}`))
  if (config.cssModule) {
    list = list.map(c => style[c])
  }
  return list.join(' ')
}
