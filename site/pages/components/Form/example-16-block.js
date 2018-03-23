/**
 * cn -
 *    -- 上例可以使用 Form.Block 改写
 * en -
 */
import React, { PureComponent } from 'react'
import { Button, Datum, Form, Input } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.datum = new Datum.Form()
    this.initValue = {
      name: 'Harry Potter',
      friends: [{ name: 'Hermione Granger', age: '16' }],
    }

    this.rules = {
      name: [{ required: true, message: 'Please input friend\'s name or remove this field.' }],
      friends: [{ min: 2, message: 'At least add 2 friends.' }],
    }
    this.handleAddFriend = this.handleAddFriend.bind(this)
  }

  handleAddFriend() {
    const friends = [...this.datum.get('friends'), {}]
    this.datum.set('friends', friends)
  }

  render() {
    return (
      <Form value={this.initValue} datum={this.datum} onSubmit={(data) => { console.log(data) }}>
        <Form.Item label="Name">
          <Input name="name" />
        </Form.Item>

        <Form.Item label="Friends">
          <Form.Loop rules={this.rules.friends} name="friends">
            {({ value, onChange, onRemove }) => (
              <Form.Block value={value} onChange={onChange}>
                <Form.Item style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <Input
                    style={{ width: 180, marginRight: 8, display: 'inline-block' }}
                    name="name"
                    rules={this.rules.name}
                    placeholder="Name"
                  />
                  <Input
                    style={{ width: 60, display: 'inline-block' }}
                    name="age"
                    type="number"
                    placeholder="Age"
                  />
                  <a href="javascript:;" style={{ padding: '0 12px' }} onClick={onRemove}>
                    <FontAwesome name="close" />
                  </a>
                </Form.Item>
              </Form.Block>
            )}
          </Form.Loop>
          <Button onClick={this.handleAddFriend}>Add new friend</Button>
        </Form.Item>

        <Form.Item label="">
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    )
  }
}
