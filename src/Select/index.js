import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Datum from '../Datum'
import wrapper from '../Input/wrapper'
import { selectClass } from '../styles'
import Select from './Select'

const input = compose(
  wrapper({}),
  inputable({}),
  Datum.hoc({ className: selectClass('_') }),
)

export default input(Select)
