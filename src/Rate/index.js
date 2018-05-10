import React from 'react'
import Rate from './Rate'
import inputable from '../Form/inputable'

export default (background, front, opts = {}) => inputable({ delay: 1 })(props => (
  <Rate {...opts} {...props} background={background} front={front || background} />
))
