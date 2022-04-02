import '../../styles/normalize.less'
import lazyloadLess from './lazyload.less'
import genaration from '../../utils/classname'

export const lazyloadClass = genaration(lazyloadLess, 'lazyload')
