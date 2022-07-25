/**
 * cn -
 *    -- 在 Input 或 Input.Group 上设置的 tip，会在组件 focus 时弹出显示。通过 popover 可以控制弹出位置。
 * en -
 *    -- Set the tip property on the Input or Input.Group will pop up when the component is focused. The position where it pop up can be controlled via popover property.
 */
import React from 'react'
import { Form, Input, Checkbox } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const App: React.FC = () => (
  <Form inline>
    <Input.Group tip="Email or nickname or phonenumber">
      <FontAwesome name="user" />
      <Input name="user" placeholder="Email or nickname" />
    </Input.Group>

    <Input
      popover="top"
      type="password"
      name="password"
      placeholder="Password"
      tip="Use at least one letter, one numeral, and seven characters."
    />

    <Checkbox name="remember">Remember</Checkbox>

    <Form.Submit>Submit</Form.Submit>
  </Form>
)

export default App
