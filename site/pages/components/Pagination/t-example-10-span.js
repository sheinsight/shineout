/**
 * cn - 按钮数量
 *    -- 分页器页码按钮数量
 * en - Span
 *    -- The number of pagination buttons
 */
import React from 'react'
import { Pagination } from 'shineout'

export default function() {
  return (
    <div>
      <Pagination defaultCurrent={10} total={1000} span={10} />
      <br />
      <Pagination defaultCurrent={10} total={1000} span={5} />
    </div>
  )
}
