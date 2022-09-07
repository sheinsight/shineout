/**
 * cn - 禁用
 *    -- 禁用tag
 * en - disabled
 *    -- disabled the tag
 */
import React from 'react'
import { Tag } from 'shineout'

const App: React.FC = () => (
  <div>
    <Tag disabled>Tag 1</Tag>

    <Tag disabled type="info">
      Tag 2
    </Tag>

    <Tag disabled onClose>
      Tag 3
    </Tag>
  </div>
)

export default App
