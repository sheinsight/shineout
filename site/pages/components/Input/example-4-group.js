/**
 * cn - 组合 Input.Group \n Icon, span, string, Button 类型可以直接放入 Input.Group 中。Icon 和 string 可以放入 Input.Addon 中添加背景色隔离。
 * en - Group
 */
import React from 'react'
import { Button, Input } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function () {
  return (
    <div style={{ width: 300 }}>
      <Input.Group>
        <FontAwesome name="user" />
        <Input placeholder="first name" />
        -
        <Input placeholder="last name" />
      </Input.Group>
      <br />
      <Input.Group>
        <Input style={{ flex: 1 }} placeholder="flex 1" />
        <Input style={{ flex: 3 }} placeholder="flex 3" />
      </Input.Group>
      <br />
      <Input.Group>
        <Input placeholder="search text" />
        <Button type="primary">Search</Button>
      </Input.Group>
      <br />
      <Input.Group>
        <Input.Addon><FontAwesome name="envelope" /></Input.Addon>
        <Input placeholder="email" />
        <Input.Addon>.com</Input.Addon>
      </Input.Group>
    </div>
  )
}
