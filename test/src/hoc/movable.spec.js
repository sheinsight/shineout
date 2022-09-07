import { mount } from 'enzyme'
import React from 'react'
import movable from '../../../src/hoc/moveable'

describe('movable', () => {
  // mock document clientWidth & clientHeight and target width & height
  const width = 10
  const height = 10
  const DIS_LIMIT = 50
  const clientWidth = 100
  const clientHeight = 100

  const XY = [
    // minimum value is not exceeded ( width/height + x/y < 50 )
    {
      x: 40,
      y: 40,
    },
    {
      x: 30,
      y: 40,
    },
    {
      x: 40,
      y: 30,
    },
    {
      x: 30,
      y: 30,
    },
    // out of range ( x/y + left/top > doc.clientWidth/doc.clientHeight - DIS_LIMIT )
    {
      x: 51,
      y: 51,
    },
    {
      x: 50,
      y: 51,
    },
    {
      x: 51,
      y: 50,
    },
  ]

  test('should move', () => {
    XY.forEach(xy => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      jest.spyOn(document.body, 'clientWidth', 'get').mockImplementation(() => clientWidth)
      jest.spyOn(document.body, 'clientHeight', 'get').mockImplementation(() => clientHeight)

      const App = props => (
        <div id="target" {...props} style={{ width, height }}>
          Hello
        </div>
      )
      const Component = movable('#target', App)
      const wrapper = mount(<Component moveable />, {
        attachTo: div,
      })

      const target = wrapper.find('#target')
      const instance = wrapper.find('Moveable')
      expect(target.length).toBe(1)

      target.getDOMNode().getBoundingClientRect = () => ({
        top: 0,
        left: 0,
        right: 10,
        width,
        height,
        bottom: 10,
      })

      const mousedown = new UIEvent('mousedown')
      mousedown.button = 0
      target.getDOMNode().dispatchEvent(mousedown)

      expect(instance.state().draging).toBe(true)

      const mousemove = new UIEvent('mousemove')
      mousemove.movementX = xy.x
      mousemove.movementY = xy.y
      document.dispatchEvent(mousemove)

      const mouseup = new UIEvent('mouseup')
      document.dispatchEvent(mouseup)

      expect(instance.state().x).toBe(10 + xy.x < DIS_LIMIT || xy.x > clientWidth - DIS_LIMIT ? 0 : xy.x)
      expect(instance.state().y).toBe(10 + xy.y < DIS_LIMIT || xy.y > clientWidth - DIS_LIMIT ? 0 : xy.y)
      expect(instance.state().draging).toBe(false)
      wrapper.unmount()
    })
  })

  test('should not move', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    jest.spyOn(document.body, 'clientWidth', 'get').mockImplementation(() => clientWidth)
    jest.spyOn(document.body, 'clientHeight', 'get').mockImplementation(() => clientHeight)

    const App = props => (
      <div id="target" {...props} style={{ width, height }}>
        Hello
      </div>
    )
    const Component = movable('#target', App)
    const wrapper = mount(<Component moveable />, {
      attachTo: div,
    })

    const target = wrapper.find('#target')
    const instance = wrapper.find('Moveable')
    expect(target.length).toBe(1)

    target.getDOMNode().getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      right: 10,
      width,
      height,
      bottom: 10,
    })

    const mousedown = new UIEvent('mousedown')
    mousedown.button = 1
    target.getDOMNode().dispatchEvent(mousedown)

    expect(instance.state().draging).toBe(false)
    wrapper.unmount()
  })

  test('should not move when handler is not exist', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    jest.spyOn(document.body, 'clientWidth', 'get').mockImplementation(() => clientWidth)
    jest.spyOn(document.body, 'clientHeight', 'get').mockImplementation(() => clientHeight)

    const App = props => (
      <div id="target" {...props} style={{ width, height }}>
        Hello
      </div>
    )
    const Component = movable('#targetA', App)
    const wrapper = mount(<Component moveable />, {
      attachTo: div,
    })

    const target = wrapper.find('#target')
    const instance = wrapper.find('Moveable')
    expect(target.length).toBe(1)

    target.getDOMNode().getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      right: 10,
      width,
      height,
      bottom: 10,
    })

    const mousedown = new UIEvent('mousedown')
    mousedown.button = 0
    target.getDOMNode().dispatchEvent(mousedown)

    expect(instance.state().draging).toBe(false)
    wrapper.unmount()
  })
})
