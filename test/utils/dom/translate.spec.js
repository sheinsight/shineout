import { setTranslate, setTranslate3D } from '../../../src/utils/dom/translate'

describe('translate.js[setTranslate]', () => {
  test('should set translate success', () => {
    const dom = {
      style: {},
    }
    setTranslate(dom, '10px', '10px')
    // eslint-disable-next-line
    expect(dom.style.transform).toBe('translate(10px,10px)')
  })
  test('should set translate3D success', () => {
    const dom = {
      style: {},
    }
    setTranslate3D(dom, '10px', '10px')
    expect(dom.style.transform).toBe('translate3d(10px,10px,0)')
  })
})
