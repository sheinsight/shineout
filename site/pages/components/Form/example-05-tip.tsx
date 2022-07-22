/**
 * cn - 提示信息
 *    -- 在 Form.Item 上设置提示文案时，提示文案始终显示在组件下方。
 * en - Tips
 *    -- Set the tip property on Form.Item, the prompt text is displayed below the component.
 */
import React from 'react'
import { Form, Input, Checkbox } from 'shineout'

const App: React.FC = () => (
  <Form style={{ maxWidth: 500 }}>
    <Form.Item label="Email" tip="Email or nickname or phonenumber">
      <Input name="email" />
    </Form.Item>

    <Form.Item label="Password" tip="Use at least one letter, one numeral, and seven characters.">
      <Input name="password" type="password" />
    </Form.Item>

    <Form.Item label="Favorite Color" tip="select your favorite colors">
      <Checkbox.Group
        keygen={d => d}
        name="favoriteColor"
        data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
      />
    </Form.Item>
  </Form>
)

export default App
