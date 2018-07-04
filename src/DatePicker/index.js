import wrapper from '../Input/wrapper'
import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import { datepickerClass } from '../styles'
import Container from './Container'

const getClassName = opt =>
  datepickerClass('_', `${opt.range ? 'r' : 'c'}-${opt.type || 'date'}`)

const Datepicker = compose(
  wrapper({ className: getClassName, innerWidth: true }),
  inputable({}),
)(Container)

export default Datepicker
