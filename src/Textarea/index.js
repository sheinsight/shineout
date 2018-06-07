import { compose } from '../utils/func'
import inputable from '../Form/inputable'
import wrapper from '../Input/wrapper'
import Textarea from './Textarea'

const input = compose(
  inputable({ delay: 400 }),
  wrapper({ overflow: 'auto' }),
)

export default input(Textarea)
