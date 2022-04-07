/**
 * cn -
 *  . -- Input.Number 组件，可以通过鼠标和上下键辅助输入
 * en -
 *  . -- Input.Number component can be assisted by mouse and up and down keyboard.
 */
import React from 'react'
import { Input } from 'shineout'

const style = { width: 120, marginRight: 12 }

export default function() {
  return (
    <>
      <Input.Number style={style} width={120} min={23} max={100} digits={0} />
    </>
  )
}
