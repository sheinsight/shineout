import { safeDeepClone } from '../../src/utils/clone'

describe('clone.js[safeDeepClone]', () => {
  // 基础类型
  it('should return primitives as-is', () => {
    expect(safeDeepClone(null)).toBeNull()
    expect(safeDeepClone(undefined)).toBeUndefined()
    expect(safeDeepClone(1)).toBe(1)
    expect(safeDeepClone('hello')).toBe('hello')
    expect(safeDeepClone(true)).toBe(true)
    expect(safeDeepClone(NaN)).toBeNaN()
  })

  // 纯对象深克隆
  it('should deep clone plain object', () => {
    const source = { a: 1, b: { c: 2, d: [3, 4] } }
    const result = safeDeepClone(source)
    expect(result).toEqual(source)
    expect(result).not.toBe(source)
    expect(result.b).not.toBe(source.b)
    expect(result.b.d).not.toBe(source.b.d)
  })

  // 数组深克隆
  it('should deep clone arrays', () => {
    const source = [1, { a: 2 }, [3, 4]]
    const result = safeDeepClone(source)
    expect(result).toEqual(source)
    expect(result).not.toBe(source)
    expect(result[1]).not.toBe(source[1])
    expect(result[2]).not.toBe(source[2])
  })

  // Date 克隆
  it('should clone Date objects', () => {
    const date = new Date('2024-01-01')
    const result = safeDeepClone(date)
    expect(result).toEqual(date)
    expect(result).not.toBe(date)
    expect(result.getTime()).toBe(date.getTime())
  })

  // RegExp 克隆
  it('should clone RegExp objects', () => {
    const reg = /hello/gi
    const result = safeDeepClone(reg)
    expect(result).not.toBe(reg)
    expect(result.source).toBe(reg.source)
    expect(result.flags).toBe(reg.flags)
  })

  // 核心场景：File 对象不报错，返回原引用
  it('should handle File objects without throwing', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    const source = { name: 'form', file }
    const result = safeDeepClone(source)
    expect(result).not.toBe(source)
    expect(result.file).toBe(file) // File 返回原引用，不尝试克隆
    expect(result.name).toBe('form')
  })

  it('should handle File in nested structure', () => {
    const file = new File(['data'], 'upload.png', { type: 'image/png' })
    const source = {
      user: { name: 'test' },
      uploads: [{ id: 1, file }],
    }
    const result = safeDeepClone(source)
    expect(result.uploads[0].file).toBe(file)
    expect(result.user).not.toBe(source.user)
    expect(result.uploads).not.toBe(source.uploads)
  })

  // 循环引用保护
  it('should handle circular references', () => {
    const source = { a: 1 }
    source.self = source
    const result = safeDeepClone(source)
    expect(result.a).toBe(1)
    expect(result.self).toBe(result) // 循环引用指向克隆后的对象
    expect(result).not.toBe(source)
  })

  // React Element 保护
  it('should return React elements as-is', () => {
    const element = { $$typeof: Symbol.for('react.element'), type: 'div', props: {} }
    const result = safeDeepClone(element)
    expect(result).toBe(element)
  })

  // DOM Node 保护
  it('should return DOM nodes as-is', () => {
    const node = document.createElement('div')
    const result = safeDeepClone(node)
    expect(result).toBe(node)
  })

  // 自定义 class 实例返回引用
  it('should return class instances as-is', () => {
    class MyModel {
      constructor(id) {
        this.id = id
      }
    }
    const instance = new MyModel(1)
    const source = { model: instance, name: 'test' }
    const result = safeDeepClone(source)
    expect(result.model).toBe(instance) // class 实例返回原引用
    expect(result).not.toBe(source)
    expect(result.name).toBe('test')
  })

  // 模拟 Form 实际使用场景
  it('should work with typical Form values containing File', () => {
    const file = new File(['hello'], 'doc.pdf', { type: 'application/pdf' })
    const formValues = {
      email: 'test@example.com',
      age: 18,
      address: { city: 'Shanghai', zip: '200000' },
      tags: ['a', 'b'],
      startDate: new Date('2024-06-01'),
      avatar: file,
    }
    const result = safeDeepClone(formValues)

    // 纯对象和数组被深克隆
    expect(result).not.toBe(formValues)
    expect(result.address).not.toBe(formValues.address)
    expect(result.tags).not.toBe(formValues.tags)
    expect(result.startDate).not.toBe(formValues.startDate)

    // 值相等
    expect(result.email).toBe('test@example.com')
    expect(result.age).toBe(18)
    expect(result.address).toEqual({ city: 'Shanghai', zip: '200000' })
    expect(result.tags).toEqual(['a', 'b'])
    expect(result.startDate.getTime()).toBe(formValues.startDate.getTime())

    // File 保持引用，不报错
    expect(result.avatar).toBe(file)
  })

  // Object.create(null) 对象
  it('should clone Object.create(null) objects', () => {
    const source = Object.create(null)
    source.a = 1
    source.b = { c: 2 }
    const result = safeDeepClone(source)
    expect(result.a).toBe(1)
    expect(result.b).toEqual({ c: 2 })
    expect(result.b).not.toBe(source.b)
  })
})
