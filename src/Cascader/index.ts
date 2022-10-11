import Component from './Cascader'
import inputable from '../Form/inputable'
import inputBorder from '../hoc/inputBorder'
import { selectClass } from '../Select/styles'
import { compose } from '../utils/func'
import filter from './filter'
import absolute from '../Table/context'
import React from 'react'
import { CascaderProps } from './interface'

const Cascader: React.ComponentType<CascaderProps<any, string[]>> = compose(
  inputable,
  inputBorder({ className: selectClass('_'), tag: 'span' }),
  filter,
  absolute
)(Component)

export default Cascader
