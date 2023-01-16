import React from 'react'
import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Datum from '../Datum'
import inputBorder from '../hoc/inputBorder'
import { selectClass } from './styles'
import tiled, { advancedFilterHOC } from '../TreeSelect/tiled'
import Select from './Select'
import filter from './filter'
import group from './group'
import absolute from '../Table/context'
import { SelectType, SelectPropsWidthDatum, SelectPropsWidthLimitWrap } from './Props'

const limitWrap = <Item, Value>(Origin: React.ComponentType<SelectPropsWidthDatum<Item, Value>>) => (
  props: SelectPropsWidthLimitWrap<Item, Value>
) => {
  // eslint-disable-next-line
  const limit = props.multiple ? 0 : 1
  return <Origin {...props} limit={limit} />
}

const exportSelect = compose(
  inputable,
  inputBorder({ className: selectClass('_'), tag: 'div' }),
  limitWrap,
  Datum.hoc({ bindProps: ['disabled', 'limit', 'format', 'prediction', 'separator'], pure: false }),
  advancedFilterHOC,
  filter,
  tiled({ dataKey: 'treeData' }),
  group,
  absolute
)(Select)

exportSelect.displayName = 'ShineoutSelect'

export default exportSelect as SelectType
