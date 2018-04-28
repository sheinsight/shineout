import wrapper from '../Input/wrapper'
import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import { datepickerClass } from '../styles'
import DatePicker from './DatePicker'
import { setLocate } from './locate'

const exp = compose(
  wrapper({ className: datepickerClass('_') }),
  inputable({ delay: 1 }),
)(DatePicker)

exp.setLocate = setLocate

export default exp
