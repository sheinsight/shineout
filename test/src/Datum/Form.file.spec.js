import Datum from '../../../src/Datum'

describe('Form with File in value', () => {
  it('should setValue/getValue with File without error', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    const data = {
      name: 'hello',
      age: 18,
      file,
    }

    const datum = new Datum.Form()
    // setValue 不应报错
    expect(() => datum.setValue(data)).not.toThrow()
    // getValue 不应报错
    const result = datum.getValue()

    // file 字段应保持为同一个 File 实例
    expect(result.file).toBe(file)
    expect(result.file instanceof File).toBe(true)
    expect(result.file.name).toBe('test.txt')
    expect(result.file.type).toBe('text/plain')
    expect(result.file.size).toBe(7) // 'content'.length

    // 其他字段正常深克隆
    expect(result.name).toBe('hello')
    expect(result.age).toBe(18)
    expect(result).not.toBe(data)
  })

  it('should preserve File after set single field', () => {
    const file = new File(['img'], 'photo.png', { type: 'image/png' })
    const data = { name: 'test', file }

    const mockSetter = jest.fn()
    const datum = new Datum.Form({ onChange: mockSetter })
    datum.setValue(data)

    // 通过 set 修改其他字段
    datum.set('name', 'updated')

    // onChange 回调中的值应保持 file 引用
    const changed = mockSetter.mock.calls[0][0]
    expect(changed.file).toBe(file)
    expect(changed.file.name).toBe('photo.png')
    expect(changed.name).toBe('updated')
  })

  it('should preserve File through multiple getValue calls', () => {
    const file = new File(['data'], 'doc.pdf', { type: 'application/pdf' })
    const datum = new Datum.Form()
    datum.setValue({ file, title: 'report' })

    const val1 = datum.getValue()
    const val2 = datum.getValue()

    // 每次 getValue 返回不同对象，但 file 始终是同一引用
    expect(val1).not.toBe(val2)
    expect(val1.file).toBe(file)
    expect(val2.file).toBe(file)
    expect(val1.file).toBe(val2.file)
  })

  it('should handle multiple Files in array field', () => {
    const file1 = new File(['a'], '1.txt', { type: 'text/plain' })
    const file2 = new File(['b'], '2.txt', { type: 'text/plain' })
    const data = { files: [file1, file2], desc: 'batch upload' }

    const datum = new Datum.Form()
    datum.setValue(data)
    const result = datum.getValue()

    expect(result.files[0]).toBe(file1)
    expect(result.files[1]).toBe(file2)
    expect(result.files).not.toBe(data.files) // 数组本身被克隆
    expect(result.desc).toBe('batch upload')
  })

  it('should not break deepEqual check with File', () => {
    const file = new File(['x'], 'x.bin', { type: 'application/octet-stream' })
    const data = { file, count: 1 }

    const datum = new Datum.Form()
    datum.setValue(data)

    const valueBefore = datum.getValue()

    // 再次 setValue 相同内容，deepEqual 应判定相等，$values 不变
    datum.setValue({ file, count: 1 })
    const valueAfterSame = datum.getValue()
    // deepEqual 判定相等时 $values 不重新赋值，引用不变
    expect(valueAfterSame).toEqual(valueBefore)

    // 修改非 file 字段，应更新
    datum.setValue({ file, count: 2 })
    const valueAfterDiff = datum.getValue()
    expect(valueAfterDiff.count).toBe(2)
    expect(valueAfterDiff.file).toBe(file)
  })
})
