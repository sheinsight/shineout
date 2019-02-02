import classname from '../../src/utils/classname'
import config from '../../src/config'

describe('classname.js[classname]', () => {
  test('should return a className by generator function', () => {
    const cls = classname(undefined, 'jest')
    const inputs = [[{ a: true }, 'b'], [{ a: false }, 'b'], [], [undefined]]
    const expectData = [`${config.prefix}-jest-a ${config.prefix}-jest-b`, `${config.prefix}-jest-b`, '', '']
    inputs.forEach((input, index) => {
      expect(cls(...input)).toBe(expectData[index])
    })
  })
  test('should ignore if no module', () => {
    const cls = classname()
    expect(cls('a')).toBe('so--a')
  })
  test('should show the prefix if through', () => {
    const cls = classname({}, 'test', 'prefix')
    expect(cls('a')).toBe('prefix-test-a')
  })
  test('should ignore class while _', () => {
    const cls = classname(undefined, 'test')
    expect(cls('_')).toBe(`${config.prefix}-test`)
  })
})
