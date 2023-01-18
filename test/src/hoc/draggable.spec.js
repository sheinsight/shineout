import React from 'react'
import { mount } from 'enzyme'
import draggable from '../../../src/hoc/draggable'

// eslint-disable-next-line react/prop-types
const Div = props => <div id="target" onMouseDown={props.onDragStart} />
const DragItem = draggable(Div)
describe('test draggable', () => {
  it('didMount with client', () => {
    jest.useFakeTimers()
    const handler = {}
    document.addEventListener = (key, h) => {
      handler[key] = h
    }
    document.removeEventListener = key => {
      delete handler[key]
    }
    const onDragStart = jest.fn()
    const onDrag = jest.fn()
    const onDragEnd = jest.fn()
    mount(<DragItem client={{ x: 10, y: 10 }} onDragStart={onDragStart} onDrag={onDrag} onDragEnd={onDragEnd} />)
    expect(onDragStart.mock.calls.length).toBe(1)
    expect(onDragStart.mock.calls[0][0]).toBe(undefined)
    // drag
    handler.mousemove({ clientX: 20, clientY: 30 })
    jest.runAllTimers()
    expect(onDrag.mock.calls.length).toBe(1)
    expect(onDrag.mock.calls[0]).toEqual([10, 20, 20, 30])

    // end
    handler.mouseup()
    expect(onDragEnd.mock.calls.length).toBe(1)
    expect(onDragEnd.mock.calls[0][0]).toBe(undefined)
  })

  it('should drag', () => {
    jest.useFakeTimers()
    const handler = {}
    document.addEventListener = (key, h) => {
      handler[key] = h
    }
    document.removeEventListener = key => {
      delete handler[key]
    }
    const onDragStart = jest.fn()
    const onDrag = jest.fn()
    const onDragEnd = jest.fn()
    const wrapper = mount(<DragItem onDragStart={onDragStart} onDrag={onDrag} onDragEnd={onDragEnd} />)

    wrapper.find('#target').simulate('mousedown', { clientX: 10, clientY: 10, button: 0 })
    expect(Object.keys(handler)).toStrictEqual(['mousemove', 'mouseup', 'mouseleave'])
    expect(onDragStart.mock.calls.length).toBe(1)
    expect(onDragStart.mock.calls[0][0]).toBe(undefined)
    // drag
    handler.mousemove({ clientX: 20, clientY: 30 })
    jest.runAllTimers()
    expect(onDrag.mock.calls.length).toBe(1)
    expect(onDrag.mock.calls[0]).toEqual([10, 20, 20, 30])

    // end
    handler.mouseup()
    expect(onDragEnd.mock.calls.length).toBe(1)
    expect(onDragEnd.mock.calls[0][0]).toBe(undefined)

    expect(() => wrapper.unmount()).not.toThrow()
  })
})
