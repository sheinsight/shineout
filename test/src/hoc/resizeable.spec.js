import { mount } from 'enzyme'
import React from 'react'
import resizable from '../../../src/hoc/resizable'

/* global SO_PREFIX */

describe('resizable', () => {
  // mock document clientWidth & clientHeight and target width & height
  const width = 10
  const height = 10
  const clientWidth = 100
  const clientHeight = 100

  const div = document.createElement('div')
  document.body.appendChild(div)
  jest.spyOn(document.body, 'clientWidth', 'get').mockImplementation(() => clientWidth)
  jest.spyOn(document.body, 'clientHeight', 'get').mockImplementation(() => clientHeight)

  test('should resizable', () => {
    const XY = ['x', 'y', 'xy']

    XY.forEach(item => {
      const App = props => (
        <div id="target" {...props} style={{ width, height }}>
          Hello
        </div>
      )
      const Component = resizable(App)
      const wrapper = mount(<Component resizable />, {
        attachTo: div,
      })
      const [x, y, xy] = Array.from(
        wrapper
          .find('Resizable')
          .instance()
          .handlers.keys()
      )
      const mousedown = new UIEvent('mousedown')
      const mousemove = new UIEvent('mousemove')
      const mouseup = new UIEvent('mouseup')
      const movementX = 10
      const movementY = 10
      mousemove.movementX = movementX
      mousemove.movementY = movementY

      if (item === 'x') x.dispatchEvent(mousedown)
      if (item === 'y') y.dispatchEvent(mousedown)
      if (item === 'xy') xy.dispatchEvent(mousedown)

      document.dispatchEvent(mousemove)
      expect(wrapper.find('Resizable').state().x).toBe(item.indexOf('x') >= 0 ? movementX : 0)
      expect(wrapper.find('Resizable').state().y).toBe(item.indexOf('y') >= 0 ? movementY : 0)

      document.dispatchEvent(mouseup)
      expect(wrapper.find('Resizable').instance().active).toBe(undefined)
    })
  })

  test('should not resizable when resizable is not x y xy', () => {
    const App = props => (
      <div id="target" {...props} style={{ width, height }}>
        Hello
      </div>
    )
    const Component = resizable(App)
    const wrapper = mount(<Component resizable="p" />, {
      attachTo: div,
    })
    expect(
      Array.from(
        wrapper
          .find('Resizable')
          .instance()
          .handlers.keys()
      ).length
    ).toBe(0)
  })

  test('should not resizable when resizable is False', () => {
    const App = props => (
      <div id="target" {...props} style={{ width, height }}>
        Hello
      </div>
    )
    const Component = resizable(App)
    const wrapper = mount(<Component />, {
      attachTo: div,
    })
    expect(wrapper.find(`.${SO_PREFIX}-resizable-handler`).length).toBe(0)
  })
})
