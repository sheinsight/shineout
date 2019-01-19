/**
 * cn - 类型
 *    -- 内置了 4 种类型（样式），[default,success, info, warning, danger]，默认为 default
 * en - type
 *    -- There are four built-in types (styles), [default,success, info, warning, danger], the default value is default.
 */
import React from 'react'
import { Tag } from 'shineout'

export default function() {
  return (
    <div>
      <Tag>Default</Tag>
      <Tag type="success">Success</Tag>
      <Tag type="info">Info</Tag>
      <Tag type="warning">Warning</Tag>
      <Tag type="danger">Danger</Tag>
    </div>
  )
}
