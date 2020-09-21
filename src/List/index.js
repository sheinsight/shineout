import L from './List'
import hidable from '../hoc/hidable'
import VList from './default'

const List = function(type, duration, display) {
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

List.List = VList

export default List
