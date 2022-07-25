/**
 /**
 * cn - 内嵌标题
 *    -- 使用 innerTitle 展示内嵌标题
 * en - inner title
 *    -- use innerTitle to display the inner title
 */
import React from 'react'
import { Input } from 'shineout'

export default function() {
  return (
    <>
      <Input innerTitle="input something" clearable />
      <Input.Group style={{ marginTop: 12 }}>
        <Input innerTitle="please input your email" />
        <b>.com</b>
      </Input.Group>
    </>
  )
}
