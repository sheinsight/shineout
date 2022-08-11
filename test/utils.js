import enzyme from 'enzyme'
import { func } from 'prop-types'
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

export function baseTest(Component, selector, style = { color: 'blue' }, className = 'class-name-test') {
  const contains = (a, b) => Object.entries(b).every(([k, v]) => a[k] === v)
  const wrapper = enzyme.mount(<Component style={style} className={className} />)

  expect(wrapper.exists(selector)).toBeTruthy()
  expect(wrapper.find(selector || Component).hasClass(className)).toBe(true)
  expect(contains(wrapper.find(selector).getDOMNode().style, style)).toBeTruthy()
}

export function childrenTest(Component, selector) {
  const children = <div>Test Children</div>
  const wrapper = enzyme.mount(<Component>{children}</Component>)
  expect(wrapper.exists(selector)).toBeTruthy()
  return expect(wrapper.find(selector).contains(children)).toBeTruthy()
}

export const delay = time =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, time)
  )
