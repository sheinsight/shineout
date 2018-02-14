/**
 * cn - 文字 \n 通过 text 替换文字
 * en - Base
 */
import React from 'react'
import { Pagination } from 'shineout'

export default function () {
  return (
    <Pagination
      text={{ prev: 'Previous', next: 'Next', page: 'Page' }}
      defaultCurrent={10}
      total={1000}
    />
  )
}
