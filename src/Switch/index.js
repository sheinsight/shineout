import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Switch from './Switch'
import { consumer } from '../Checkbox/context'

const exports = compose(
  inputable,
  consumer
)(Switch)

exports.displayName = 'ShineoutSwitch'
exports.Switch = Switch

export default exports
