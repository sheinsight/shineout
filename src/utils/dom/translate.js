import { has3d, getTransformName } from './detect'
import { isRTL } from '../../config'

let use3d
const getDirectionX = x => {
  const xs = String(x)
  const num = Number.parseFloat(xs)
  const numStr = String(num)
  const start = xs.indexOf(numStr) + numStr.length
  const u = xs.slice(start)
  const result = String((isRTL() ? -1 : 1) * num) + u
  return result
}

export function setTranslate(el, x, y) {
  const tn = getTransformName()
  el.style[tn] = `translate(${getDirectionX(x)},${y})`
}

export function setTranslate3D(el, x, y) {
  if (use3d === undefined) use3d = has3d()
  const tn = getTransformName()
  const xd = getDirectionX(x)
  if (use3d) {
    el.style[tn] = `translate3d(${xd},${y},0)`
  } else {
    el.style[tn] = `translate(${xd},${y})`
  }
}
