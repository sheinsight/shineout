import '../../styles/normalize.less'
import resizableLess from './resizable.less'
import moveableLess from './moveable.less'
import hidableLess from './hidable.less'
import genaration from '../../utils/classname'

export const hidableClass = genaration(hidableLess, 'hidable')
export const moveableClass = genaration(moveableLess, 'moveable')
export const resizableClass = genaration(resizableLess, 'resizable')
