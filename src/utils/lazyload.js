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

export function removeStack(id) {
  if (!id || !components[id]) return
  const { observer } = components[id]
  if (observer && observer.disconnect) observer.disconnect()
  delete components[id]
}

function getObserver(obj, id) {
  const { container = null, offset, render } = obj
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          render()
          removeStack(id)
        }
      })
    },
    {
      root: container,
      rootMargin: `${offset}px`,
    }
  )
  obj.observer = observer
  return observer
}

export function addStack(obj) {
  const id = getUidStr()
  const scrollEl = obj.container || document
  obj.offset = obj.offset || 0
  if (window.IntersectionObserver) {
    components[id] = obj
    const observer = getObserver(obj, id)
    observer.observe(obj.element)
    return id
  }
  scrollEl.addEventListener('scroll', handleScroll, eventPassive)
  const rect = obj.element.getBoundingClientRect()
  const containerRect = getRect(obj.container)

  if (rect.bottom + obj.offset < containerRect.top || rect.top - obj.offset > containerRect.bottom) {
    components[id] = obj
    return id
  }

  obj.render()
  return null
}

export function throttleWrapper(cb) {
  let timer = null
  return (...args) => {
    const ctx = this
    if (!timer) {
      timer = setTimeout(() => {
        cb.apply(ctx, args)
        timer = null
      }, throttle)
    }
  }
}
