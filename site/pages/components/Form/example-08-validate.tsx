/**
 * cn -
 *    -- 通过 Rule 参数对校验规则进行扩展。
 * en -
 *    -- The validation rules can be extended by parameters.
 */
import React from 'react'
import { Form, Input, Rule, Checkbox, TYPE } from 'shineout'

type RuleFunc = TYPE.Rule.ValidFunc

const isExist: RuleFunc = (value, _, callback) => {
  if (value.indexOf('so') >= 0) callback(new Error(`"${value}" is existed.`))
  else callback(true)
}

const password = {
  func: (value: string, _formData: any, _cb: any, props: { message: string; title: string }) =>
    new Promise((resolve, reject) => {
      if (!/\d+/.test(value) || !/[a-z]+/i.test(value)) {
        reject(new Error(props.message.replace('{title}', props.title)))
      } else {
        resolve(true)
      }
    }),
}

const rules = Rule(
  // validate function package
  {
    password,
    isExist,
  },
  // language package
  {
    password: {
      message: '{title} at least has one numeral and one letter',
    },
  }
)

const App: React.FC = () => (
  <Form style={{ maxWidth: 500 }} scrollToError={30} onSubmit={d => console.log(d)}>
    <Form.Item required label="Name">
      <Input name="name" title="Name" rules={[rules.required, rules.isExist]} />
    </Form.Item>

    <Form.Item required label="Password" tip="At least one letter, one numeral, and 6 - 20 characters.">
      <Input
        name="password"
        type="password"
        title="Password"
        rules={[rules.required, rules.range(6, 20), rules.password]}
      />
    </Form.Item>
    <Form.Item required label="Favorite Colors" tip="select your favorite colors">
      <Checkbox.Group
        name="colors"
        keygen={d => d}
        defaultValue={[]}
        data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
        rules={[rules.required('At least select one favorite color'), rules.min(2), rules.max(3)]}
      />
    </Form.Item>

    <Form.Item label="">
      <Form.Button>Sumbit</Form.Button>
      <Form.Reset>Reset</Form.Reset>
    </Form.Item>
  </Form>
)

export default App
