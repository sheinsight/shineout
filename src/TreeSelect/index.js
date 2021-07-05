import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import inputBorder from '../hoc/inputBorder'
import { treeSelectClass } from '../styles'
import TreeSelect from './TreeSelect'
import filter from './filter'
import datum from './datum'
import tiled, { advancedFilterHOC } from './tiled'
import absolute from '../Table/context'

const exportTreeSelect = compose(
  inputable,
  inputBorder({ className: treeSelectClass('_'), tag: 'div' }),
  datum,
  advancedFilterHOC,
  filter,
  tiled({}),
  absolute
)(TreeSelect)

exportTreeSelect.displayName = 'ShineoutTreeSelect'

export default exportTreeSelect
