// export const docScroll = {
//   get top() {
//     return document.documentElement.scrollTop || document.body.scrollTop
//   },
//   get left() {
//     return document.documentElement.scrollLeft || document.body.scrollLeft
//   },
//   set top(value) {
//     document.documentElement.scrollTop = value
//     document.body.scrollTop = value
//   },
//   set left(value) {
//     document.documentElement.scrollLeft = value
//     document.body.scrollLeft = value
//   },
// }

export const docScroll = (function() {
  let top
  let left
  const getScroll = function(e) {
    const doc = e.target
    top = doc.documentElement.scrollTop || doc.body.scrollTop
    left = doc.documentElement.scrollLeft || doc.body.scrollLeft
  }
  window.addEventListener('DOMContentLoaded', getScroll)
  window.addEventListener('scroll', getScroll)
  return {
    get top() {
      return top
    },
    get left() {
      return left
    },
    set top(value) {
      document.documentElement.scrollTop = value
      document.body.scrollTop = value
    },
    set left(value) {
      document.documentElement.scrollLeft = value
      document.body.scrollLeft = value
    },
    remove() {
      window.removeEventListener('DOMContentLoaded', getScroll)
      window.removeEventListener('scroll', getScroll)
    },
  }
})()

export const docSize = (function() {
  let width
  let height
  const getSize = function(e) {
    const doc = e.type === 'resize' ? e.target.document : e.target
    width = doc.documentElement.clientWidth || doc.body.clientWidth
    height = doc.documentElement.clientHeight || doc.body.clientHeight
  }
  window.addEventListener('DOMContentLoaded', getSize)
  window.addEventListener('resize', getSize, true)
  return {
    get width() {
      return width
    },
    get height() {
      return height
    },
    remove() {
      window.removeEventListener('DOMContentLoaded', getSize)
      window.removeEventListener('resize', getSize)
    },
  }
})()
// export const docSize = {
//   get width() {
//     return document.documentElement.clientWidth || document.body.clientWidth
//   },
//   get height() {
//     return document.documentElement.clientHeight || document.body.clientHeight
//   },
// }

export function addEventListener(target, eventType, cb, option) {
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
