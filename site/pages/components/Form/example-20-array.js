/**
 * cn - 数组 name
 *    -- 数据为数组类型的组件，name 可以传入一个相应的数组，来分别处理数组内的单个数据
 * en - Array name
 *    -- While the component's data type is array, name can accept an array to process item individually.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { Form, DatePicker, Input, Modal, Rule } from 'shineout'

// eslint-disable-next-line
class NameInput extends PureComponent {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: [],
  }

  constructor(props) {
    super(props)
    this.handleFirstName = this.handleChange.bind(this, 0)
    this.handleLastName = this.handleChange.bind(this, 1)
  }

  handleChange(index, val) {
    const value = immer(this.props.value, draft => {
      draft[index] = val
    })
    this.props.onChange(value)
  }

  render() {
    const { value } = this.props
    return (
      <div>
        <Input value={value[0]} width={120} onChange={this.handleFirstName} />
        -
        <Input value={value[1]} width={120} onChange={this.handleLastName} />
      </div>
    )
  }
}

const rule = Rule()

// eslint-disable-next-line
export default class extends PureComponent {
  initValue = {
    firstName: 'Harry',
    lastName: 'Potter',
    date: {
      startDate: Date.now(),
      endDate: Date.now() + 86400 * 5000,
    },
  }

  render() {
    return (
      <Form
        value={this.initValue}
        onSubmit={data => {
          Modal.info({ title: 'Form Data', content: <pre>{JSON.stringify(data, null, 2)}</pre> })
        }}
      >
        <Form.Item label="Name">
          <Form.Field name={['firstName', 'lastName']}>
            <NameInput />
          </Form.Field>
        </Form.Item>

        <Form.Item label="Date">
          <DatePicker range rules={[rule.required]} name={['date.startDate', 'date.endDate']} />
        </Form.Item>

        <Form.Item label="">
          <Form.Submit>Submit</Form.Submit>
        </Form.Item>
      </Form>
    )
  }
}
