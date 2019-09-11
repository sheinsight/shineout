/**
 * cn - FieldSet (Loop)
 *    -- FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件。
 * en - FieldSet (Loop)
 *    -- When FieldSet's children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents.
 */
import React, { PureComponent } from 'react'
import { Form, Input, Rule } from 'shineout'
import Icon from '../Icon/FontAwesome'

const iconStyle = { fontSize: 18, marginLeft: 12 }

const modeIsExist = (value, formData, callback) => {
  const modes = new Map()
  value.forEach((v, i) => {
    if (modes.has(v.mode)) modes.set(v.mode, [...modes.get(v.mode), i])
    else modes.set(v.mode, [i])
  })
  const result = []
  modes.forEach((v, k) => {
    if (k && v.length > 1) {
      v.forEach(i => {
        result[i] = { mode: new Error(`Mode "${k}" 已存在。`) }
      })
    }
  })
  callback(result.length > 0 ? result : true)
}

const rule = Rule()

// eslint-disable-next-line
const domain = ({ value, onAppend, onRemove, index }) => (
  <Form.Item>
    <Input.Group style={{ display: 'inline-flex', width: 500 }}>
      {index === 0 ? (
        <b style={{ width: 120 }}>{value.mode}</b>
      ) : (
        <Input rules={[rule.required]} style={{ width: 120, flex: 'none' }} name="mode" placeholder="mode" />
      )}
      <Input title="Domain" rules={[rule.required, rule.url]} name="domain" placeholder="domain" />
    </Input.Group>

    <a onClick={() => onAppend({})} style={iconStyle}>
      <Icon name="plus" />
    </a>

    {index > 0 && (
      <a onClick={onRemove} style={iconStyle}>
        <Icon name="remove" />
      </a>
    )}
  </Form.Item>
)

const group = () => (
  <div>
    <Input name="name" />
    <Form.FieldSet name="domains" rules={[modeIsExist]}>
      {domain}
    </Form.FieldSet>
  </div>
)

export default class extends PureComponent {
  // eslint-disable-next-line
  get defaultData() {
    return {
      envs: [
        {
          name: 'base',
          domains: [{ mode: 'production' }, { mode: 'development' }, { mode: 'test' }],
        },
      ],
    }
  }

  render() {
    return (
      <Form
        value={this.defaultData}
        onSubmit={data => {
          console.log(data)
        }}
      >
        <Form.Item label="Name">
          <Input name="name" defaultValue="Harry Potter" />
        </Form.Item>

        <Form.Item label="Friends">
          <Form.FieldSet name="envs">{group}</Form.FieldSet>
        </Form.Item>

        <Form.Item label="">
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    )
  }
}
