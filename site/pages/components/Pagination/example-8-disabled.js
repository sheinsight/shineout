/**
 * cn - 禁用
 *    -- 设置 disabled 属性，可以禁用组件
 * en - Disabled
 *    -- Set the disabled property to disable the component.
 */
import React from 'react'
import { Pagination } from 'shineout'

export default function() {
  return <Pagination disabled defaultCurrent={10} layout={['links', 'list']} total={1000} />
}
