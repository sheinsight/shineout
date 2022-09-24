import { has3d, getTransformName, TRANSFORMS } from './detect'
import { isRTL } from '../../config'

interface Styles extends CSSStyleDeclaration {
  transform: string
  OTransform?: string
  msTransform?: string
  MozTransform?: string
  webkitTransform: string
}

let use3d: boolean

const getDirectionX = (x: number) => {
  const xs = String(x)
  const num = Number.parseFloat(xs)
  const numStr = String(num)
  const start = xs.indexOf(numStr) + numStr.length
  const u = xs.slice(start)
  const result = String((isRTL() ? -1 : 1) * num) + u
  return result
}
export function setTranslate(el: HTMLElement, x: number, y: number) {
  const tn: keyof typeof TRANSFORMS = getTransformName()
  ;(el.style as Styles)[tn] = `translate(${getDirectionX(x)},${y})`
}

export function setTranslate3D(el: HTMLElement, x: number, y: number) {
  if (use3d === undefined) use3d = has3d()
  const tn = getTransformName()
  const xd = getDirectionX(x)
  if (use3d) {
    ;(el.style as Styles)[tn] = `translate3d(${xd},${y},0)`
  } else {
    ;(el.style as Styles)[tn] = `translate(${xd},${y})`
  }
}
