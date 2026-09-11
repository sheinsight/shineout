import Datum from '../../../src/Datum'

describe('Form deepClone option', () => {
  describe('deepClone=true (default)', () => {
    it('should deep clone value in getValue by default', () => {
      const data = { name: 'hello', nested: { age: 18 } }
      const datum = new Datum.Form()
      datum.setValue(data)

      const result = datum.getValue()
      expect(result).toEqual(data)
      expect(result).not.toBe(datum.$values)
      expect(result.nested).not.toBe(datum.$values.nested)
    })

    it('should deep clone value in setValue by default', () => {
      const data = { name: 'hello', nested: { age: 18 } }
      const datum = new Datum.Form()
      datum.setValue(data)

      expect(datum.$values).not.toBe(data)
      expect(datum.$values.nested).not.toBe(data.nested)
      expect(datum.$values).toEqual(data)
    })
  })

  describe('deepClone=false (shallow clone)', () => {
    it('should return a new top-level reference from getValue', () => {
      const data = { name: 'hello', nested: { age: 18 } }
      const datum = new Datum.Form({ deepClone: false })
      datum.setValue(data)

      const result = datum.getValue()
      // 浅拷贝：顶层是新引用
      expect(result).not.toBe(datum.$values)
      // 嵌套对象共享引用
      expect(result.nested).toBe(datum.$values.nested)
      // 值相等
      expect(result).toEqual(data)
    })

    it('should skip setValue via deepEqual when receiving shallow copy from getValue', () => {
      const datum = new Datum.Form({ deepClone: false })
      datum.setValue({ name: 'hello', count: 1 })

      const valueFromGetValue = datum.getValue()
      const prevValues = datum.$values

      // 受控模式回传浅拷贝，deepEqual O(顶层key数) 判定相等，$values 不替换
      datum.setValue(valueFromGetValue)
      expect(datum.$values).toBe(prevValues)
    })

    it('should work with onChange callback in controlled mode', () => {
      const mockOnChange = jest.fn()
      const datum = new Datum.Form({ deepClone: false, onChange: mockOnChange })
      const data = { name: 'test', count: 0 }
      datum.setValue(data)

      datum.set('name', 'updated')

      expect(mockOnChange).toHaveBeenCalled()
      const changedValue = mockOnChange.mock.calls[0][0]
      // onChange 返回浅拷贝，是新引用
      expect(changedValue).not.toBe(datum.$values)
      expect(changedValue.name).toBe('updated')
    })

    it('should work with get/set operations', () => {
      const datum = new Datum.Form({ deepClone: false })
      datum.setValue({ name: 'hello', count: 1 })

      expect(datum.get('name')).toBe('hello')
      expect(datum.get('count')).toBe(1)

      datum.set('name', 'world')
      expect(datum.get('name')).toBe('world')
    })

    it('should work with nested values', () => {
      const datum = new Datum.Form({ deepClone: false })
      const data = {
        user: { name: 'test', address: { city: 'Shanghai' } },
        tags: ['a', 'b'],
      }
      datum.setValue(data)

      expect(datum.get('user.address.city')).toBe('Shanghai')
    })

    it('should still accept truly new values in setValue', () => {
      const datum = new Datum.Form({ deepClone: false })
      datum.setValue({ name: 'old' })

      // getValue 一次
      datum.getValue()

      // 传入完全不同的新值，应正常更新
      datum.setValue({ name: 'new' }, undefined, true)
      expect(datum.get('name')).toBe('new')
    })
  })
})
