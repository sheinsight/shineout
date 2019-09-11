/**
 * cn -
 *    -- FieldSet 内部如果只有一个Field而非对象，设置Field 的 name 为 "" 值
 * en -
 *    -- If FieldSet's children is a single Field, set Field name to "" .
 */
import React, { PureComponent } from 'react'
import { Form, Input, Button, Rule } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const rules = Rule({
  isExist: (values, _, callback) => {
    const result = []
    values.forEach((val, i) => {
      if (values.some((v, j) => val && i !== j && val === v)) {
        result[i] = new Error(`Name "${val}" is existed.`)
      }
    })

    callback(result.length > 0 ? result : true)
  },
})

export default class extends PureComponent {
  renderEmpty = onAppend => <Button onClick={() => onAppend('')}>Add new friend</Button>

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
            defaultValue={['Hermione Granger', '']}
          >
            {({ onAppend, onRemove }) => (
              <Form.Item style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <Input
                  style={{ width: 180, marginRight: 8 }}
                  title="Friend name"
                  name=""
                  rules={[rules.required]}
                  placeholder="Name"
                />
                <a style={{ margin: '0 12px' }} onClick={() => onAppend('')}>
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
