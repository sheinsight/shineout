import { compose } from '../utils/func'
import delay from '../hoc/delay'
import trim from '../hoc/trim'
import inputable from '../Form/inputable'
import Component from './EditableArea'
import absolute from '../Table/context'

const EditableArea = compose(
  inputable,
  delay(400),
  trim,
  absolute
)(Component)

EditableArea.displayName = 'ShineoutEditableArea'

export default EditableArea
