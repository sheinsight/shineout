import Datum from '../../../src/Datum'

const buildValue = () => ({
  user: { name: 'a', address: { city: 'SH' } },
  tags: ['x', 'y'],
  other: 1,
})

// 观察走的是哪条分支：deepSet 原地修改，$values 引用不变；
// deepSetImmutable 返回新的根并赋值回 $values，引用必然变化
const setAndWatch = options => {
  const datum = new Datum.Form(options)
  datum.setValue(buildValue())
  const before = datum.$values
  datum.set('user.address.city', 'BJ')
  return { datum, before, replaced: datum.$values !== before }
}

describe('Form immutable option', () => {
  describe('tri-state resolution', () => {
    it('should not use immutable path by default', () => {
      const { datum, before, replaced } = setAndWatch({})
      expect(datum.get('user.address.city')).toBe('BJ')
      expect(replaced).toBe(false)
      expect(datum.$values).toBe(before)
    })

    it('should not use immutable path when immutable is explicitly false', () => {
      const { datum, replaced } = setAndWatch({ immutable: false })
      expect(datum.get('user.address.city')).toBe('BJ')
      expect(replaced).toBe(false)
    })

    it('should not use immutable path when immutable is explicitly false even if deepClone is false', () => {
      const { datum, replaced } = setAndWatch({ deepClone: false, immutable: false })
      expect(datum.get('user.address.city')).toBe('BJ')
      expect(replaced).toBe(false)
    })

    it('should use immutable path when immutable is true', () => {
      const { datum, replaced } = setAndWatch({ immutable: true })
      expect(datum.get('user.address.city')).toBe('BJ')
      expect(replaced).toBe(true)
    })

    it('should use immutable path when immutable is true even if deepClone is true', () => {
      const { datum, replaced } = setAndWatch({ deepClone: true, immutable: true })
      expect(datum.get('user.address.city')).toBe('BJ')
      expect(replaced).toBe(true)
    })

    it('should use immutable path when immutable is true and deepClone is false', () => {
      const { datum, replaced } = setAndWatch({ deepClone: false, immutable: true })
      expect(datum.get('user.address.city')).toBe('BJ')
      expect(replaced).toBe(true)
    })

    it('should auto enable immutable path when deepClone is false and immutable is unset', () => {
      const { datum, replaced } = setAndWatch({ deepClone: false })
      expect(datum.get('user.address.city')).toBe('BJ')
      expect(replaced).toBe(true)
    })
  })

  describe('immutable=true (path based shallow copy)', () => {
    it('should replace only the nodes on the path and reuse the siblings', () => {
      const datum = new Datum.Form({ immutable: true })
      datum.setValue(buildValue())

      const before = datum.$values
      const beforeUser = before.user
      const beforeAddress = before.user.address
      const beforeTags = before.tags

      datum.set('user.address.city', 'BJ')

      expect(datum.get('user.address.city')).toBe('BJ')

      // 路径上的节点都被替换
      expect(datum.$values).not.toBe(before)
      expect(datum.$values.user).not.toBe(beforeUser)
      expect(datum.$values.user.address).not.toBe(beforeAddress)

      // 旁系节点复用引用
      expect(datum.$values.tags).toBe(beforeTags)
      expect(datum.$values.other).toBe(before.other)
      expect(datum.$values.user.name).toBe(beforeUser.name)
    })

    it('should not mutate the previous value tree', () => {
      const datum = new Datum.Form({ immutable: true })
      datum.setValue(buildValue())

      const before = datum.$values
      const beforeAddress = before.user.address

      datum.set('user.address.city', 'BJ')

      // 旧树的引用关系与值都保持原样
      expect(before.user.address).toBe(beforeAddress)
      expect(before.user.address.city).toBe('SH')
      expect(before.user.name).toBe('a')
    })

    it('should keep the untouched items of an array', () => {
      const datum = new Datum.Form({ immutable: true })
      datum.setValue({ list: [{ id: 1 }, { id: 2 }, { id: 3 }] })

      const before = datum.$values
      const beforeList = before.list

      datum.set('list[1].id', 20)

      expect(datum.get('list[1].id')).toBe(20)
      expect(datum.$values.list).not.toBe(beforeList)
      expect(datum.$values.list[0]).toBe(beforeList[0])
      expect(datum.$values.list[1]).not.toBe(beforeList[1])
      expect(datum.$values.list[2]).toBe(beforeList[2])
      expect(beforeList[1].id).toBe(2)
    })

    it('should create the missing branch on the new root', () => {
      const datum = new Datum.Form({ immutable: true })
      datum.setValue(buildValue())

      const before = datum.$values
      datum.set('user.extra.note', 'n')

      expect(datum.get('user.extra.note')).toBe('n')
      expect(datum.$values).not.toBe(before)
      expect(before.user.extra).toBe(undefined)
      expect(before.user.address.city).toBe('SH')
    })

    it('should work with primitive values', () => {
      const datum = new Datum.Form({ immutable: true })
      datum.setValue({ other: 1 })

      const before = datum.$values
      datum.set('other', 2)

      expect(datum.get('other')).toBe(2)
      expect(datum.$values).not.toBe(before)
      expect(before.other).toBe(1)
    })

    it('should still notify onChange with the new value', () => {
      const mockOnChange = jest.fn()
      const datum = new Datum.Form({ immutable: true, onChange: mockOnChange })
      datum.setValue({ user: { address: { city: 'SH' } } })

      datum.set('user.address.city', 'BJ')

      expect(mockOnChange).toHaveBeenCalled()
      const changedValue = mockOnChange.mock.calls[0][0]
      expect(changedValue.user.address.city).toBe('BJ')
    })

    it('should not replace $values when the value is unchanged', () => {
      const datum = new Datum.Form({ immutable: true })
      datum.setValue(buildValue())

      const before = datum.$values
      datum.set('user.address.city', 'SH')

      expect(datum.$values).toBe(before)
    })
  })

  describe('immutable=false', () => {
    it('should keep mutating $values in place', () => {
      const datum = new Datum.Form({ immutable: false })
      datum.setValue(buildValue())

      const before = datum.$values
      const beforeUser = before.user

      datum.set('user.address.city', 'BJ')

      expect(datum.$values).toBe(before)
      expect(datum.$values.user).toBe(beforeUser)
      expect(datum.get('user.address.city')).toBe('BJ')
    })
  })
})

