import { compose } from '../utils/func'
import inputable from '../Form/inputable'
import Datum from '../Datum'
import { consumer } from '../Checkbox/context'
import Group from './Group'
import Radio from './Radio'
import { RadioType } from "./Props"

const exports: any = consumer(Radio)
exports.Group = compose(
  inputable,
  Datum.hoc({ limit: 1, bindProps: ['disabled', 'format', 'prediction'], pure: false })
)(Group)

exports.displayName = 'ShineoutRadio'
exports.Group.displayName = 'ShineoutRadioGroup'

export default exports as RadioType
