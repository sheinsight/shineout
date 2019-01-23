import { addStack, removeStack } from '../../src/utils/lazyload'

describe('lazyload.js[addStack-removeStack]', () => {
  test('', () => {
    const dom = document.createElement('div')
    addStack({
      element: dom,
      render: () => console.log('rednder')
    })
  })
})
