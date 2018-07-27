/**
 * cn -
 *    -- 在 Input 或 Input.Group 上设置的 tip，会在组件 focus 时弹出显示。通过 popover 可以控制弹出位置。
 * en
 */
import React from 'react'
import { Form, Input, Checkbox } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function () {
  return (
    <Form inline>
      <Input.Group tip="Email or nickname or phonenumber">
        <FontAwesome name="user" />
        <Input name="user" />
      </Input.Group>

      <Input
        name="password"
        tip="Use at least one letter, one numeral, and seven characters."
        popover="top"
        placeholder="Password"
        type="password"
      />

      <Checkbox name="remember">Remember</Checkbox>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  )
}
