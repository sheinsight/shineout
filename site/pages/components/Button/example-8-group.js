/**
 * cn - 组合
 *    -- 一组 Button 可以用 Button.Group 容器中，按钮样式通过 Button.Gorup 的 size, type, outline 属性设置
 * en - Group
 */
import React from 'react'
import { Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function () {
  return (
    <div>
      <Button.Group>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button disabled>disabled</Button>
        <Button>Right</Button>
      </Button.Group>

      <br />

      <Button.Group type="primary">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </Button.Group>

      <br />

      <Button.Group outline type="primary">
        <Button><FontAwesome name="angle-left" />&nbsp; Left</Button>
        <Button>Center</Button>
        <Button>Right &nbsp;<FontAwesome name="angle-right" /></Button>
      </Button.Group>

      <br />

      <Button.Group type="warning" size="large">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </Button.Group>
    </div>
  )
}

