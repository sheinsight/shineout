import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Datum from '../Datum'
import wrapper from '../Input/wrapper'
import { selectClass } from '../styles'
import Select from './Select'
import filter from './filter'
import { setDefaultText } from './text'

const exportSelect = compose(
  wrapper({ className: selectClass('_'), noPadding: true }),
  inputable({}),
  Datum.hoc({ limit: 1 }),
  filter,
)(Select)

exportSelect.setDefaultText = setDefaultText

export default exportSelect
