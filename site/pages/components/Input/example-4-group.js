/**
 * cn - 组合 Input.Group \n Icon, span, string, Button 类型可以直接放入 Input.Group 中。需要背景色可以放在 b 标签中。
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
        <Input placeholder="search text" />
        <FontAwesome name="search" />
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
        <b><FontAwesome name="envelope" /></b>
        <Input placeholder="email" />
        <b>.com</b>
      </Input.Group>
    </div>
  )
}