// insert / splice / remove / set(object) are the paths Form.FieldSet triggers,
// they all have to follow the same immutable rule as set(name, value)
describe('Form immutable option: array operations and remove', () => {
  const buildDatum = options => {
    const datum = new Datum.Form(options)
    datum.setValue({ list: [{ a: 1 }, { a: 2 }, { a: 3 }] })
    return datum
  }

  describe('immutable=true', () => {
    it('insert should replace $values and keep the old tree intact', () => {
      const datum = buildDatum({ immutable: true })
      const before = datum.$values
      const beforeList = before.list

      datum.insert('list', 1, { a: 9 })

      expect(datum.get('list')).toEqual([{ a: 1 }, { a: 9 }, { a: 2 }, { a: 3 }])
      expect(datum.$values).not.toBe(before)
      expect(datum.$values.list).not.toBe(beforeList)

      // 旧树与旧数组都没有被改动
      expect(before.list).toBe(beforeList)
      expect(beforeList).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }])

      // 未改动的元素复用引用
      expect(datum.$values.list[0]).toBe(beforeList[0])
      expect(datum.$values.list[3]).toBe(beforeList[2])
    })

    it('splice should replace $values and keep the old tree intact', () => {
      const datum = buildDatum({ immutable: true })
      const before = datum.$values
      const beforeList = before.list

      datum.splice('list', 1)

      expect(datum.get('list')).toEqual([{ a: 1 }, { a: 3 }])
      expect(datum.$values).not.toBe(before)
      expect(datum.$values.list).not.toBe(beforeList)
      expect(beforeList).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }])
    })

    it('remove should replace $values and keep the old tree intact', () => {
      const datum = new Datum.Form({ immutable: true })
      datum.setValue({ a: { b: 1, c: 2 }, keep: { x: 1 } })
      const before = datum.$values
      const beforeA = before.a

      datum.remove('a.b')

      expect(datum.get('a')).toEqual({ c: 2 })
      expect(datum.$values).not.toBe(before)
      expect(before.a).toBe(beforeA)
      expect(before.a).toEqual({ b: 1, c: 2 })
      expect(datum.$values.keep).toBe(before.keep)
    })

    it('set(object) should not pollute the old tree', () => {
      const datum = new Datum.Form({ immutable: true })
      datum.setValue({ a: 1, b: 2, keep: { x: 1 } })
      const before = datum.$values

      datum.set({ a: 10, b: 20 })

      expect(datum.get('a')).toBe(10)
      expect(datum.get('b')).toBe(20)
      expect(datum.$values).not.toBe(before)
      expect(before.a).toBe(1)
      expect(before.b).toBe(2)
      expect(datum.$values.keep).toBe(before.keep)
    })

    it('insert should still create the branch when the value is missing', () => {
      const datum = new Datum.Form({ immutable: true })
      datum.setValue({})

      datum.insert('list', 0, { a: 1 })

      expect(datum.get('list')).toEqual([{ a: 1 }])
    })

    it('insert should still notify onChange', () => {
      const mockOnChange = jest.fn()
      const datum = buildDatum({ immutable: true, onChange: mockOnChange })

      datum.insert('list', 1, { a: 9 })

      expect(mockOnChange).toHaveBeenCalled()
      expect(mockOnChange.mock.calls[0][0].list).toEqual([{ a: 1 }, { a: 9 }, { a: 2 }, { a: 3 }])
    })

    it('splice should still notify onChange', () => {
      const mockOnChange = jest.fn()
      const datum = buildDatum({ immutable: true, onChange: mockOnChange })

      datum.splice('list', 0)

      expect(mockOnChange).toHaveBeenCalled()
      expect(mockOnChange.mock.calls[0][0].list).toEqual([{ a: 2 }, { a: 3 }])
    })

    it('unbind should remove the value immutably', () => {
      const datum = new Datum.Form({ immutable: true })
      datum.setValue({ a: { b: 1 }, keep: 1 })
      const validate = () => Promise.resolve(true)
      datum.bind('a.b', () => {}, undefined, validate)
      const before = datum.$values

      datum.unbind('a.b')

      expect(datum.get('a.b')).toBe(undefined)
      expect(datum.$values).not.toBe(before)
      expect(before.a.b).toBe(1)
      expect(datum.$values.keep).toBe(before.keep)
    })

    it('should leave the target alone when removing a path that does not exist', () => {
      const datum = buildDatum({ immutable: true })
      const before = datum.$values

      datum.remove('not.exist')

      // 路径不存在时 remove 不改动任何东西，$values 保持同一引用
      expect(datum.$values).toBe(before)
    })
  })

  describe('immutable=false', () => {
    it('insert should keep mutating in place', () => {
      const datum = buildDatum({ immutable: false })
      const before = datum.$values
      const beforeList = before.list

      datum.insert('list', 1, { a: 9 })

      expect(datum.$values).toBe(before)
      expect(datum.$values.list).toBe(beforeList)
      expect(beforeList).toEqual([{ a: 1 }, { a: 9 }, { a: 2 }, { a: 3 }])
    })

    it('splice should keep mutating in place', () => {
      const datum = buildDatum({ immutable: false })
      const before = datum.$values
      const beforeList = before.list

      datum.splice('list', 1)

      expect(datum.$values).toBe(before)
      expect(datum.$values.list).toBe(beforeList)
      expect(beforeList).toEqual([{ a: 1 }, { a: 3 }])
    })

    it('set(object) should keep mutating in place', () => {
      const datum = new Datum.Form({ immutable: false })
      datum.setValue({ a: 1, b: 2 })
      const before = datum.$values

      datum.set({ a: 10, b: 20 })

      expect(datum.$values).toBe(before)
      expect(datum.get('a')).toBe(10)
    })

    it('remove should keep mutating in place', () => {
      const datum = new Datum.Form({ immutable: false })
      datum.setValue({ a: { b: 1, c: 2 } })
      const before = datum.$values
      const beforeA = before.a

      datum.remove('a.b')

      expect(datum.$values).toBe(before)
      expect(datum.$values.a).toBe(beforeA)
      expect(datum.get('a')).toEqual({ c: 2 })
    })
  })
})
