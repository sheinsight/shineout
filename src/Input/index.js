import { compose } from '../utils/func'
import inputable from '../Form/inputable'
import inputBorder from '../hoc/inputBorder'
import delay from '../hoc/delay'
import Input from './Input'
import Number from './Number'
import Group from './Group'

const exports = compose(inputBorder({}), inputable, delay(400))(Input)
exports.Group = inputBorder({ tag: 'div', isGroup: true })(Group)
exports.Number = compose(inputBorder({}), inputable)(Number)

export default exports
