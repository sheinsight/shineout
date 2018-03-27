import { compose } from '../utils/func'
import inputable from '../Form/inputable'
import Datum from '../Datum'
import Group from './Group'
import Radio from './Radio'

const exports = Radio
exports.Group = compose(inputable({}), Datum.hoc({ limit: 1 }))(Group)

export default exports
