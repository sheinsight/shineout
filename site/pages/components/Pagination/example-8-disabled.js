/**
 * cn - 禁用
 * en - Disabled
 */
import React from 'react'
import { Pagination } from 'shineout'

export default function () {
  return (
    <Pagination disabled defaultCurrent={10} layout={['links', 'list']} total={1000} />
  )
}
