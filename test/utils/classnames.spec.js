import classname from '../../src/utils/classname'

describe('classname.js[classname]', () => {
  test('should return a className generate function', () => {
    const generator = classname({}, 'test')
    expect(generator({ a: true }, 'b')).toBe('so-test-a so-test-b')
    expect(generator({ a: false }, 'b')).toBe('so-test-b')
    expect(generator()).toBe('')
  })
  test('should normal if no module', () => {
    const generator = classname()
    expect(generator('a')).toBe('so--a')
  })
})
