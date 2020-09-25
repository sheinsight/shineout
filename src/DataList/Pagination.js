import React from 'react'
import pagable from '../hoc/pagable'

export default function(Origin) {
  return props => {
    // eslint-disable-next-line react/prop-types
    const { pagination } = props
    const Render = pagination ? pagable(Origin) : Origin
    return <Render {...props} />
  }
}
