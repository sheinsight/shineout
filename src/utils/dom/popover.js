import { docScroll, docSize } from './document'

export const getPosition = (position, el) => {
  const rect = el.getBoundingClientRect()
  const scrollTop = docScroll.top
  const scrollLeft = docScroll.left
  const pos = {}

  switch (position) {
    case 'top-left':
      pos.left = scrollLeft + rect.left
      pos.top = scrollTop + rect.top
      break
    case 'top':
      pos.left = scrollLeft + rect.left + rect.width / 2
      pos.top = scrollTop + rect.top
      break
    case 'top-right':
      pos.right = docSize.width - rect.right - scrollLeft
      pos.top = scrollTop + rect.top
      break
    case 'left-top':
      pos.left = scrollLeft + rect.left
      pos.top = scrollTop + rect.top
      break
    case 'left':
      pos.left = scrollLeft + rect.left
      pos.top = scrollTop + rect.top + rect.height / 2
      break
    case 'left-bottom':
      pos.left = scrollLeft + rect.left
      pos.top = scrollTop + rect.bottom
      break
    case 'right-top':
      pos.left = scrollLeft + rect.left + rect.width
      pos.top = scrollTop + rect.top
      break
    case 'right':
      pos.left = scrollLeft + rect.left + rect.width
      pos.top = scrollTop + rect.top + rect.height / 2
      break
    case 'right-bottom':
      pos.left = scrollLeft + rect.left + rect.width
      pos.top = scrollTop + rect.bottom
      break
    case 'bottom-left':
      pos.left = scrollLeft + rect.left
      pos.top = scrollTop + rect.top + rect.height
      break
    case 'bottom':
      pos.left = scrollLeft + rect.left + rect.width / 2
      pos.top = scrollTop + rect.top + rect.height
      break
    case 'bottom-right':
      pos.right = docSize.width - rect.right - scrollLeft
      pos.top = scrollTop + rect.top + rect.height
      break
    default:
  }

  return Object.keys(pos).reduce((data, key) => ({ ...data, [key]: Math.round(pos[key]) }), {})
}
