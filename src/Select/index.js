import React from 'react'
import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Datum from '../Datum'
import inputBorder from '../hoc/inputBorder'
import { selectClass } from '../styles'
import Select from './Select'
import filter from './filter'

const limitWrap = Origin => (props) => {
  // eslint-disable-next-line
  const limit = props.multiple ? 0 : 1
  return <Origin {...props} limit={limit} />
}

const exportSelect = compose(
  inputBorder({ className: selectClass('_') }),
  inputable,
  limitWrap,
  Datum.hoc({ bindProps: ['disabled', 'limit', 'format', 'prediction'] }),
  filter,
)(Select)

exportSelect.displayName = 'ShineoutSelect'

export default exportSelect
