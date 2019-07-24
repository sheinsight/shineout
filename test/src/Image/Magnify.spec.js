import React from 'react'
import { shallow, mount } from 'enzyme'
import Magnify from '../../../src/Image/Magnify'

describe('Image[Magnify]', () => {
  test('should render correct dom structure', () => {
    const props = {
      maxWidth: 300,
      maxHeight: 200,
      position: 'center',
      src: '/image/1_b.jpg',
    }
    const wrapper = shallow(<Magnify {...props} />)
    const renderStyle = wrapper.shallow().prop('style')
    expect(renderStyle.maxWidth).toBe(props.maxWidth)
    expect(renderStyle.maxHeight).toBe(props.maxHeight)
    // props.position === 'center' ? (status === 1 ? 'zoom-out' : 'zoom-in') : 'pointer'
    expect(renderStyle.cursor).toBe('zoom-in')
    // has image inner
    expect(
      wrapper
        .shallow()
        .find('img')
        .prop('src')
    ).toBe(props.src)
  })

  test('should zoom-in/out in if click', () => {
    const props = {
      maxWidth: 300,
      maxHeight: 200,
      position: 'center',
      src: '/image/1_b.jpg',
      lockScroll: () => {},
    }
    const wrapper = mount(<Magnify {...props} />)

    const renderStyle = wrapper
      .find('div')
      .at(0)
      .prop('style')
    expect(renderStyle.cursor).toBe('zoom-in')
    // simulate click
    wrapper
      .find('div')
      .at(0)
      .simulate('click', {
        clientX: 0,
        clientY: 0,
      })
    expect(
      wrapper
        .find('div')
        .at(0)
        .prop('style').cursor
    ).toBe('zoom-out')
    expect(
      wrapper
        .find('img')
        .at(0)
        .prop('style')
    ).toBeUndefined()
    // zoom-out
    // simulate click
    wrapper
      .find('div')
      .at(0)
      .simulate('click', {
        clientX: 0,
        clientY: 0,
      })
    expect(
      wrapper
        .find('div')
        .at(0)
        .prop('style').cursor
    ).toBe('zoom-in')
    expect(
      wrapper
        .find('img')
        .at(0)
        .prop('style')
    ).toEqual({
      maxWidth: 300,
      maxHeight: 200,
    })
  })
})
