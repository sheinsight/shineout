import enzyme from 'enzyme'
import React from 'react'

export function isInstance(instance, constructor) {
  return Object.getPrototypeOf(instance) === constructor.prototype
}

export function sleep(duration = 300) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

export function simulateWheel(distance) {
  // wheelDeltaX
  const wheelEvent = new UIEvent('wheel')
  wheelEvent.initUIEvent('wheel', false, true)
  wheelEvent.wheelDeltaX = distance * 120
  document.dispatchEvent(wheelEvent)
}

export function beTruthy(validate) {
  return (...args) => expect(validate(...args)).toBeTruthy()
}
export function beFalsy(validate) {
  return (...args) => expect(validate(...args)).toBeFalsy()
}
export function beEqual(process) {
  return (input, expects) => expect(process(...input)).toEqual(expects)
}

export function appendToDOM(html) {
  const dom = document.createElement('div')
  dom.innerHTML = html
  document.body.appendChild(dom)
}

export function styleTest(Component, selector, style = { color: 'blue' }) {
  const wrapper = enzyme.mount(<Component style={style} />)
  expect(wrapper.exists(selector)).toBeTruthy()
  return expect(wrapper.find(selector).props().style).toBe(style)
}

export function classNameTest(Component, selector, className = 'class-name-test') {
  const wrapper = enzyme.mount(<Component className={className} />)
  if (selector) expect(wrapper.exists(selector)).toBeTruthy()
  return expect(wrapper.find(selector || Component).hasClass(className)).toBe(true)
}

export function childrenTest(Component) {
  const children = <div>Test Children</div>
  const wrapper = enzyme.mount(<Component>{children}</Component>)
  return expect(wrapper.children().text()).toBe('Test Children')
}
