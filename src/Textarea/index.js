import { compose } from '../utils/func'
import delay from '../hoc/delay'
import inputable from '../Form/inputable'
import inputBorder from '../hoc/inputBorder'
import Textarea from './Textarea'

const input = compose(
  inputBorder({ overflow: 'auto' }),
  inputable,
  delay(400),
)

export default input(Textarea)
