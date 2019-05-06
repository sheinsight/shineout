import { mount } from 'enzyme'
import React from 'react'
import { Card, Form, Input } from 'shineout'
import Render from 'react-test-renderer'
import CardBase from '../../../site/pages/components/Card/example-1-base'
import CardShallow from '../../../site/pages/components/Card/example-2-boxshadow'

/* global SO_PREFIX */
describe('Card[Base]', () => {
  test('should render correct', () => {
    const wrapper = Render.create(<CardBase />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Card[Shallow]', () => {
  test('should render correct', () => {
    const wrapper = Render.create(<CardShallow />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Card[Submit]', () => {
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
    class CardCollapsed extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          collapsed: false,
        }
      }

      render() {
        return (
          <Card collapsible collapsed={this.state.collapsed}>
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <div style={{ height: 100 }} />
            </Card.Body>
          </Card>
        )
      }
    }

    jest.useFakeTimers()
    const wrapper = mount(<CardCollapsed />)

    document.body.innerHTML += wrapper.html()
    expect(wrapper.find(`div.${SO_PREFIX}-hidable-collapse`).hasClass(`${SO_PREFIX}-hidable-show`)).toBeTruthy()

    wrapper.setState({
      collapsed: true,
    })
    jest.runAllTimers()
    expect(wrapper.html().indexOf(`${SO_PREFIX}-hidable-collapse`) > -1).toBeTruthy()
  })
})

describe('Card[Accordion]', () => {
  test('should always expand single', () => {
    const wrapper = mount(
      <Card.Accordion active={0}>
        <Card>
          <Card.Header>Header 1</Card.Header>
          <Card.Body>Body</Card.Body>
        </Card>
        <Card>
          <Card.Header>Header 2</Card.Header>
          <Card.Body>Body</Card.Body>
        </Card>
        <Card>
          <Card.Header>Header 3</Card.Header>
          <Card.Body>Body</Card.Body>
        </Card>
      </Card.Accordion>
    )
    expect(
      wrapper
        .find('ShineoutCard')
        .at(0)
        .prop('collapsed')
    ).toBeFalsy()
    expect(
      wrapper
        .find('ShineoutCard')
        .at(1)
        .prop('collapsed')
    ).toBeTruthy()
    expect(
      wrapper
        .find('ShineoutCard')
        .at(2)
        .prop('collapsed')
    ).toBeTruthy()
  })
})
