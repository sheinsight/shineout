import { eventPassive } from './dom/detect'
import { getUidStr } from './uid'

const throttle = 80
const components = {}
let timeout = null
let isLock = false

const winHeight = window.innerHeight || document.documentElement.clientHeight

export function addStack(obj) {
  const rect = obj.element.getBoundingClientRect()

  if (rect.bottom < 0 || rect.top > winHeight) {
    const id = getUidStr()
    components[id] = obj
    return id
  }

  obj.render()
  return null
}

export function removeStack(id) {
  if (!id) return
  delete components[id]
}

export function dispatch() {
  if (isLock) return
  isLock = true

  // handle
  Object.keys(components).forEach((k) => {
    const { element, render } = components[k]
    const rect = element.getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > winHeight) return

    delete components[k]
    render()
  })

  isLock = false
}

// scroll event
document.addEventListener('scroll', () => {
  if (timeout) clearTimeout(timeout)

  timeout = setTimeout(() => {
    dispatch()
    timeout = null
  }, throttle)
}, eventPassive)
