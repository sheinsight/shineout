import { compose } from '../utils/func'
import delay from '../hoc/delay'
import inputable from '../Form/inputable'
import Component from './EditableArea'

const EditableArea = compose(
  inputable,
  delay(400)
)(Component)

EditableArea.displayName = 'ShineoutEditableArea'

export default EditableArea
