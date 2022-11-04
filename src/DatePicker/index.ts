import inputBorder from '../hoc/inputBorder'
import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import { datepickerClass } from './styles'
import Container from './Container'
import value from './value'
import absolute from '../Table/context'
import { DatePickerType } from './Props'

const getClassName = (opt: any) => datepickerClass('_', `${opt.range ? 'r' : 'c'}-${opt.type || 'date'}`)

const Datepicker: any = compose(
  inputable,
  inputBorder({ className: getClassName, innerWidth: true }),
  value,
  absolute
)(Container)

Datepicker.displayName = 'ShineoutDatepicker'

export default Datepicker as DatePickerType
