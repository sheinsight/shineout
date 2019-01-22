import PropTypes from 'prop-types'
import { getProps } from '../../src/utils/proptypes'

describe('proptypes.js[getProps]', () => {
  test('should container arguments', () => {
    const props = ['size', 'type']
    props.forEach((prop) => {
      expect(getProps(PropTypes, prop)[prop]).toBeDefined()
    })
  })
  test('should default contain className and style', () => {
    const props = getProps(PropTypes)
    expect(props.className).toBeDefined()
    expect(props.style).toBeDefined()
  })
})
