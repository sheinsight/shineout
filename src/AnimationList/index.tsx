import L from './List'
import hidable from '../hoc/hidable'
import { ListDurationType, ListAnimationType } from './Props'

const List = function(type: ListAnimationType | ListAnimationType[], duration: ListDurationType, display?: string) {
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

  return hidable(L, { type, duration, display })
}

export default List
