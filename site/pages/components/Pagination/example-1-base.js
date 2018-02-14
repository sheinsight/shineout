/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Pagination } from 'shineout'

export default function () {
  return (
    <Pagination defaultCurrent={10} total={1000} />
  )
}
