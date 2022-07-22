/**
 * cn - 字段
 *    -- 支持 value 和 onChange 的组件可以放在 Form.Field 中。
 *    -- children 为 ReactElement时，必须支持 value 和 onChange 属性
 *    -- children 为 Function 时，返回一个或一组 ReactElement，在函数内部自行处理 value 和 onChange
 * en - Field
 *    -- Components that support value property and onChange property can be put in a Form.Field .
 *    -- When the children property is a ReactElement, the value and onChange property must be provided.
 *    -- When the children property is a function, return one or one group of ReactElement.
 */
import React from 'react'
import { Form, Rule } from 'shineout'

const rule = Rule()

// eslint-disable-next-line
function Input({ value = '', error, ...props }) {
  const style = { border: `solid 1px ${error ? 'red' : '#ccc'}`, outline: 'none' }
  return <input style={style} value={value} {...props} />
}

export default function() {
  return (
    <Form style={{ maxWidth: 500 }} onSubmit={d => console.log(d)}>
      <Form.Item required label="Email">
        <Form.Field defaultValue="test@email.com" title="Email" rules={[rule.required, rule.email]} name="email">
          {({ value, onChange, error }) => <Input value={value} error={error} onChange={onChange} type="text" />}
        </Form.Field>
      </Form.Item>

      <Form.Item required label="Password" tip="Use at least one letter, one numeral, and seven characters.">
        <Form.Field
          title="Password"
          rules={[rule.required, rule.min(7), rule.regExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)]}
          name="password"
        >
          <Input type="password" />
        </Form.Field>
      </Form.Item>

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  )
}
