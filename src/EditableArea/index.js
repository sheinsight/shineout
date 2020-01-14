import { compose } from '../utils/func'
import delay from '../hoc/delay'
import inputable from '../Form/inputable'
import Component from './EditableArea'

const edit = compose(
  inputable,
  delay(400)
)

const EditableArea = edit(Component)

EditableArea.displayName = 'ShineoutEditableArea'

export default EditableArea
