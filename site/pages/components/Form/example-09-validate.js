/**
 * cn -
 *    -- 通过 Rule 参数对校验规则进行扩展。
 * en -
 *    -- The validation rules can be extended by parameters.
 */
import React from 'react'
import { Form, Input, Rule } from 'shineout'

const rules = Rule(
  // validate function package
  {
    password: {
      func: (value, formData, cb, props) =>
        new Promise((resolve, reject) => {
          if (!/\d+/.test(value) || !/[a-z]+/i.test(value)) {
            reject(new Error(props.message.replace('{title}', props.title)))
          } else {
            resolve(true)
          }
        }),
    },
    isExist: (value, _, callback) => {
      if (value.indexOf('so') >= 0) callback(new Error(`"${value}" is existed.`))
      else callback(true)
    },
  },
  // language package
  {
    password: {
      message: '{title} at least has one numeral and one letter',
    },
  }
)

export default function() {
  return (
    <Form style={{ maxWidth: 500 }} scrollToError={30} onSubmit={d => console.log(d)}>
      <Form.Item required label="Name">
        <Input name="name" title="Name" rules={[rules.required, rules.isExist]} />
      </Form.Item>

      <Form.Item required label="Password" tip="At least one letter, one numeral, and 6 - 20 characters.">
        <Input
          name="password"
          title="Password"
          type="password"
          rules={[rules.required, rules.range(6, 20), rules.password]}
        />
      </Form.Item>

      <Form.Item label="">
        <Form.Button>Sumbit</Form.Button>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}
