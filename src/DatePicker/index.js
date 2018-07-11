import wrapper from '../Input/wrapper'
import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import { datepickerClass } from '../styles'
import Container from './Container'
import value from './value'

const getClassName = opt =>
  datepickerClass('_', `${opt.range ? 'r' : 'c'}-${opt.type || 'date'}`)

const Datepicker = compose(
  wrapper({ className: getClassName, innerWidth: true }),
  inputable,
  value,
)(Container)

export default Datepicker
