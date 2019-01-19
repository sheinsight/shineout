/**
 * cn - 文字
 *    -- 通过 text 替换文字
 * en - Text
 *    -- Set text property to replace the default text..
 */
import React from 'react'
import { Pagination } from 'shineout'

function info({ current, pageSize, total }) {
  const from = (current - 1) * pageSize + 1
  let to = current * pageSize
  if (to > total) to = total
  return `${from} to ${to} of ${total} items`
}

export default function() {
  return (
    <Pagination
      text={{
        prev: 'Previous',
        next: 'Next',
        page: '/ page',
      }}
      total={256}
      pageSize={50}
      layout={['links', 'list', info]}
    />
  )
}
