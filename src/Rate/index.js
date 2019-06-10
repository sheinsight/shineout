import React from 'react'
import Component from './Rate'
import inputable from '../Form/inputable'

export default (background, front, opts = {}) => {
  const Rate = inputable(props => (
    <Component {...opts} {...props} background={background} front={front || background} />
  ))
  Rate.displayName = 'ShineoutRate'
  return Rate
}

