import inputable from '../Form/inputable'
import Checkbox from './Checkbox'
import Datum from '../Datum'
import Group from './Group'

const exports = inputable(0, Checkbox)
exports.Group = inputable(0, Datum.hoc(Group, 'list', 'value'))
exports.Checkbox = Checkbox

export default exports
