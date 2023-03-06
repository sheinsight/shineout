/**
 * cn -
 *    -- 某些复杂的数据，如多层嵌套的数据，可以在单个元素上设置 rules
 *    -- 设置 scrollToError 属性，在 form 提交校验失败时自动滚动到第一个错误的组件
 * en -
 *    -- For some complex data, such as multi-level nested data, rules can be set on the single element.
 *    -- Scrolling to the first invalid element when validation fails is available through ScrollToError property.
 */
import React from 'react'
import { Form, Input, Checkbox, Rule } from 'shineout'

const rule = Rule(
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
    <Form style={{ maxWidth: 500 }} rule={rule} scrollToError={30} onSubmit={d => console.log(d)}>
      <Form.Item required label="Email">
        <Input name="email" title="Email" rules="required;email;" />
      </Form.Item>

      <Form.Item required label="Name">
        <Input name="name" title="Name" rules="required;isExist;" />
      </Form.Item>

      <Form.Item required label="Password" tip="At least one letter, one numeral, and 6 - 20 characters.">
        <Input name="password" title="Password" type="password" rules="required;length(6,20);password;" />
      </Form.Item>

      <Form.Item required label="Age" tip="between 18 and 60">
        <Input name="age" title="Age" style={{ width: 100 }} type="integer" rules="required;integer;length(18,60);" />
      </Form.Item>

      <Form.Item required label="Tel">
        <Input
          name="tel"
          title="Tel"
          rules={"required;regExp('^[\\d\\s ().-]+$');"}
          // rules="required;regExp('^[\d\s ().-]+$');"
        />
      </Form.Item>

      <Form.Item required label="IPv4">
        <Input name="IPv4" title="IP" rules="required;ipv4" />
      </Form.Item>

      <Form.Item required label="Favorite Colors" tip="select your favorite colors">
        <Checkbox.Group
          name="colors"
          keygen={d => d}
          data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
          defaultValue={[]}
          title="Favorite Colors"
          rules="required;min(2);max(3);"
        />
      </Form.Item>

      <Form.Item label="">
        <Form.Button>Sumbit</Form.Button>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}
