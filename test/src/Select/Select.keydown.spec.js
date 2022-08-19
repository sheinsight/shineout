import React from 'react'
import { mount } from 'enzyme'
import { Select } from 'shineout'
import { delay } from '../../utils'
import GroupCase from '../../../site/pages/components/Select/example-02-group'
import BigDataCase from '../../../site/pages/components/Select/example-06-bigdata'
import Create from '../../../site/pages/components/Select/example-12-create'

describe('Select[keyDown]', () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  const placeholder = 'select_test'
  const div = document.createElement('div')
  document.body.appendChild(div)
  const wrapper = mount(<Select keygen data={data} placeholder={placeholder} />, { attachTo: div })
  test('should focus when enter and blur when tab ', () => {
    expect(wrapper.find('Result').props().focus).toBe(false)
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    expect(wrapper.find('Result').props().focus).toBe(true)
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 9 })
    expect(wrapper.find('Result').props().focus).toBe(false)
  })
  test('should select ', () => {
    // 第一次回车展开列表
    // 第二次回车选择
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    expect(wrapper.find('Result').props().result[0]).toBe('red')

    // 在第一个 往上会变成最后一个
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 38 })
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    expect(wrapper.find('Result').props().result[0]).toBe('violet')

    // enter down enter
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 40 })
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    expect(wrapper.find('Result').props().result[0]).toBe('red')

    // enter down enter
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 40 })
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    expect(wrapper.find('Result').props().result[0]).toBe('orange')

    // enter up enter
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 38 })
    wrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    expect(wrapper.find('Result').props().result[0]).toBe('red')
  })
  test('should del', async () => {
    const wrapper2 = mount(
      <Select keygen data={data} placeholder={placeholder} multiple onFilter={text => d => d.indexOf(text) >= 0} />,
      { attachTo: div }
    )
    // 选择3个
    wrapper2.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    wrapper2.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    wrapper2.find('.so-select-inner').simulate('keyDown', { keyCode: 40 })
    wrapper2.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    wrapper2.find('.so-select-inner').simulate('keyDown', { keyCode: 40 })
    wrapper2.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    expect(wrapper2.find('Result').props().result.length).toBe(3)
    // 删除一个
    wrapper2.find('.so-select-inner').simulate('keyDown', { keyCode: 8 })
    expect(wrapper2.find('Result').props().result.length).toBe(2)
    // 当输入的筛选文本 按删除只会删除文本不会触发删除选项
    wrapper2.find('.so-select-input').simulate('input', { target: { innerText: 'aaa' } })
    wrapper2.find('.so-select-inner').simulate('keyDown', { keyCode: 8 })
    expect(wrapper2.find('Result').props().result.length).toBe(2)
    // 清空文本后需要一段延迟(400ms)才能删除
    wrapper2.find('.so-select-input').simulate('input', { target: { innerText: '' } })
    wrapper2.find('.so-select-inner').simulate('keyDown', { keyCode: 8 })
    expect(wrapper2.find('Result').props().result.length).toBe(2)
    await delay(400)
    wrapper2.find('.so-select-inner').simulate('keyDown', { keyCode: 8 })
    expect(wrapper2.find('Result').props().result.length).toBe(1)
  })
  test('should group be jumped when keydown', () => {
    const GroupWrapper = mount(<GroupCase />, { attachTo: div })
    GroupWrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    GroupWrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 40 })
    GroupWrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    expect(GroupWrapper.find('Result').props().result[0].value).toBe('Mars')
    GroupWrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    GroupWrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 38 })
    GroupWrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    expect(GroupWrapper.find('Result').props().result[0].value).toBe('Shanghai')
  })
  test('verticalList scroll', async () => {
    jest.useFakeTimers()
    const BigDataWrapper = mount(<BigDataCase />, { attachTo: div })
    // 选择3个
    BigDataWrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 13 })
    new Array(100).fill(undefined).forEach(() => {
      BigDataWrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 40 })
    })
    BigDataWrapper.update()
    expect(
      BigDataWrapper.find('.so-select-hover')
        .text()
        .indexOf('101') > -1
    ).toBe(true)
    new Array(102).fill(undefined).forEach(() => {
      BigDataWrapper.find('.so-select-inner').simulate('keyDown', { keyCode: 38 })
    })
    BigDataWrapper.update()
    expect(
      BigDataWrapper.find('.so-select-hover')
        .text()
        .indexOf('9999') > -1
    ).toBe(true)
  })
  it('onCreate 通过回车选中后 hoverIndex 修改为第一个', () => {
    const CreateWrapper = mount(<Create />, { attachTo: div })
    const getSelect = () => CreateWrapper.find('.so-select').at(1)
    expect(
      getSelect()
        .find('Result')
        .props().focus
    ).toBe(false)
    getSelect()
      .find('.so-select-inner')
      .simulate('keyDown', { keyCode: 13 })
    expect(
      getSelect()
        .find('Result')
        .props().focus
    ).toBe(true)

    getSelect()
      .find('.so-select-inner')
      .simulate('keyDown', { keyCode: 40 })
    CreateWrapper.update()
    getSelect()
      .find('.so-select-inner')
      .simulate('keyDown', { keyCode: 40 })
    CreateWrapper.update()
    getSelect()
      .find('.so-select-inner')
      .simulate('keyDown', { keyCode: 13 })
    CreateWrapper.update()

    expect(
      getSelect()
        .find('.so-select-option')
        .at(0)
        .hasClass('so-select-hover')
    ).toBeTruthy()
  })
})
