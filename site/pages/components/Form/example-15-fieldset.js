/**
 * cn - FieldSet (Loop)
 *    -- FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件。
 * en - FieldSet (Loop)
 *    -- When FieldSet's children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents.
 */
import React, { PureComponent } from 'react'
import { Form, Input, Button, Rule } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const rules = Rule({
  isExist: (values, _, callback) => {
    const result = []
    const valueMap = {}
    values.forEach(({ name }, i) => {
      if (!name) return
      if (valueMap[name]) result[i] = { name: new Error(`Name "${name}" is existed.`) }
      else valueMap[name] = true
    })
    callback(result.length > 0 ? result : true)
  },
})

export default class extends PureComponent {
  renderEmpty = onAppend => <Button onClick={() => onAppend({})}>Add new friend</Button>

  render() {
    return (
      <Form
        onSubmit={data => {
          console.log(data)
        }}
      >
        <Form.Item label="Name">
          <Input name="name" defaultValue="Harry Potter" />
        </Form.Item>

        <Form.Item label="Friends">
          <Form.FieldSet
            rules={[rules.min(2), rules.isExist]}
            name="friends"
            title="Friends"
            empty={this.renderEmpty}
            defaultValue={[{ name: 'Hermione Granger', age: 16 }, {}]}
          >
            {({ onAppend, onRemove }) => (
              <Form.Item style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <Input
                  style={{ width: 180, marginRight: 8 }}
                  name="name"
                  title="Friend name"
                  rules={[rules.required]}
                  placeholder="Name"
                />
                <Input
                  style={{ width: 60 }}
                  name="age"
                  type="number"
                  title="Friend age"
                  rules={[rules.min(18)]}
                  placeholder="Age"
                />
                <a style={{ margin: '0 12px' }} onClick={() => onAppend({ age: 16 })}>
                  <FontAwesome name="plus" />
                </a>
                <a onClick={onRemove}>
                  <FontAwesome name="close" />
                </a>
              </Form.Item>
            )}
          </Form.FieldSet>
        </Form.Item>

        <Form.Item label="">
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    )
  }
}
