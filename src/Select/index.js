import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Datum from '../Datum'
import wrapper from '../Input/wrapper'
import { selectClass } from '../styles'
import Select from './Select'

const input = compose(
  wrapper({ className: selectClass('_'), noPadding: true }),
  inputable({}),
  Datum.hoc({}),
)

export default input(Select)
