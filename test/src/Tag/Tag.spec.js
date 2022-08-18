import { mount } from 'enzyme'
import React from 'react'
import { Tag } from 'shineout'
import { childrenTest, baseTest } from '../../utils'

/* global SO_PREFIX */
describe('Tag[onClose]', () => {
  test('should show close btn while onClose', () => {
    const wrapper = mount(<Tag onClose>Hello</Tag>)
    expect(wrapper.find(`.${SO_PREFIX}-tag-close-icon`)).toHaveLength(1)
    wrapper.find(`div.${SO_PREFIX}-tag-close-icon`).simulate('click')
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-tag`)).toHaveLength(0)
  })
  test('should not render close default', () => {
    const wrapper = mount(<Tag>Hello</Tag>)
    expect(wrapper.find(`.${SO_PREFIX}-tag-close-icon`)).toHaveLength(0)
  })
  test('should call onClose while func', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<Tag onClose={mockFn}>Hello</Tag>)
    wrapper.find(`div.${SO_PREFIX}-tag-close-icon`).simulate('click')
    expect(mockFn).toBeCalled()
  })

  test('should call onClose while defaultPrevented', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<Tag onClose={mockFn}>Hello</Tag>)
    wrapper.find(`div.${SO_PREFIX}-tag-close-icon`).simulate('click', { defaultPrevented: true })
    expect(mockFn).toBeCalled()
  })

  test('should render loading when onClose promise', () => {
    jest.useFakeTimers()
    const mockFn = jest.fn()
    const wrapper = mount(
      <Tag
        onClose={() =>
          new Promise(resolve => {
            setTimeout(() => {
              mockFn()
              resolve(true)
            }, 3000)
          })
        }
      >
        Hello
      </Tag>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tag-close-icon`)).toHaveLength(1)
    wrapper.find(`div.${SO_PREFIX}-tag-close-icon`).simulate('click')
    expect(wrapper.find(`.${SO_PREFIX}-tag-close-loading`)).toHaveLength(1)
    jest.runAllTimers()
    expect(mockFn).toBeCalled()
  })

  test('should render loading when onClose promise reject', () => {
    jest.useFakeTimers()
    const mockFn = jest.fn()
    const wrapper = mount(
      <Tag
        onClose={() =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              mockFn()
              reject()
            }, 3000)
          })
        }
      >
        Hello
      </Tag>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tag-close-icon`)).toHaveLength(1)
    wrapper.find(`div.${SO_PREFIX}-tag-close-icon`).simulate('click')
    expect(wrapper.find(`.${SO_PREFIX}-tag-close-loading`)).toHaveLength(1)
    jest.runAllTimers()
    expect(mockFn).toBeCalled()
  })
})

describe('Tag[Disabled]', () => {
  test('should render disabled className', () => {
    const wrapper = mount(<Tag disabled>Disabled</Tag>)
    expect(wrapper.find(`.${SO_PREFIX}-tag-disabled`)).toHaveLength(1)
  })

  test('should not onClose', () => {
    const wrapper = mount(
      <Tag disabled onClose>
        Disabled
      </Tag>
    )
    wrapper.find(`div.${SO_PREFIX}-tag-close-icon`).simulate('click')
    expect(wrapper.find(`.${SO_PREFIX}-tag`)).toHaveLength(1)
  })
})

describe('Tag[Input]', () => {
  test('should render input', () => {
    const wrapper = mount(<Tag.Input />)
    expect(wrapper.find('label input')).toHaveLength(1)
  })

  test('should inputable', () => {
    const handleCompleted = jest.fn()
    const wrapper = mount(<Tag onCompleted={handleCompleted}>Hello</Tag>)
    wrapper.instance().setState({ inputVisible: 1 })
    wrapper.update()
    expect(wrapper.find('input').length).toBe(1)
    wrapper.find('input').simulate('change', { target: { value: 'Hello' } })
    expect(wrapper.find(`input`).getDOMNode().value).toBe('Hello')
  })

  test('should blur', () => {
    const handleCompleted = jest.fn()
    const wrapper = mount(<Tag onCompleted={handleCompleted} />)
    wrapper.instance().setState({ inputVisible: 1 })
    wrapper.update()
    expect(wrapper.find('input').length).toBe(1)
    wrapper.find('input').simulate('blur', { target: { value: 'Hello' } })
    expect(handleCompleted).toBeCalled()
  })
})

describe('Tag[backgroundColor]', () => {
  test('should set background color', () => {
    const backgroundColor = 'rgb(0, 0, 0)'
    const wrapper = mount(<Tag backgroundColor={backgroundColor} />)
    expect(wrapper.find(`.${SO_PREFIX}-tag`).getDOMNode().style.backgroundColor).toBe(backgroundColor)
  })
})

describe('Tag[children]', () => {
  test('should set children', () => {
    childrenTest(Tag, `.${SO_PREFIX}-tag`)
  })
})

describe('Tag[base]', () => {
  test('should custom style and className', () => {
    baseTest(Tag, `.${SO_PREFIX}-tag`)
  })
})

describe('Tag[onClick]', () => {
  test('should onClick', () => {
    const handleClick = jest.fn()
    const wrapper = mount(<Tag onClick={handleClick} />)
    wrapper.find(`.${SO_PREFIX}-tag`).simulate('click')
    expect(handleClick).toBeCalled()
  })
})

describe('Tag[onCompleted]', () => {
  test('should onCompleted', () => {
    const handleCompleted = jest.fn()
    const wrapper = mount(
      <Tag
        onCompleted={handleCompleted}
        onClose={() => {
          console.log('close')
        }}
      >
        Hello
      </Tag>
    )
    wrapper.find(`.${SO_PREFIX}-tag-inline`).simulate('click')
    wrapper.update()
    expect(wrapper.find('input').length).toBe(1)
    wrapper.find('input').simulate('keyup', { keyCode: 13, target: { value: 'Hello' } })
    expect(handleCompleted).toBeCalled()
  })
})

describe('Tag[onKeyUp]', () => {
  test('should onKeyUp', () => {
    const handleKeyUp = jest.fn()
    const handleCompleted = jest.fn()
    const wrapper = mount(<Tag onCompleted={handleCompleted} onKeyUp={handleKeyUp} />)
    wrapper.instance().setState({ inputVisible: 1 })
    wrapper.update()
    expect(wrapper.find('input').length).toBe(1)
    wrapper.find('input').simulate('keyup', { keyCode: 13, target: { value: 'Hello' } })
    expect(handleKeyUp).toBeCalled()
  })
})

describe('Tag[onEnterPress]', () => {
  test('should onEnterPress', () => {
    const onEnterPress = jest.fn()
    const handleCompleted = jest.fn()
    const wrapper = mount(<Tag onCompleted={handleCompleted} onEnterPress={onEnterPress} />)
    wrapper.instance().setState({ inputVisible: 1 })
    wrapper.update()
    expect(wrapper.find('input').length).toBe(1)
    wrapper.find('input').simulate('keyup', { keyCode: 13, target: { value: 'Hello' } })
    expect(onEnterPress).toBeCalled()
  })
})

describe('Tag[type]', () => {
  test('should set type', () => {
    const type = ['success', 'info', 'warning', 'danger', 'error']
    type.forEach(i => {
      const wrapper = mount(<Tag type={i} />)
      expect(wrapper.find(`.${SO_PREFIX}-tag`).hasClass(`${SO_PREFIX}-tag-${i}`)).toBe(true)
    })
  })
})
