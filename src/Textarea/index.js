import { compose } from '../utils/func'
import delay from '../hoc/delay'
import trim from '../hoc/trim'
import inputable from '../Form/inputable'
import inputBorder from '../hoc/inputBorder'
import Textarea from './Textarea'

const input = compose(
  inputBorder({}),
  inputable,
  delay(400),
  trim,
)

export default input(Textarea)
