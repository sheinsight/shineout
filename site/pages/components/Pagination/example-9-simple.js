/**
 * cn - simple 模式
 *    -- layout 设置为 simple；注意：simple 模式不与其他layout共存。
 * en - simple mode
 *    -- layout set to simple; Note: simple mode does not coexist with other layouts.
 */
import React from 'react'
import { Pagination } from 'shineout'

export default function () {
  return <Pagination layout={['simple']} pageSize={20} total={100} />
}
