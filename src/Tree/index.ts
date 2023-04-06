import Tree from './Tree'
import inputable from '../Form/inputable'
import { TreeFieldType } from './Props'

const Select = inputable(Tree) as TreeFieldType
const TreeExport = Object.assign(Tree, {
  displayName: 'ShineoutTree',
  Select,
  Field: Select,
})

export default TreeExport
