import inputable from '../Form/inputable'
import Checkbox from './Checkbox'
import Datum from '../Datum'
import Group from './Group'

const exports = inputable({}, Checkbox)
exports.Group = inputable({}, Datum.hoc(Group, 'list', 'value'))
exports.Checkbox = Checkbox

export default exports
