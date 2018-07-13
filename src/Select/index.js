import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Datum from '../Datum'
import inputBorder from '../hoc/inputBorder'
import { selectClass } from '../styles'
import Select from './Select'
import filter from './filter'

const exportSelect = compose(
  inputBorder({ className: selectClass('_') }),
  inputable,
  Datum.hoc({ limit: 1 }),
  filter,
)(Select)

export default exportSelect
