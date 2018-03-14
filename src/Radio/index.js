import inputable from '../Form/inputable'
import Datum from '../Datum'
import Group from './Group'
import Radio from './Radio'

const exports = Radio
exports.Group = inputable(0, Datum.hoc(Group, 'list', 'value', 1))

export default exports
