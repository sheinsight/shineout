/**
 * cn - 基本用法
 *    -- 最基本的用法
 * en - Base
 *    -- The basic usage
 */
import React from 'react'
import { DatePicker } from 'shineout'

const defaultTime = ['02:33:33', '12:33:33']

export default function() {
  return (
    <div>
      <DatePicker type="datetime" defaultTime="12:12:12" />
    </div>
  )
}
