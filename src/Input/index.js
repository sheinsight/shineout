import { compose } from '../utils/func'
import itemHoc from '../Form/itemHoc'
import Input from './Input'
import Number from './Number'
import wrapper from './wrapper'
import Group from './Group'

const wrap = component => compose(itemHoc, wrapper('label', false))(component)

const exports = wrap(Input)
exports.Group = wrapper('div', true)(Group)
exports.Number = wrap(Number)

export default exports
