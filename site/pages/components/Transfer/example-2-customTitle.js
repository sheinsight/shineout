/**
 * cn - 自定义
 *    -- 可以自定义标题, 按钮, 底部等属性
 * en - Customize
 *    -- Customizable title, button, bottom properties
 */
import React from 'react'
import { Transfer, Button } from 'shineout'

const data = []

for (let i = 1; i < 20; i++) {
  data.push({
    id: i,
    content: `content ${i}`,
  })
}

export default function() {
  return (
    <Transfer
      titles={['I am left', 'I am right']}
      footers={[<Button style={{ margin: 4 }}>left</Button>, <Button style={{ margin: 4 }}>right</Button>]}
      data={data}
      format="id"
      renderItem="content"
      keygen="id"
      operations={['to right', 'to left']}
      operationIcon={false}
    />
  )
}
