import { getTransformName, has3d } from '../../../src/utils/dom/detect'

describe('detect.js[getTransformName-has3D]', () => {
  test('should return true in this evn', () => {
    expect(has3d()).toBeTruthy()
    expect(getTransformName()).toBe('transform')
  })
})
