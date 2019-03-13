import { docScroll } from './document'

export const getPosition = (position, el) => {
  const rect = el.getBoundingClientRect()
  const scrollTop = docScroll.top
  const scrollLeft = docScroll.left

  let left
  let top

  switch (position) {
    case 'top-left':
      left = scrollLeft + rect.left
      top = scrollTop + rect.top
      break
    case 'top':
      left = scrollLeft + rect.left + rect.width / 2
      top = scrollTop + rect.top
      break
    case 'top-right':
      left = scrollLeft + rect.left + rect.width
      top = scrollTop + rect.top
      break
    case 'left-top':
      left = scrollLeft + rect.left
      top = scrollTop + rect.top
      break
    case 'left':
      left = scrollLeft + rect.left
      top = scrollTop + rect.top + rect.height / 2
      break
    case 'left-bottom':
      left = scrollLeft + rect.left
      top = scrollTop + rect.bottom
      break
    case 'right-top':
      left = scrollLeft + rect.left + rect.width
      top = scrollTop + rect.top
      break
    case 'right':
      left = scrollLeft + rect.left + rect.width
      top = scrollTop + rect.top + rect.height / 2
      break
    case 'right-bottom':
      left = scrollLeft + rect.left + rect.width
      top = scrollTop + rect.bottom
      break
    case 'bottom-left':
      left = scrollLeft + rect.left
      top = scrollTop + rect.top + rect.height
      break
    case 'bottom':
      left = scrollLeft + rect.left + rect.width / 2
      top = scrollTop + rect.top + rect.height
      break
    case 'bottom-right':
      left = scrollLeft + rect.left + rect.width
      top = scrollTop + rect.top + rect.height
      break
    default:
  }

  return { left: Math.round(left), top: Math.round(top) }
}
