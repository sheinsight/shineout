import List from './List'
import hidable from '../hoc/hidable'

export default function(type, duration, display) {
  switch (duration) {
    case 'fast':
      duration = 240
      break
    case 'slow':
      duration = 480
      break
    default:
      if (typeof duration !== 'number') duration = 360
      break
  }

  if (typeof type === 'string') type = [type]

  return hidable(List, { type, duration, display })
}
