import classname from '../../src/utils/classname'
import config from '../../src/config'

describe('classname.js[classname]', () => {
  test('should return a className generate function', () => {
    const generator = classname({}, 'test')
    expect(generator({ a: true }, 'b')).toBe(`${config.prefix}-test-a ${config.prefix}-test-b`)
    expect(generator({ a: false }, 'b')).toBe(`${config.prefix}-test-b`)
    expect(generator()).toBe('')
  })
  test('should normal if no module', () => {
    const generator = classname()
    expect(generator('a')).toBe('so--a')
  })
  test('should show the prefix if pass', () => {
    const generator = classname({}, 'test', 'prefix')
    expect(generator('a')).toBe('prefix-test-a')
  })
})
