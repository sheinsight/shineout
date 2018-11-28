/**
 * cn -
 *    -- 上例可以使用 Form.Block 改写
 * en -
 *    -- The above example can be overwritten with Form.Block.
 */
import React, { PureComponent } from 'react'
import { Form, Input, Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.rules = {
      name: [{ required: true, message: 'Please input friend\'s name or remove this field.' }],
      friends: [{ min: 2, message: 'At least add 2 friends.' }],
    }
  }

  renderEmpty = onAppend => <Button onClick={() => onAppend({})}>Add new friend</Button>

  render() {
    return (
      <Form onSubmit={(data) => { console.log(data) }}>
        <Form.Item label="Name">
          <Input name="name" defaultValue="Harry Potter" />
        </Form.Item>

        <Form.Item label="Friends">
          <Form.Loop
            rules={this.rules.friends}
            name="friends"
            empty={this.renderEmpty}
            defaultValue={[{ name: 'Hermione Granger', age: '16' }, {}]}
          >
            {
              ({
                value, onChange, onAppend, onRemove,
              }) => (
                <Form.Block value={value} onChange={onChange}>
                  <Form.Item style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                    <Input
                      style={{ width: 180, marginRight: 8 }}
                      name="name"
                      rules={this.rules.name}
                      placeholder="Name"
                    />
                    <Input
                      style={{ width: 60 }}
                      name="age"
                      type="number"
                      placeholder="Age"
                    />
                    <a
                      href="javascript:;"
                      style={{ padding: '0 12px' }}
                      onClick={() => onAppend({ age: 16 })}
                    >
                      <FontAwesome name="plus" />
                    </a>
                    {
                      <a href="javascript:;" onClick={onRemove}>
                        <FontAwesome name="close" />
                      </a>
                    }
                  </Form.Item>
                </Form.Block>
              )
            }
          </Form.Loop>
        </Form.Item>

        <Form.Item label="">
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    )
  }
}
