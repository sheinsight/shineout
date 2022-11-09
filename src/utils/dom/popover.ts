import { docScroll, docSize } from './document'

interface Position {
  top?: number
  left?: number
  right?: number
  bottom?: number
}

const posKeys = ['left', 'top', 'bottom', 'right']
export type PositionStr = 'top-left' | 'top' | 'top-right' | 'left-top' | 'left' | 'left-bottom' | 'right-top' | 'right' | 'right-bottom' | 'bottom-left' | 'bottom' | 'bottom-right' | 'cover'
export const getPosition = (
  position: PositionStr,
  el: HTMLElement,
  container: HTMLElement | undefined = document.body
) => {
  const rect = el.getBoundingClientRect()
  let containerRect = { top: 0, left: 0, bottom: 0, right: 0 }
  if (container.tagName === 'BODY') container = undefined
  if (container) containerRect = container.getBoundingClientRect()
  const scrollTop = container ? 0 : docScroll.top
  const scrollLeft = container ? 0 : docScroll.left

  const pos: Position = {}
  switch (position) {
    case 'top-left':
      pos.left = scrollLeft + rect.left - containerRect.left
      pos.top = scrollTop + rect.top - containerRect.top
      break
    case 'top':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width / 2
      pos.top = scrollTop + rect.top - containerRect.top
      break
    case 'top-right':
      pos.right = (containerRect.right || docSize.width) - rect.right - scrollLeft
      pos.top = scrollTop + rect.top - containerRect.top
      break
    case 'left-top':
      pos.left = scrollLeft + rect.left - containerRect.left
      pos.top = scrollTop + rect.top - containerRect.top
      break
    case 'left':
      pos.left = scrollLeft + rect.left - containerRect.left
      pos.top = scrollTop + rect.top - containerRect.top + rect.height / 2
      break
    case 'left-bottom':
      pos.left = scrollLeft + rect.left - containerRect.left
      pos.top = scrollTop + rect.bottom - containerRect.bottom
      break
    case 'right-top':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width
      pos.top = scrollTop + rect.top - containerRect.top
      break
    case 'right':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width
      pos.top = scrollTop + rect.top - containerRect.top + rect.height / 2
      break
    case 'right-bottom':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width
      pos.top = scrollTop + rect.bottom - containerRect.bottom
      break
    case 'bottom-left':
      pos.left = scrollLeft + rect.left - containerRect.left
      pos.top = scrollTop + rect.top - containerRect.top + rect.height
      break
    case 'bottom':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width / 2
      pos.top = scrollTop + rect.top - containerRect.top + rect.height
      break
    case 'bottom-right':
      pos.right = (containerRect.right || docSize.width) - rect.right - scrollLeft
      pos.top = scrollTop + rect.top - containerRect.top + rect.height
      break
    case 'cover':
      pos.left = scrollLeft + rect.left - containerRect.left
      pos.top = scrollTop + rect.top - containerRect.top
      break
    default:
  }

  return posKeys.reduce(
    (data, key: keyof Position) => ({
      ...data,
      [key]: typeof pos[key] === 'number' ? `${Math.round(pos[key]!)}px` : 'auto',
    }),
    {} as Record<keyof Position, string>
  )
}
