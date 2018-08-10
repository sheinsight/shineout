/**
 * cn -
 *  . -- Input.Number 组件，可以通过鼠标和上下箭头辅助输入
 * en - number type
 *  . -- Input.Number component can be assisted by mouse and up and down arrows.
 */
import React from 'react'
import { Input } from 'shineout'

export default function () {
  return (
    <Input.Number width={120} min={23} max={100} type="number" />
  )
}
