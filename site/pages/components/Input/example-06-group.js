/**
 * cn - 组合
 *  . -- Icon, span, string, Button 类型可以直接放入 Input.Group 中。需要背景色可以放在 b 标签中。
 * en - Group
 *  . -- The Icon, span, string and Button types can be placed directly into the Input.Group. Use b tag can change the background color.
 */
import React from 'react'
import { Button, Input } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const style = { width: 300, marginBottom: 12 }

export default function() {
  return (
    <div>
      <Input.Group style={style}>
        <FontAwesome name="user" />
        <Input placeholder="first name" />
        -
        <Input placeholder="last name" />
      </Input.Group>

      <Input.Group style={style}>
        <Input placeholder="search text" />
        <FontAwesome name="search" />
      </Input.Group>

      <Input.Group style={style}>
        <Input style={{ flex: 1 }} placeholder="flex 1" />
        <Input style={{ flex: 3 }} placeholder="flex 3" />
      </Input.Group>

      <Input.Group style={style}>
        <Input placeholder="search text" />
        <Button type="primary">Search</Button>
      </Input.Group>

      <Input.Group size="small" style={style}>
        <b>
          <FontAwesome name="envelope" />
        </b>
        <Input placeholder="email" />
        <b>.com</b>
      </Input.Group>
    </div>
  )
}
