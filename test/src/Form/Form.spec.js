import enzyme from 'enzyme'
import React from 'react'
import { Button, Form, Input } from 'shineout'

class F extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        a: '1',
        fuck: 'hello',
      },
      show: true,
      input: true,
    }
  }

  render() {
    const { show, value, input } = this.state

    return (
      <div>
        <Button onClick={() => this.setState({ show: false, value: { b: 'c' } })}>hidden</Button>
        <Button onClick={() => this.setState({ input: false })}>hidden</Button>
        {show && (
          <Form value={value} onChange={this.props.onChange}>
            {input && <Input name="fuck" />}
          </Form>
        )}
      </div>
    )
  }
}

/* global SO_PREFIX */

describe('Form[Base]', () => {
  jest.useFakeTimers()
  test('should change with value', () => {
    const fn = jest.fn()
    const wrapper = enzyme.mount(<F onChange={fn} />)
    wrapper
      .find('button')
      .at(1)
      .simulate('click')
    wrapper.update()
    jest.runAllTimers()
    expect(fn).toBeCalledWith({ a: '1' })
  })
})
