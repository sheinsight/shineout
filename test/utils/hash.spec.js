import hash from '../../src/utils/hash'
import { deepClone } from '../../src/utils/clone'

describe('hash.js[hash]', () => {
  test('should be same if equal obj', () => {
    const inputs = [
      {
        a: 1,
        b: 2,
        c: '1',
      },
      { a: 'a' },
      'hello',
      new Date(),
      NaN,
    ]
    inputs.forEach(input => {
      expect(hash(input)).toBe(hash(deepClone(input)))
    })
  })
})
