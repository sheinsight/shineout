import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Checkbox from './Checkbox'
import Datum from '../Datum'
import Group from './Group'
import { consumer } from './context'

const exports = compose(inputable, consumer)(Checkbox)
exports.Group = compose(inputable, Datum.hoc({ bindProps: ['disabled', 'format', 'prediction'] }))(Group)
exports.Checkbox = Checkbox

exports.displayName = 'ShineoutCheckbox'
exports.Group.displayName = 'ShineoutCheckboxGroup'

export default exports
