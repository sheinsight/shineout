import List from './List'
import hidable from '../hoc/hidable'

export default function (type, duration) {
  switch (duration) {
    case 'fast':
      duration = 240
      break
    case 'slow':
      duration = 480
      break
    default:
      duration = 360
      break
  }

  if (typeof type === 'string') type = [type]

  return hidable(List, type, duration)
}
