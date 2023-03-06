import { keysToArray, valuesToArray } from '../../src/utils/transform'

describe('transform', () => {
  it('should transform', () => {
    const map = new Map()
    map.set('a', 1)
    map.set('b', 2)
    map.set('c', 3)
    expect(keysToArray(map)).toStrictEqual(['a', 'b', 'c'])
    expect(valuesToArray(map)).toStrictEqual([1, 2, 3])
  })
})
