import { compose } from '../utils/func'
import inputable from '../Form/inputable'
import delay from '../hoc/delay'
import Input from './Input'
import Number from './Number'
import wrapper from './wrapper'
import Group from './Group'

const exports = compose(wrapper({}), inputable, delay(400))(Input)
exports.Group = wrapper({ tag: 'div', isGroup: true })(Group)
exports.Number = compose(wrapper({}), inputable)(Number)

export default exports
