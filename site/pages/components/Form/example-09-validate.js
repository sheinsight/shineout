/**
 * cn -
 *    -- 某些复杂的数据，如多层嵌套的数据，可以在单个元素上设置 rules
 *    -- 设置 scrollToError 属性，在 form 提交校验失败时自动滚动到第一个错误的组件
 * en -
 *    -- Some complex data, such as multi-level nested data, can set rules on a single element.
 *    -- Set the scrollToError property, scroll to the first invalid element when the form submission validation fails.
 */
import React from 'react'
import { Form, Input, Checkbox, Rule } from 'shineout'

const rules = Rule(
  // validate function package
  {
    password: {
      func: (value, formData, cb, props) => new Promise((resolve, reject) => {
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
  },
)

export default function () {
  return (
    <Form style={{ maxWidth: 500 }} rule={rules} scrollToError={30} onSubmit={d => console.log(d)}>
      <Form.Item required label="Email">
        <Input
          name="email"
          title="Email"
          rules={[rules.required, rules.email]}
        />
      </Form.Item>

      <Form.Item required label="Name">
        <Input
          name="name"
          title="Name"
          rules={[rules.required, rules.isExist]}
        />
      </Form.Item>

      <Form.Item required label="Password" tip="At least one letter, one numeral, and 6 - 20 characters.">
        <Input
          name="password"
          title="Password"
          type="password"
          rules={[rules.required, rules.length(6, 20), rules.password]}
        />
      </Form.Item>

      <Form.Item required label="Age" tip="between 18 and 60">
        <Input
          name="age"
          title="Age"
          style={{ width: 100 }}
          type="integer"
          rules={[rules.required, rules.integer, rules.length(18, 60)]}
        />
      </Form.Item>

      <Form.Item required label="Tel">
        <Input
          name="tel"
          title="Tel"
          rules={[rules.required, rules.regExp('/^[\\d\\s ().-]+$/')]}
        />
      </Form.Item>

      <Form.Item required label="IPv4">
        <Input
          name="IPv4"
          title="IP"
          // rules={[rules.required, rules.ipv4]}
          rule="required(); ipv4;"
        />
      </Form.Item>

      <Form.Item required label="Favorite Colors" tip="select your favorite colors">
        <Checkbox.Group
          name="colors"
          keygen={d => d}
          data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
          defaultValue={[]}
          title="Favorite Colors"
          rules={[rules.required, rules.min(2), rules.max(3)]}
        />
      </Form.Item>

      <Form.Item label="">
        <Form.Button>Sumbit</Form.Button>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}
