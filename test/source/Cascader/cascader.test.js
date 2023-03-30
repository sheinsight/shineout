import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import FinalCase from '../../../site/pages/components/Cascader/example-10-final'

describe('Cascader 测试', () => {
  test('final 属性测试', () => {
    jest.useFakeTimers()
    // Arrange
    render(<FinalCase />)
    // 再次打开
    const single = document.querySelector('.so-cascader')
    const multiple = document.querySelectorAll('.so-cascader')[1]
    fireEvent.click(single)
    fireEvent.focus(single)
    let lists = single.querySelectorAll('.so-cascader-list')
    expect(lists.length).toBe(1)
    // 点击第一层 无选择中结果
    fireEvent.click(lists[0].querySelector('.so-cascader-node'))
    jest.runAllTimers()
    lists = single.querySelectorAll('.so-cascader-list')
    expect(lists.length).toBe(2)
    expect(single.querySelectorAll('.so-cascader-item').length).toBe(0)
    // 点击第二层 无选择中结果
    fireEvent.click(lists[1].querySelector('.so-cascader-node'))
    jest.runAllTimers()
    lists = single.querySelectorAll('.so-cascader-list')
    expect(lists.length).toBe(3)
    expect(single.querySelectorAll('.so-cascader-item').length).toBe(0)
    // 点击第三层 有选择中结果， 列表关闭
    fireEvent.click(lists[2].querySelector('.so-cascader-node'))
    jest.runAllTimers()
    lists = single.querySelectorAll('.so-cascader-list')
    expect(lists.length).toBe(0)
    expect(single.querySelectorAll('.so-cascader-item').length).toBe(3)

    // 点击展开
    fireEvent.click(single)
    fireEvent.focus(single)
    // 单选筛选
    const input = single.querySelector('.so-cascader-input')
    fireEvent.click(input)
    fireEvent.input(input, {
      target: {
        innerText: 'fei',
      },
    })
    jest.runAllTimers()
    // 筛选列表 只有 anhui / ghefei/ feidong
    const filterList = single.querySelectorAll('.so-cascader-filter-list')
    expect(filterList.length).toBe(1)
    expect(filterList[0].childNodes.length).toBe(1)
    const filterListContent = single.querySelectorAll('.so-cascader-filter-list-content')
    expect(filterListContent.length).toBe(3)

    // 点击 anhui 会选择 anhui / ghefei/ feidong
    fireEvent.click(filterListContent[0])
    jest.runAllTimers()
    jest.runAllTimers()
    expect(single.querySelectorAll('.so-cascader-item')[2].textContent).toBe('feidong')

    // 打开多选
    fireEvent.click(multiple)
    fireEvent.focus(multiple)

    // 第一层不展示 checkbox
    expect(multiple.querySelectorAll('.so-checkinput').length).toBe(0)

    // 打开第二层
    fireEvent.click(multiple.querySelector('.so-cascader-node'))
    jest.runAllTimers()
    expect(multiple.querySelectorAll('.so-cascader-list').length).toBe(2)
    expect(multiple.querySelectorAll('.so-checkinput').length).toBe(0)

    // 打开第三层 最末级展示 checkbox
    fireEvent.click(multiple.querySelectorAll('.so-cascader-list')[1].querySelector('.so-cascader-node'))
    jest.runAllTimers()
    expect(multiple.querySelectorAll('.so-cascader-list').length).toBe(3)
    expect(multiple.querySelectorAll('.so-checkinput').length).toBe(1)
  })
})
