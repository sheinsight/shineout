/**
 * cn - 基本用法
 *    -- 最基本的使用
 * en - Base
 *    -- The most basic use
 */
import React from 'react'
import { Pagination } from 'shineout'

export default function () {
  return (
    <Pagination defaultCurrent={10} total={1000} />
  )
}
