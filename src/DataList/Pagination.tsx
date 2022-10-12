import React from 'react'
import pagable from '../hoc/pagable'

export default function Pagination(Origin) {
  return props => {
    const { pagination } = props
    const Render = pagination ? pagable(Origin) : Origin
    return <Render {...props} />
  }
}
