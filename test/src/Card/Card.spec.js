import { mount } from 'enzyme'
import React from 'react'
import { Card, Form, Input } from 'shineout'
import Render from 'react-test-renderer'
import CardBase from '../../../site/pages/components/Card/example-1-base'
import CardShallow from '../../../site/pages/components/Card/example-2-boxshadow'

/* global SO_PREFIX */
describe('Shineout[Base]', () => {
  test('should render correct', () => {
    const wrapper = Render.create(<CardBase />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Shineout[Shallow]', () => {
  test('should render correct', () => {
    const wrapper = Render.create(<CardShallow />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Shineout[Submit]', () => {
  test('should call form-onSubmit', done => {
    jest.useFakeTimers()
    const wrapper = mount(
      <Card style={{ width: 500 }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <br />
          <Form onSubmit={() => done()}>
            <Form.Item label="User name">
              <Input name="name" defaultValue="user" />
            </Form.Item>
          </Form>
        </Card.Body>

        <Card.Footer align="right">
          <Card.Submit>Submit</Card.Submit>
        </Card.Footer>
      </Card>
    )
    wrapper.find('button').simulate('click')
    jest.runAllTimers()
  })
})

describe('Card[collapsible]', () => {
  test('should collapse', () => {
    jest.useFakeTimers()
    const wrapper = mount(
      <Card collapsible>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <div style={{ height: 100 }} />
        </Card.Body>
      </Card>
    )
    document.body.innerHTML += wrapper.html()
    expect(wrapper.find(`.${SO_PREFIX}-hidable-show`)).toHaveLength(0)
    wrapper.find(`.${SO_PREFIX}-card-header`).simulate('click')
    jest.runAllTimers()
    expect(wrapper.find('Hidable').prop('show')).toBeTruthy()
  })
  test('should collapsed controlled', () => {
    jest.useFakeTimers()
    const wrapper = mount(
      <Card collapsed={false}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <div style={{ height: 100 }} />
        </Card.Body>
      </Card>
    )
    document.body.innerHTML += wrapper.html()
  })
})
