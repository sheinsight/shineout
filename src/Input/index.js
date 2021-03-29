import { compose } from '../utils/func'
import inputable from '../Form/inputable'
import inputBorder from '../hoc/inputBorder'
import delay from '../hoc/delay'
import trim from '../hoc/trim'
import coin from '../hoc/coin'
import Input from './Input'
import Number from './Number'
import Group from './Group'
import Password from './Password'

const exports = compose(
  inputable,
  inputBorder({}),
  delay(400),
  trim,
  coin('input')
)(Input)
exports.Group = inputBorder({ tag: 'div', isGroup: true, from: 'input' })(Group)
exports.Number = compose(
  inputable,
  inputBorder({}),
  coin()
)(Number)
exports.Password = compose(
  inputable,
  inputBorder({})
)(Password)

exports.displayName = 'ShineoutInput'
exports.Number.displayName = 'ShineoutInputNumber'
exports.Password.displayName = 'ShineoutInputPassword'
exports.Group.displayName = 'ShineoutInputGroup'

export default exports
