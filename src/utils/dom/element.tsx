import React, { ReactNode } from 'react'
import { throttle } from '../func'

if (Element && !Element.prototype.matches) {
  const proto: Element & {
    matchesSelector?: (() => boolean)
    mozMatchesSelector?: (() => boolean)
    msMatchesSelector?: (() => boolean)
    oMatchesSelector?: (() => boolean)
  } = Element.prototype

  proto.matches =
    proto.matchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector ||
    proto.webkitMatchesSelector
}

export function getParent(el: HTMLElement | null | Element, target?: string | HTMLElement) {
  if (!target) {
    return null
  }

  let temp: HTMLElement | Element | null = el
  while (temp) {
    if (typeof target === 'string') {
      if (temp.matches && temp.matches(target)) {
        return temp
      }
    } else if (temp === target) {
      return temp
    }

    temp = temp.parentElement
  }

  return null
}

const isTwoCNChar = (str: string) => /^[\u4e00-\u9fa5]{2}$/.test(str)
const SPACE = ' '

export function wrapSpan(children: ReactNode, insertSpace = false): any {
  if (!children) return children
  return React.Children.map(children, item => {
    if (typeof item === 'string') {
      if (insertSpace && isTwoCNChar(item)) return <span>{item.split('').join(SPACE)}</span>
      return <span>{item}</span>
    }
    return item
  })
}

export function dispatchEvent(form: HTMLFormElement, name: string, detail: any) {
  if (!form) return
  let event
  if (CustomEvent) {
    event = new CustomEvent(name, { bubbles: false, cancelable: true, detail })
  } else {
    event = document.createEvent('HTMLEvents')
    event.initEvent(name, true, true)
  }
  form.dispatchEvent(event)
}

export function cssSupport(attr: keyof CSSStyleDeclaration, value: string) {
  const element = document.createElement('div')
  if (attr in element.style) {
    if (attr !== 'length' && attr !== 'parentRule') {
      const attrs = element.style[attr]
      element.style[attr] = value as keyof typeof attrs
    }
    return element.style[attr] === value
  }
  return false
}

export function copyBoundingClientRect(el: HTMLElement) {
  if (!el) return null
  const rect = el.getBoundingClientRect()
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y,
  }
}

interface IEDocument extends Document {
  selection: {
    createRange: Function
  }
}

export function getCursorOffset(length: number) {
  if (window.getSelection) {
    return window.getSelection()!.anchorOffset
  }
  if ((document as IEDocument).selection) {
    const range = (document as IEDocument).selection.createRange()
    range.moveStart('character', -length)
    return range.text.length
  }
  return null
}

function end<T extends HTMLElement & { selectionStart?: number }>(element: T) {
  if (!element) return
  element.focus()
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    element.selectionStart = -1
    return
  }
  if (window.getSelection) {
    const range = window.getSelection()
    if (range) {
      range.selectAllChildren(element)
      range.collapseToEnd()
    }
  } else if ((document as IEDocument).selection) {
    const range = (document as IEDocument).selection.createRange()
    range.moveToElementText(element)
    range.collapse(false)
    range.select()
  }
}

function select(element: HTMLElement) {
  if (element && element.innerText && element.innerText.length === 0) {
    element.focus()
    return
  }
  if (window.getSelection && document.createRange) {
    if (element) element.focus()
    const range = document.createRange()
    if (element) range.selectNodeContents(element)
    const sel = window.getSelection()
    if (sel) {
      sel.removeAllRanges()
      sel.addRange(range)
    }
  } else if ((document as IEDocument).selection) {
    const range = (document as IEDocument).selection.createRange()
    range.moveToElementText(element)
    range.select()
  }
}

export const focusElement = {
  select,
  end,
  wrapSpan,
  copyBoundingClientRect,
}
interface IEWindow extends Window {
  clipboardData: {
    getData: Function
  }
}
export const preventPasteFile = (
  e: React.ClipboardEvent,
  beforeHandler?: Function,
  { noLineBreak = true, convertBr = ' ' }: { noLineBreak?: boolean; convertBr?: string | Function } = {}
) => {
  let text = (e.clipboardData || ((window as unknown) as IEWindow).clipboardData).getData('text/plain')
  // 删除复制的换行符号
  if (noLineBreak && text) {
    if (typeof convertBr === 'function') {
      text = convertBr(text).replace(/([\t\n\f\r\v])+/g, ' ')
    } else {
      text = text.replace(/([\t\n\f\r\v])+/g, convertBr)
    }
  }
  e.preventDefault()
  if (beforeHandler) {
    beforeHandler(text)
  }
  document.execCommand('insertText', false, text)
}

export const parsePxToNumber = (str: string) => Number(str.replace(/\s+|px/gi, ''))

interface ResizeOption {
  direction?: 'x' | 'y' | boolean
  timer?: number
}

type Handler = (this: Window, ev: UIEvent) => any

export const addResizeObserver = (el: HTMLElement, handler: any, options: ResizeOption = {}) => {
  const { direction, timer } = options
  const [throttleHandler, cleanTimer] = throttle(handler, timer)
  let h = throttleHandler
  let lastWidth: number
  let lastHeight: number
  if (window.ResizeObserver) {
    if (direction) {
      lastWidth = el.clientWidth
      lastHeight = el.clientHeight
      h = (entry: { contentRect: { width: number; height: number } }[]) => {
        const { width, height } = entry[0].contentRect
        if (width && direction === 'x') {
          if (lastWidth !== width) {
            throttleHandler(entry)
          }
        } else if (direction === 'y') {
          if (height && lastHeight !== height) {
            throttleHandler(entry)
          }
        } else if (width && height) {
          throttleHandler(entry, { x: lastWidth !== width, y: lastHeight !== height })
        }
        lastWidth = width
        lastHeight = height
      }
    }
    let observer: ResizeObserver | null = new ResizeObserver(h as ResizeObserverCallback)
    observer.observe(el)
    return () => {
      if (observer) {
        observer.disconnect()
      }
      cleanTimer(this)
      observer = null
    }
  }
  window.addEventListener('resize', throttleHandler as Handler)
  return () => {
    window.removeEventListener('resize', handler)
    cleanTimer()
  }
}
