import '../../styles/normalize.less'
import formLess from './form.less'
import genaration from '../../utils/classname'

export const formClass = genaration(formLess, 'form')
export const inputBorderClass = genaration(formLess, 'inputBorder')
