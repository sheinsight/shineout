/**
 * cn - 遍历
 *    -- Form.Loop 通过 name 属性从 Form 中获取一个类型为 array 的 value，遍历这个 value 生成一组子组件。
 * en - Loop
 *    -- Form.Loop takes a value whose type is the array from the form via the name property, and iterates over this value to generate a set of subcomponents.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Datum, Form, Input } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

class Friend extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    value: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleAgeChange = this.handleAgeChange.bind(this)

    this.rules = [
      { required: true, message: 'Please input friend\'s name or remove this field.' },
    ]
  }

  handleNameChange(name) {
    const { value } = this.props
    this.props.onChange(Object.assign({}, value, { name }))
  }

  handleAgeChange(age) {
    const { value } = this.props
    this.props.onChange(Object.assign({}, value, { age }))
  }

  render() {
    const { value, onRemove } = this.props
    return (
      <Form.Item style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <Input
          style={{ width: 180, marginRight: 8 }}
          onChange={this.handleNameChange}
          value={value.name}
          rules={this.rules}
          placeholder="Name"
        />
        <Input
          style={{ width: 60 }}
          onChange={this.handleAgeChange}
          type="number"
          value={value.age}
          placeholder="Age"
        />
        <a href="javascript:;" style={{ padding: '0 12px' }} onClick={onRemove}>
          <FontAwesome name="close" />
        </a>
      </Form.Item>
    )
  }
}

// eslint-disable-next-line
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.datum = new Datum.Form()
    this.initValue = {
      name: 'Harry Potter',
      friends: [{ name: 'Hermione Granger', age: '16' }],
    }

    this.rules = [{ min: 2, message: 'At least add 2 friends.' }]
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
          <Form.Loop rules={this.rules} name="friends">
            {({ value, onChange, onRemove }) => (
              <Friend value={value} onChange={onChange} onRemove={onRemove} />
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
