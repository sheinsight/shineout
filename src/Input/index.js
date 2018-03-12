import { compose } from '../utils/func'
import inputable from '../Form/inputable'
import Input from './Input'
import Number from './Number'
import wrapper from './wrapper'
import Group from './Group'

const wrap = component => compose(inputable, wrapper({}))(component)

const exports = wrap(Input)
exports.Group = wrapper({ tag: 'div', isGroup: true })(Group)
exports.Number = wrap(Number)

export default exports
