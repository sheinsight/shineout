import Radio from './Radio'
import Datum from '../Datum'
import Group from './Group'

const exports = Radio
exports.Group = Datum.hoc(Group, 'list', 'value', 1)

export default exports
