import Cascader from './Cascader'
import inputable from '../Form/inputable'
import inputBorder from '../hoc/inputBorder'
import { selectClass } from '../styles'
import { compose } from '../utils/func'

export default compose(
  inputBorder({ className: selectClass('_'), tag: 'span' }),
  inputable,
)(Cascader)
