import React from 'react'
import pagable from '../hoc/pagable'
import { PaginationProps } from '../Pagination/Props'

export default function Pagination<T extends { pagination: PaginationProps }>(Origin: React.ComponentType) {
  return (props: T) => {
    const { pagination } = props
    const Render = pagination ? pagable(Origin) : Origin
    return <Render {...props} />
  }
}
