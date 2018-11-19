import { compose } from '../utils/func'
import delay from '../hoc/delay'
import trim from '../hoc/trim'
import inputable from '../Form/inputable'
import inputBorder from '../hoc/inputBorder'
import Component from './Textarea'

const input = compose(
  inputBorder({}),
  inputable,
  delay(400),
  trim,
)

const Textarea = input(Component)

Textarea.displayName = 'ShineoutTextarea'

export default Textarea
