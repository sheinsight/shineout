import wrapper from '../Input/wrapper'
import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import { datepickerClass } from '../styles'
import DatePicker from './DatePicker'

const exp = compose(
  wrapper({ className: datepickerClass('_') }),
  inputable({ delay: 0 }),
)(DatePicker)

export default exp
