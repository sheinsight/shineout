/**
 * cn - 组合
 *    -- 一组 Button 可以用 Button.Group 容器中，按钮样式通过 Button.Gorup 的 size, type, outline 属性设置
 * en - Group
 *    -- A series of buttons can group by Button.Group, set styles by Button.Group's size, type, and outline property.
 */
import React from 'react'
import { Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function() {
  return (
    <div>
      <Button.Group>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </Button.Group>

      <br />

      <Button.Group outline type="primary">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </Button.Group>

      <br />
      <Button.Group outline type="primary">
        <Button disabled>disabled</Button>
        <Button disabled>Center</Button>
        <Button>Right</Button>
      </Button.Group>

      <br />

      <Button.Group type="primary">
        <Button>
          <FontAwesome name="angle-left" style={{ marginInlineEnd: 4 }} />
          Left
        </Button>
        <Button>Center</Button>
        <Button>
          Right
          <FontAwesome name="angle-right" style={{ marginInlineStart: 4 }} />
        </Button>
      </Button.Group>

      <br />

      <Button.Group size="large">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </Button.Group>
    </div>
  )
}
