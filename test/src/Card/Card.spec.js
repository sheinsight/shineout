import { mount } from 'enzyme'
import React from 'react'
import { Card, Form, Input } from 'shineout'
import Render from 'react-test-renderer'
import { baseTest, childrenTest } from '../../utils'
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

describe('Card[style]', () => {
  test('should custom style and className', () => {
    baseTest(Card, `.${SO_PREFIX}-card`)
  })
})

describe('Card[defaultCollapsed]', () => {
  test('should set defaultCollapsed', () => {
    const wrapper = mount(
      <Card defaultCollapsed={false} collapsible>
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    )
    expect(wrapper.find(`.${SO_PREFIX}-card`).hasClass(`${SO_PREFIX}-card-collapsible`)).toBeTruthy()
    expect(wrapper.find(`.${SO_PREFIX}-card`).hasClass(`${SO_PREFIX}-card-collapsed`)).toBeFalsy()
  })
})

describe('Card[id] CardAccordion[defaultActive]', () => {
  test('should set defaultActive', () => {
    const wrapper = mount(
      <Card.Accordion defaultActive="card_2">
        <Card id="card_1">
          <Card.Header>Header 1</Card.Header>
          <Card.Body>Body</Card.Body>
        </Card>
        <Card id="card_2">
          <Card.Header>Header 2</Card.Header>
          <Card.Body>Body</Card.Body>
        </Card>
        <Card id="card_3">
          <Card.Header>Header 3</Card.Header>
          <Card.Body>Body</Card.Body>
        </Card>
      </Card.Accordion>
    )

    expect(
      wrapper
        .find(`.${SO_PREFIX}-card`)
        .not(`.${SO_PREFIX}-card-collapsed`)
        .find(`.${SO_PREFIX}-card-header`)
        .text()
    ).toBe('Header 2')
  })
})

describe('Card[onCollapse]', () => {
  test('should onCollapse', () => {
    const onCollapse = jest.fn()
    const wrapper = mount(
      <Card collapsible onCollapse={onCollapse}>
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    )
    wrapper.find(`.${SO_PREFIX}-card-header`).simulate('click')
    expect(onCollapse).toHaveBeenCalled()
  })
})

describe('CardAccordion[onChange]', () => {
  test('should onChange', () => {
    const onChange = jest.fn()
    const wrapper = mount(
      <Card.Accordion active={0} onChange={onChange}>
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
    wrapper
      .find(`.${SO_PREFIX}-card-header`)
      .at(1)
      .simulate('click')
    expect(onChange).toHaveBeenCalled()
  })
})

describe('CardHeader CardBody CardFooter[baseTest]', () => {
  test('should custom style and className', () => {
    baseTest(Card.Header, `.${SO_PREFIX}-card-header`)
    baseTest(Card.Body, `.${SO_PREFIX}-card-body`)
    baseTest(Card.Footer, `.${SO_PREFIX}-card-footer`)
  })
})
describe('Card[children]', () => {
  childrenTest(Card.Header, `.${SO_PREFIX}-card-header`)
  childrenTest(Card.Body, `.${SO_PREFIX}-card-body`)
  childrenTest(Card.Footer, `.${SO_PREFIX}-card-footer`)
})
