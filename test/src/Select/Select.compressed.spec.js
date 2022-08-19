import React from 'react'
import { mount } from 'enzyme/build'
import More, { getResetMore } from 'shineout/Select/More'

const createDiv = (width, style = {}, parent) => {
  const div = document.createElement('div')
  div.innerHTML = '123'
  div.style.width = width
  div.style.heigt = '16px'
  Object.keys(style).forEach(key => {
    div.style[key] = style[key]
  })
  if (parent) {
    parent.appendChild(div)
  } else {
    document.body.appendChild(div)
  }
  Object.defineProperty(div, 'clientWidth', {
    configurable: true,
    value: Number.parseInt(div.style.width, 10),
  })
  Object.defineProperty(div, 'offsetWidth', {
    configurable: true,
    value: Number.parseInt(div.style.width, 10),
  })
  return div
}

describe('getResetMore', () => {
  jest.useRealTimers()
  const container = createDiv('300px', { paddingLeft: '10px', paddingRight: '10px' })
  it('should return -1 when width is short then sum ', () => {
    const doms = [30, 40, 100, 20, 10].map(w => createDiv(`${w}px`, { marginRight: '4px' }, container))
    expect(getResetMore(false, container, doms)).toBe(-1)
  })
  it('should return 3 ', () => {
    // contentWidth: 300-20 -1 = 279
    // hideWidth: 14
    // 204 + 44 + 17 + 24 + 14 > 279
    const doms = [200, 40, 13, 20, 10].map(w => createDiv(`${w}px`, { marginRight: '4px' }, container))
    expect(getResetMore(false, container, doms)).toBe(3)
  })
  it('should return 2', () => {
    // contentWidth: 300-20 -1 = 279
    // hideWidth: 14
    // 204 + 44 + 18 + 14 > 279
    const doms = [200, 40, 14, 20, 10].map(w => createDiv(`${w}px`, { marginRight: '4px' }, container))
    expect(getResetMore(false, container, doms)).toBe(2)
  })

  it('should at least return 1', () => {
    // contentWidth: 300-20 -1 = 279
    // hideWidth: 14
    // 279 - 204 - 44- 14 - 4 = 13
    const doms = [280, 40, 14, 20, 10].map(w => createDiv(`${w}px`, { marginRight: '4px' }, container))
    expect(getResetMore(false, container, doms)).toBe(1)
  })

  it('should contentWidth - 16 when onFilter is true', () => {
    // contentWidth: 300-20 -1 - 16 = 263
    // hideWidth: 14
    // 204 + 18 + 14 = 263
    const doms = [200, 41, 23, 100, 10].map(w => createDiv(`${w}px`, { marginRight: '4px' }, container))
    expect(getResetMore(true, container, doms)).toBe(2)
  })
})

describe('More[props]', () => {
  const data = ['a', 'b', 'c', 'd'].map(i => (
    <span key={i} className="more-item">
      {i}
    </span>
  ))
  it('should return all num when showNum=-1', () => {
    const wrapper = mount(<More showNum={-1} data={data} />)
    expect(wrapper.find('.more-item').length).toBe(4)
    expect(wrapper.find('ShineoutPopover').length).toBe(0)
  })

  it('should return all num when showNum=5', () => {
    const wrapper = mount(<More showNum={5} data={data} />)
    expect(wrapper.find('.more-item').length).toBe(4)
    expect(wrapper.find('ShineoutPopover').length).toBe(0)
  })
  it('should return Popover', () => {
    const wrapper = mount(<More showNum={2} data={data} />)
    expect(wrapper.find('.more-item').length).toBe(2)
    expect(wrapper.find('ShineoutPopover').length).toBe(1)
    wrapper
      .find('More')
      .instance()
      .changeStatus(true)
    wrapper.update()
    expect(wrapper.find('.more-item').length).toBe(6)
  })

  it('should no-repeat', () => {
    const wrapper = mount(<More showNum={2} data={data} compressed="no-repeat" />)
    expect(wrapper.find('.more-item').length).toBe(2)
    expect(wrapper.find('ShineoutPopover').length).toBe(1)
    wrapper
      .find('More')
      .instance()
      .changeStatus(true)
    wrapper.update()
    expect(wrapper.find('.more-item').length).toBe(4)
  })
})
