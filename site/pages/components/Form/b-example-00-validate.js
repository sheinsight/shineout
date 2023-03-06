/**
 * cn -
 *    -- 某些复杂的数据，如多层嵌套的数据，可以在单个元素上设置 rules
 *    -- 设置 scrollToError 属性，在 form 提交校验失败时自动滚动到第一个错误的组件
 * en -
 *    -- For some complex data, such as multi-level nested data, rules can be set on the single element.
 *    -- Scrolling to the first invalid element when validation fails is available through ScrollToError property.
 */
import React from 'react'
import { Form, Input, Checkbox } from 'shineout'

const rules = {
  email: [
    { required: true, message: 'Please enter your email.' },
    { type: 'email', message: 'Please enter a valid email.' },
  ],
  password: [
    { required: true, message: 'Please enter password.' },
    { min: 7, message: 'Password must be at least {min} characters.' },
    { regExp: /[a-z]+/i, message: 'Password at least has one letter.' },
    value =>
      new Promise((resolve, reject) => {
        if (/\d+/.test(value)) resolve()
        else reject(new Error('Password at least has one numeral.'))
      }),
  ],
  age: [
    { required: true, message: 'Please enter age.' },
    { min: 18, max: 60, message: 'Age must between {min} and {max}.' },
  ],
  colors: [{ min: 2, message: 'At least select 2 colors.' }],
}

export default function() {
  return (
    <Form style={{ maxWidth: 500 }} scrollToError={30} onSubmit={d => console.log(d)}>
      <Form.Item required label="Email">
        <Input name="email" rules={rules.email} />
      </Form.Item>

      <Form.Item required label="Password" tip="Use at least one letter, one numeral, and seven characters.">
        <Input name="password" type="password" rules={rules.password} />
      </Form.Item>

      <Form.Item required label="Age" tip="between 18 and 60">
        <Input name="age" rules={rules.age} digits={0} style={{ width: 100 }} type="number" />
      </Form.Item>

      <Form.Item required label="Favorite Colors" tip="select your favorite colors">
        <Checkbox.Group
          name="colors"
          keygen={d => d}
          rules={rules.colors}
          data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
        />
      </Form.Item>

      <Form.Item label="">
        <Form.Button>Sumbit</Form.Button>
      </Form.Item>
    </Form>
  )
}
