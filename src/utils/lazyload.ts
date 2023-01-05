import { eventPassive } from './dom/detect'
import { getUidStr } from './uid'
import { docSize } from './dom/document'

type Timer = NodeJS.Timeout | null

type LazyConfig = {
  container?: Element | null
  element: Element
  render: Function
  offset: number
  noRemove?: boolean
  observer?: IntersectionObserver
}

const throttle = 80
const components: { [x: string]: LazyConfig } = {}

let timeout: Timer = null
let isLock = false

const winHeight = docSize.height

const getRect = (el: Element) => {
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
    const { element, render, container, offset, noRemove } = components[k]
    const rect = element.getBoundingClientRect()
    const containerRect = getRect(container!)
    if (rect.bottom + offset < containerRect.top || rect.top - offset > containerRect.bottom) return
    if (!noRemove) delete components[k]
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

export function removeStack(id?: string | null, removeListener?: boolean) {
  if (!id || !components[id]) return
  const { observer, container } = components[id]
  const scrollEl = container || document
  if (window.IntersectionObserver) {
    if (observer && observer.disconnect) observer.disconnect()
  } else if (removeListener) {
    scrollEl.removeEventListener('scroll', handleScroll)
  }
  delete components[id]
}

function getObserver(obj: LazyConfig, id: string) {
  const { container = null, offset, render, noRemove } = obj
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(en => {
        if (en.isIntersecting || en.intersectionRatio > 0) {
          render()
          if (!noRemove) removeStack(id)
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

export function addStack(obj: LazyConfig) {
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
  const containerRect = getRect(obj.container!)

  if (rect.bottom + obj.offset < containerRect.top || rect.top - obj.offset > containerRect.bottom) {
    components[id] = obj
    return id
  }

  obj.render()
  if (obj.noRemove) {
    components[id] = obj
    return id
  }
  return null
}

export function throttleWrapper(cb: Function) {
  let timer: Timer = null
  return (...args: any[]) => {
    const ctx = this
    if (!timer) {
      timer = setTimeout(() => {
        cb.apply(ctx, args)
        timer = null
      }, throttle)
    }
  }
}
