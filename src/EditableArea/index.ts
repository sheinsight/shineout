import trim from '../hoc/trim'
import delay from '../hoc/delay'
import Component from './EditableArea'
import { compose } from '../utils/func'
import inputable from '../Form/inputable'
import { EditableAreaType } from './Props'

const EditableArea: any = compose(
  inputable,
  delay(400),
  trim
)(Component)

EditableArea.displayName = 'ShineoutEditableArea'

export default EditableArea as EditableAreaType
