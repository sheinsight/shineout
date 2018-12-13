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

const rules = Rule()

export default function () {
  return (
    <Form style={{ maxWidth: 500 }} scrollToError={30} onSubmit={d => console.log(d)}>
      <Form.Item required label="Email">
        <Input
          name="email"
          title="Email"
          rules={[rules.required(), rules.email()]}
        />
      </Form.Item>

      <Form.Item required label="Password" tip="Use at least one letter, one numeral, and seven characters.">
        <Input
          name="password"
          title="Password"
          type="password"
          rules={[rules.required()]}
        />
      </Form.Item>

      <Form.Item required label="Age" tip="between 18 and 60">
        <Input
          name="age"
          title="Age"
          style={{ width: 100 }}
          rules={[rules.required(), rules.integer()]}
        />
      </Form.Item>

      <Form.Item required label="Favorite Colors" tip="select your favorite colors">
        <Checkbox.Group
          name="colors"
          keygen={d => d}
          data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
          title="Favorite Colors"
          rules={[rules.required(), rules.length(null, 2)]}
        />
      </Form.Item>

      <Form.Item label="">
        <Form.Button>Sumbit</Form.Button>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}
