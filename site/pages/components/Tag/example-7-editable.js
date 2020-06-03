/**
 * cn - 可编辑
 *    -- editable 属性，标记 Tag 是否可编辑，如果是true，则 children 无效，使用 value 替换
 * en - editable
 *    -- editable attribute, mark whether the Tag is editable, if true, children are invalid, use value to replace
 */
import React, { useState } from 'react'
import { Tag } from 'shineout'

export default function() {
  const [value, setValue] = useState('editable')
  return (
    <div>
      <Tag
        editable
        value={value}
        onBlur={() => {
          console.log('tag input onBlur')
        }}
        onChange={v => {
          setValue(v)
        }}
        onClose={() => {
          console.log('close')
        }}
      >
        Tag 1
      </Tag>
    </div>
  )
}
