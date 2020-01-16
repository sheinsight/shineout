import { eventPassive } from './dom/detect'
import { getUidStr } from './uid'
import { docSize } from './dom/document'

const throttle = 80
const components = {}
let timeout = null
let isLock = false

const winHeight = docSize.height

const getRect = el => {
  // document or invalid element
  if (!el || !el.getBoundingClientRect) {
    if (el) console.error(`the ${el} is not a element`)
    return { top: 0, bottom: winHeight }
  }

  return el.getBoundingClientRect()
}

export function dispatch() {
  if (isLock) return
  isLock = true

  // handle
  Object.keys(components).forEach(k => {
    const { element, render, container, offset } = components[k]
    const rect = element.getBoundingClientRect()
    const containerRect = getRect(container)
    if (rect.bottom + offset < containerRect.top || rect.top - offset > containerRect.bottom) return

    delete components[k]
    render()
  })

  isLock = false
}

const handleScroll = () => {
  if (timeout) clearTimeout(timeout)

  timeout = setTimeout(() => {
    dispatch()
    timeout = null
  }, throttle)
}

export function addStack(obj) {
  const scrollEl = obj.container || document
  obj.offset = obj.offset || 0

  scrollEl.addEventListener('scroll', handleScroll, eventPassive)

  const rect = obj.element.getBoundingClientRect()
  const containerRect = getRect(obj.container)

  if (rect.bottom + obj.offset < containerRect.top || rect.top - obj.offset > containerRect.bottom) {
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
