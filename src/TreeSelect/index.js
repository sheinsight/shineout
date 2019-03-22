import React from 'react'
import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Datum from '../Datum'
import inputBorder from '../hoc/inputBorder'
import { treeSelectClass } from '../styles'
import TreeSelect from './TreeSelect'
import filter from './filter'

const exportTreeSelect = compose(
  inputable,
  inputBorder({ className: treeSelectClass('_'), tag: 'div' }),
  Datum.hoc({ bindProps: ['disabled', 'format', 'prediction'] }),
  filter
)(TreeSelect)

exportTreeSelect.displayName = 'ShineoutTreeSelect'

export default exportTreeSelect
