/**
 * cn - 基本用法
 *    -- 最基本的使用
 * en - Base
 *    -- The basic usage
 */
import React from 'react'
import { Pagination } from 'shineout'

export default function () {
  return (
    <Pagination
      style={{ margin: '10px 0 0 0' }}
      align="right"
      size="small"
      total={100}
      current={1}
      pageSize={10}
      pageSizeList={[10, 20, 50, 100]}
      text={{
        jumper: '跳至 {input} 页',
        page: '条/页',
      }}
      layout={['links', 'list', 'jumper']}
    />
  )
}
