import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Switch from './Switch'
import { consumer } from '../Checkbox/context'
import { SwitchType } from './Props'

const exports: any = compose(
  inputable,
  consumer
)(Switch)

exports.displayName = 'ShineoutSwitch'
exports.Switch = Switch

export default exports as SwitchType
