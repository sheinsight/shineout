/**
 * cn -
 *    -- 使用 keepErrorHeight 使得单行错误提示不会撑开页面高度
 * en -
 *    -- Use keepErrorHeight so that a single-line error prompt will not stretch the page height
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
  <Form keepErrorHeight>
    <Form.Item required label="Name">
      <Input bind={['repeat']} name="password" title="Password" rules={[rules.required, rules.password]} />
    </Form.Item>

    <Form.Item required label="Password">
      <Input bind={['password']} name="repeat" title="Repeat" rules={[rules.required, rules.repeat]} />
    </Form.Item>

    <Form.Item label="">
      <Form.Button>Sumbit</Form.Button>
      <Form.Reset>Reset</Form.Reset>
    </Form.Item>
  </Form>
)

export default App
