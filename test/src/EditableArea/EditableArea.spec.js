import React from 'react'
import { mount } from 'enzyme'
import { EditableArea } from 'shineout'
import exampleTest from '../../example'

describe('EditableArea[snapshot]', () => {
  exampleTest(`EditableArea`)
})

describe('EditableArea[base]', () => {
  const wrapper = mount(<EditableArea />)
  test('should not render textarea', () => {
    expect(wrapper.find('Textarea').length).toBe(0)
  })
  test('should not render textarea', () => {
    wrapper.find('input').simulate('focus')
    expect(wrapper.find('Textarea').length).toBe(1)
  })
  test('should input something', () => {
    wrapper.find('input').simulate('focus')
    wrapper
      .find('textarea')
      .first()
      .simulate('change', { target: { value: 'hello world' } })
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe('hello world')
  })
  test('should input something', () => {
    wrapper.find('input').simulate('focus')
    wrapper
      .find('textarea')
      .first()
      .simulate('change', { target: { value: 'hello world' } })
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe('hello world')
  })
})

// 静态属性
describe('EditableArea[border, className, style, placeholder, width]', () => {
  const wrapper = mount(
    <EditableArea bordered className="customClass" style={{ color: 'red' }} placeholder="say something" width={200} />
  )
  it('should not has class so-editableArea-none-bordered', () => {
    expect(wrapper.find('.so-editableArea-none-bordered').length).toBe(0)
  })
  it('should have custom className', () => {
    expect(wrapper.find('.so-editableArea').hasClass('customClass')).toBeTruthy()
  })
  it('should have custom style and width', () => {
    const node = wrapper.find('.so-editableArea').getDOMNode()
    expect(node.style.width).toBe('200px')
    expect(node.style.color).toBe('red')
  })
  it('should have placeholder', () => {
    const node = wrapper.find('input').getDOMNode()
    expect(node.getAttribute('placeholder')).toBe('say something')
  })
})

// value 相关
describe('EditableArea[value, defaultValue onChange clearable, trim]', () => {
  const onChangeHandler = jest.fn()
  const wrapper = mount(<EditableArea defaultValue="default" clearable onChange={onChangeHandler} trim />)
  it('should render defaultValue', () => {
    expect(wrapper.find('input').getDOMNode().value).toBe('default')
  })
  it('should clear value and trigger onChange', () => {
    wrapper.find('input').simulate('focus')
    expect(wrapper.find('.so-editableArea-clear').length).toBe(1)
    jest.useFakeTimers()
    wrapper.find('.so-editableArea-clear').simulate('click')
    expect(wrapper.find('input').getDOMNode().value).toBe('')
    jest.runAllTimers()
    expect(onChangeHandler.mock.calls.length).toBe(1)
    expect(onChangeHandler.mock.calls[0][0]).toBe('')
  })

  it('should render control value', () => {
    wrapper.setProps({ ...wrapper.props(), value: 'control' })
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe('control')
  })

  it('should onChange trim value', () => {
    wrapper.find('input').simulate('focus')
    jest.useFakeTimers()
    wrapper
      .find('textarea')
      .first()
      .simulate('change', { target: { value: '   hello world   ' } })
    wrapper
      .find('textarea')
      .first()
      .simulate('blur')
    jest.runAllTimers()
    wrapper.update()
    expect(onChangeHandler.mock.calls[1][0]).toBe('hello world')
  })
})

describe('EditableArea[renderFooter renderResult]', () => {
  const wrapper = mount(
    <EditableArea
      renderFooter={value => <span>{`footer-${value}`}</span>}
      renderResult={value => <span>{`result-${value}`}</span>}
    />
  )
  it('should render footer', () => {
    wrapper.find('.so-editableArea-input').simulate('focus')
    wrapper
      .find('textarea')
      .first()
      .simulate('change', { target: { value: 'shineout' } })
    expect(wrapper.find('.so-input-footer').text()).toBe('footer-shineout')
  })
  it('should render result', () => {
    wrapper.find('.so-editableArea-input').simulate('blur')
    expect(wrapper.find('.so-editableArea-input').text()).toBe('result-shineout')
  })
})

describe('editableArea[disabled]', () => {
  const wrapper = mount(<EditableArea disabled />)
  it('should render class .so-input-disabled', () => {
    expect(wrapper.find('.so-input-disabled').length).toBe(1)
  })
  it('should not react when click', () => {
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('disabled')
    ).toBe('')
  })
})

describe('editableArea[maxHeight, onBlur, onFocus, getPopoverContainer]', () => {
  const blurFn = jest.fn()
  const focusFn = jest.fn()
  const container = document.createElement('div')
  container.setAttribute('id', 'container')
  document.body.appendChild(container)
  const wrapper = mount(
    <EditableArea maxHeight={50} onBlur={blurFn} onFocus={focusFn} getPopupContainer={() => container} />
  )
  wrapper.update()
  it('should call onFocus', () => {
    wrapper.find('input').simulate('focus')
    expect(wrapper.find(`.so-input-focus`).length).toBe(2)
    wrapper.find('input').simulate('blur')
    expect(wrapper.find(`.so-input-focus`).length).toBe(1)
  })
  //
  // it('should render popover in container', () => {
  //   expect(container.innerHTML.indexOf('so-popover') > -1).toBeTruthy()
  // })
  it('should render maxHeight style', () => {
    expect(wrapper.find('.so-input-auto-size').getDOMNode().style.maxHeight).toBe('50px')
  })
  it('should call blur', () => {
    wrapper.find('.so-input-auto-size').simulate('blur')
    expect(blurFn.mock.calls.length).toBe(1)
  })
})
