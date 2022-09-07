/**
 * cn -
 *    -- 使用 bind 属性进行联动校验
 * en -
 *    -- use bind to Linkage verification
 */
import React from 'react'
import { Form, Input, Rule, TYPE } from 'shineout'

type RuleFunc = TYPE.Rule.validFunc

const password: RuleFunc = (value, form, callback) => {
  if (form.repeat && value !== form.repeat) callback(new Error('twice password must equal'))
  callback(true)
}
const repeat: RuleFunc = (value, form, callback) => {
  if (value && form.password !== value) callback(new Error('twice password must equal'))
  callback(true)
}
const rules = Rule({
  password,
  repeat,
})

const App: React.FC = () => (
  <Form>
    <Form.Item required label="Password">
      <Input bind={['repeat']} name="password" title="Password" rules={[rules.required, rules.password]} />
    </Form.Item>

    <Form.Item required label="Repeat Password">
      <Input bind={['password']} name="repeat" title="Repeat" rules={[rules.required, rules.repeat]} />
    </Form.Item>

    <Form.Item label="">
      <Form.Button>Sumbit</Form.Button>
      <Form.Reset>Reset</Form.Reset>
    </Form.Item>
  </Form>
)

export default App
