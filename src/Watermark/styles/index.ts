import '../../styles/normalize.less'
import watermarkLess from './watermark.less'
import genaration from '../../utils/classname'

export const watermarkClass = genaration(watermarkLess, 'watermark')
