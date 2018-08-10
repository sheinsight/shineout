/**
 * cn - 数组 name
 *    -- 数据为数组类型的组件，name 可以传入一个相应的数组，来分别处理数组内的单个数据
 * en - Array name
 *    -- The name of component whose data is an array can be passed in a corresponding array to process individual data in the array.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { Form, DatePicker, Input, Modal } from 'shineout'

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
    const value = immer(this.props.value, (draft) => { draft[index] = val })
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

const rules = {
  firstName: [
    { required: true, message: 'Please enter your firstname.' },
  ],
  lastName: [
    { required: true, message: 'Please enter your lastname.' },
  ],
  date: {
    startDate: [
      { required: true, message: 'Please select start date.' },
    ],
    endDate: [
      { required: true, message: 'Please select end date.' },
    ],
  },
}

// eslint-disable-next-line
export default class extends PureComponent {
  initValue = {
    firstName: 'Harry',
    lastName: 'Potter',
    date: {
      startDate: Date.now(),
      endDate: Date.now() + (86400 * 5000),
    },
  }

  render() {
    return (
      <Form
        value={this.initValue}
        rules={rules}
        onSubmit={(data) => { Modal.info({ title: 'Form Data', content: JSON.stringify(data) }) }}
      >
        <Form.Item label="Name">
          <Form.Field name={['firstName', 'lastName']}>
            <NameInput />
          </Form.Field>
        </Form.Item>

        <Form.Item label="Date">
          <DatePicker range name={['date.startDate', 'date.endDate']} />
        </Form.Item>

        <Form.Item label="">
          <Form.Submit>Submit</Form.Submit>
        </Form.Item>
      </Form>
    )
  }
}
