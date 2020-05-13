import inputBorder from '../hoc/inputBorder'
import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import { datepickerClass } from '../styles'
import Container from './Container'
import value from './value'
import absolute from '../Table/context'

const getClassName = opt => datepickerClass('_', `${opt.range ? 'r' : 'c'}-${opt.type || 'date'}`)

const Datepicker = compose(
  inputable,
  inputBorder({ className: getClassName, innerWidth: true }),
  value,
  absolute
)(Container)

Datepicker.displayName = 'ShineoutDatepicker'

export default Datepicker
