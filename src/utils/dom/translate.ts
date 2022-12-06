import { has3d, getTransformName, TRANSFORMS } from './detect'
import { isRTL } from '../../config'

interface TranslateStyleType extends CSSStyleDeclaration {
  transform: string
  OTransform?: string
  msTransform?: string
  MozTransform?: string
  webkitTransform: string
}

let use3d: boolean

const getDirectionX = (xs: string) => {
  const num = Number.parseFloat(xs)
  const numStr = String(num)
  const start = xs.indexOf(numStr) + numStr.length
  const u = xs.slice(start)
  const result = String((isRTL() ? -1 : 1) * num) + u
  return result
}
export function setTranslate(el: HTMLElement, x: string, y: string) {
  const tn: keyof typeof TRANSFORMS = getTransformName()
  ;(el.style as TranslateStyleType)[tn] = `translate(${getDirectionX(x)},${y})`
}

export function setTranslate3D(el: HTMLElement, x: string, y: string) {
  if (use3d === undefined) use3d = has3d()
  const tn = getTransformName()
  const xd = getDirectionX(x)
  if (use3d) {
    ;(el.style as TranslateStyleType)[tn] = `translate3d(${xd},${y},0)`
  } else {
    ;(el.style as TranslateStyleType)[tn] = `translate(${xd},${y})`
  }
}
