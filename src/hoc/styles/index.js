import resizableLess from './resizable.less'
import moveableLess from './moveable.less'
import hidableLess from './hidable.less'
import inputTitleLess from './inputTitle.less'
import genaration from '../../utils/classname'

export const hidableClass = genaration(hidableLess, 'hidable')
export const moveableClass = genaration(moveableLess, 'moveable')
export const resizableClass = genaration(resizableLess, 'resizable')
export const inputTitleClass = genaration(inputTitleLess, 'input-title-box')
