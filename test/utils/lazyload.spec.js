import { addStack } from '../../src/utils/lazyload'

describe('lazyload.js[addStack-removeStack]', () => {
  test('should render if dom in window', () => {
    const dom = document.createElement('div')
    const fn = jest.fn()
    addStack({
      element: dom,
      render: fn,
    })
    expect(fn.mock.calls.length).toBe(1)
  })
  test('should not render if dom not in window', () => {
    // #todo: use enzyme to test
  })
})

describe('lazyload.js[dispatch]', () => {
})
