import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Checkbox from './Checkbox'
import Datum from '../Datum'
import Group from './Group'
import { consumer } from './context'
import { CheckboxType, GroupDatumArgsType } from './Props'

const bindProps: GroupDatumArgsType[] = ['disabled', 'format', 'prediction', 'separator']
const exports: any = compose(
  inputable,
  consumer
)(Checkbox)
exports.Group = compose(
  inputable,
  Datum.hoc({ bindProps: bindProps })
)(Group)
exports.displayName = 'ShineoutCheckbox'
exports.Group.displayName = 'ShineoutCheckboxGroup'

export default exports as CheckboxType
