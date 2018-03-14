/**
 * cn - 带输入
 * en - Base
 */
import React from 'react'
import { Checkbox } from 'shineout'

export default function () {
  return (
    <Checkbox inputable onChange={d => console.log(d)}>more...</Checkbox>
  )
}
