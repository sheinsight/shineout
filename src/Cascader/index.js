import Component from './Cascader'
import inputable from '../Form/inputable'
import inputBorder from '../hoc/inputBorder'
import { selectClass } from '../styles'
import { compose } from '../utils/func'

const Cascader = compose(
  inputBorder({ className: selectClass('_'), tag: 'span' }),
  inputable,
)(Component)

Cascader.displayName = 'ShineoutCascader'

export default Cascader
