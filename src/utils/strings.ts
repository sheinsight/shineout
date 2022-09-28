import { isRTL } from '../config'

export function capitalize(str: string) {
  if (typeof str !== 'string') {
    console.error(new Error('str should be a string'))
  }
  return str && str[0].toUpperCase() + str.slice(1)
}

export function substitute(str: string | Function, obj: { [x: string]: any }) {
  if (typeof str === 'string') {
    if (str.indexOf('{') < 0) {
      return str
    }

    return str.replace(/\\?\{([^{}]+)\}/g, (match, name) => {
      if (match.charAt(0) === '\\') {
        return match.slice(1)
      }
      return obj[name] === null || obj[name] === undefined ? '' : obj[name]
    })
  }
  if (typeof str === 'function') {
    let val = str(obj)
    if (val === obj && typeof val === 'object') {
      val = Object.assign({}, obj)
    }
    return val
  }

  return ''
}

export function removeProtocol(url: string) {
  if (url.indexOf('http') !== 0) return url
  try {
    const { href, protocol } = new URL(url)
    return href.slice(protocol.length)
  } catch (error) {
    return url
  }
}

export function getRTLPosition(position: string) {
  if (!position) return position
  // position.replace('left', 'right').replace('right', 'left')
  if (position.indexOf('left') !== -1) {
    return position.replace('left', 'right')
  }
  if (position.indexOf('right') !== -1) {
    return position.replace('right', 'left')
  }
  return position
}

export function getDirectionIconName(mode = 'left', double = false) {
  const rtl = isRTL()
  if (mode === 'left') {
    if (rtl) {
      return double ? 'AngleDoubleRight' : 'AngleRight'
    }
    return double ? 'AngleDoubleLeft' : 'AngleLeft'
  }

  if (rtl) {
    return double ? 'AngleDoubleLeft' : 'AngleLeft'
  }
  return double ? 'AngleDoubleRight' : 'AngleRight'
}
