/**
 * cn - 大小
 *    -- 有三种 size，['small', default, 'large']，默认为 default(不要填写)
 * en - Size
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  const props = { data, style: { width: 100, marginRight: 12 } }

  return (
    <div>
      <Select {...props} size="small" placeholder="small" />
      <Select {...props} placeholder="default" />
      <Select {...props} size="large" placeholder="large" />
    </div>
  )
}
