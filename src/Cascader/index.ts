import Component from './Cascader'
import inputable from '../Form/inputable'
import inputBorder from '../hoc/inputBorder'
import { selectClass } from '../Select/styles'
import { compose } from '../utils/func'
import filter from './filter'
import absolute from '../Table/context'
import { CascaderType } from './Props'

const Cascader: any = compose(
  inputable,
  inputBorder({ className: selectClass('_'), tag: 'span' }),
  filter,
  absolute
)(Component)

export default Cascader as CascaderType
