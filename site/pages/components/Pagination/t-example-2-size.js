/**
 * cn - 大小
 *    -- 内置了 3 种大小供选择，small, default, large，默认为 default
 * en - Size
 *    -- Three sizes are built in for selection: small, default, large, default value is default.
 */
import React from 'react'
import { Pagination } from 'shineout'

export default function() {
  return (
    <div>
      <Pagination size="small" total={1000} />
      <br />
      <Pagination total={1000} />
      <br />
      <Pagination size="large" total={1000} />
    </div>
  )
}
