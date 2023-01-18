export const TRANSFORMS = {
  webkitTransform: '-webkit-transform',
  OTransform: '-o-transform',
  msTransform: '-ms-transform',
  MozTransform: '-moz-transform',
  transform: 'transform',
}

let transform:keyof typeof TRANSFORMS = 'transform'
export function getTransformName() {
  return transform
}

export function has3d() {
  if (!window.getComputedStyle) {
    return false
  }

  const el = document.createElement('p')
  let result: string = ''

  // Add it to the body to get the computed style.
  document.body.insertBefore(el, null)

  Object.keys(TRANSFORMS).forEach((t: keyof typeof TRANSFORMS) => {
    if ((el.style as any)[t] !== undefined) {
      ;(el.style as any)[t] = 'translate3d(1px,1px,1px)'
      transform = t
      result = window.getComputedStyle(el).getPropertyValue(TRANSFORMS[t])
    }
  })
  if (el && el.parentNode) el.parentNode.removeChild(el)

  return result !== undefined && result.length > 0 && result !== 'none'
}
/* eslint-disable */
// check support passive
let supportsPassive = false
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true
    },
  })
  window.addEventListener('test' as keyof WindowEventMap, null as any, opts)
} catch (e) {}
/* eslint-enable */

export const eventPassive = supportsPassive ? { passive: true } : false
