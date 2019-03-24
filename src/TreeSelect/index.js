import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import inputBorder from '../hoc/inputBorder'
import { treeSelectClass } from '../styles'
import TreeSelect from './TreeSelect'
import filter from './filter'
import datum from './datum'

const exportTreeSelect = compose(
  inputable,
  inputBorder({ className: treeSelectClass('_'), tag: 'div' }),
  datum,
  filter
)(TreeSelect)

exportTreeSelect.displayName = 'ShineoutTreeSelect'

export default exportTreeSelect
