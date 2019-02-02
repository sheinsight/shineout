import { getParent, dispatchEvent, cssSupport } from '../../../src/utils/dom/element'

describe('element.js[getParent]', () => {
  const wrap = document.createElement('div')
  const form = document.createElement('form')
  const button = document.createElement('button')
  const input = document.createElement('input')
  wrap.appendChild(form)
  form.appendChild(button)
  form.appendChild(input)
  test('should get parent if have', () => {
    expect(getParent(input, 'div') instanceof HTMLElement).toBeTruthy()
    expect(getParent(input, 'form') instanceof HTMLElement).toBeTruthy()
  })
  test('should return null if not match', () => {
    expect(getParent(input, 'span')).toBeNull()
    expect(getParent(input, 'h1')).toBeNull()
  })
  test('should return self if match self', () => {
    expect(getParent(input, 'input') instanceof HTMLInputElement).toBeTruthy()
  })
})

describe('element.js[dispatchEvent]', () => {
  test('should dispatch custom event', () => {
    const dom = document.createElement('p')
    const eventName = 'test-event'
    const eventListener = jest.fn()
    dom.addEventListener(eventName, eventListener)
    dispatchEvent(dom, eventName)
    expect(eventListener.mock.calls.length).toBe(1)
  })
  test('should return undefined if form not pass', () => {
    expect(dispatchEvent(undefined, 'test')).toBeUndefined()
  })
})

describe('element.js[cssSupport]', () => {
  test('should return true if css support', () => {
    expect(cssSupport('color', 'red')).toBeTruthy()
    expect(cssSupport('display', 'while')).toBeTruthy()
  })
  test('should return false if not support', () => {
    expect(cssSupport('hello', 'white')).toBeFalsy()
  })
})
