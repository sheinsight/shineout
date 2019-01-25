import hash from '../../src/utils/hash'

describe('hash.js[hash]', () => {
  test('should be same if equal obj', () => {
    const obj = { a: 1, b: 2, c: '1' }
    expect(hash(obj)).toBe(hash(obj))
    expect(hash({ a: 'a' })).toBe(hash({ a: 'a' }))
    expect(hash('hello')).toBe(hash('hello'))
    const otherObj = new Date()
    expect(hash(otherObj)).toBe(hash(otherObj))
    expect(hash(NaN)).toBe(hash(NaN))
    expect(hash({})).not.toBe(hash({ a: 1}))
  })
})
