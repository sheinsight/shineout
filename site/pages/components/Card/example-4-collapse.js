/**
 * cn - 折叠
 *    -- 设置 collapsible 可以折叠 Card，通过 collapsed 或 defaultCollapsed 属性控制状态
 * en - Collapse
 *    -- Set collapsible can collapse the Card panel.
 */
import React from 'react'
import { Card, DatePicker } from 'shineout'

export default function() {
  return (
    <Card collapsible>
      <Card.Header>Header</Card.Header>

      <Card.Body>
        <div style={{ height: 100 }}>
          <DatePicker />
        </div>
      </Card.Body>
    </Card>
  )
}
