import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Checkbox from './Checkbox'
import Datum from '../Datum'
import Group from './Group'

const exports = inputable({}, Checkbox)
exports.Group = compose(inputable({}), Datum.hoc({}))(Group)
exports.Checkbox = Checkbox

export default exports
