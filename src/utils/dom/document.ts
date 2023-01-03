export const docScroll = {
  get top() {
    return document.documentElement.scrollTop || document.body.scrollTop
  },
  get left() {
    return document.documentElement.scrollLeft || document.body.scrollLeft
  },
  set top(value) {
    document.documentElement.scrollTop = value
    document.body.scrollTop = value
  },
  set left(value) {
    document.documentElement.scrollLeft = value
    document.body.scrollLeft = value
  },
}

export const docSize = {
  get width() {
    return document.documentElement.clientWidth || document.body.clientWidth
  },
  get height() {
    return document.documentElement.clientHeight || document.body.clientHeight
  },
}
export function addEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | Document,
  eventType: keyof HTMLElementEventMap,
  cb: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  option?: boolean | AddEventListenerOptions
) {
  if (target.addEventListener) {
    target.addEventListener(eventType, cb, option)
  }

  return {
    remove: function remove() {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, cb)
      }
    },
  }
}
