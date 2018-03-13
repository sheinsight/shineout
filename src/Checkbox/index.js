import inputable from '../Form/inputable'
import Checkbox from './Checkbox'
import Datum from '../Datum'
import Group from './Group'

const exports = inputable(0, Checkbox)
exports.Group = Datum.hoc(Group, 'list', 'value')

export default exports
