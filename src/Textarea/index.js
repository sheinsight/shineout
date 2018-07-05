import { compose } from '../utils/func'
import delay from '../hoc/delay'
import inputable from '../Form/inputable'
import wrapper from '../Input/wrapper'
import Textarea from './Textarea'

const input = compose(
  wrapper({ overflow: 'auto' }),
  inputable,
  delay(400),
)

export default input(Textarea)
