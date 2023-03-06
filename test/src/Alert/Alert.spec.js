import React from 'react'
import { Alert } from 'shineout'
import { mount } from 'enzyme'

/* global SO_PREFIX */
describe('Alert[children, className, style]', () => {
  const wrapper = mount(
    <Alert className="cc" style={{ color: 'red' }}>
      hello world
    </Alert>
  )

  test('className and style', () => {
    expect(wrapper.find(`.${SO_PREFIX}-alert`).hasClass('cc')).toBeTruthy()
  })
  test('className and style', () => {
    expect(wrapper.find(`.${SO_PREFIX}-alert`).getDOMNode().style.color).toBe('red')
  })
  test('children', () => {
    expect(wrapper.find(`.${SO_PREFIX}-alert-content`).text()).toBe('hello world')
  })
})

describe('Alert[onClose]', () => {
  const onClose = jest.fn()
  const wrapper = mount(<Alert onClose={onClose}>hello world</Alert>)
  it('onClose', async () => {
    const closeIcon = wrapper.find(`.${SO_PREFIX}-alert-close`)
    expect(closeIcon.length).toBe(1)
    closeIcon.simulate('click')
    await new Promise(r => setTimeout(r, 200))
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-alert`).length).toBe(0)
    expect(onClose.mock.calls.length).toBe(1)
  })
})

describe('Alert[hideClose]', () => {
  const onClose = jest.fn()
  const wrapper = mount(
    <Alert onClose={onClose} hideClose>
      hello world
    </Alert>
  )
  it('onClose', async () => {
    const closeIcon = wrapper.find(`.${SO_PREFIX}-alert-close`)
    expect(closeIcon.length).toBe(0)
  })
})

describe('Alert[icon, iconSize, type]', () => {
  const wrapper = mount(
    <Alert icon iconSize={24}>
      hello world
    </Alert>
  )
  it('iconSize', () => {
    const Icon = wrapper.find(`.${SO_PREFIX}-alert-icon`)
    expect(Icon.length).toBe(1)
    const dom = Icon.getDOMNode()
    expect(dom.style.width).toBe('24px')
    expect(dom.style.height).toBe('24px')
  })

  test.each(['success', 'info', 'warning', 'danger', 'error'])('type:%s', type => {
    wrapper.setProps({ type })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-alert`).hasClass(`${SO_PREFIX}-alert-${type}`)).toBeTruthy()
  })

  it('customIcon', () => {
    wrapper.setProps({ icon: <i>i</i> })
    wrapper.update()
    expect(
      wrapper
        .find(`.${SO_PREFIX}-alert-icon`)
        .children()
        .text()
    ).toBe('i')
  })
})
