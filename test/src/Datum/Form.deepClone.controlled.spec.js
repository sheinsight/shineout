/**
 * deepClone=false 受控模式下所有外部修改 value 的场景测试
 *
 * ✅ = 行为符合预期
 * ⚠️ = 有已知限制，测试记录实际行为
 */
import Datum from '../../../src/Datum'

function makeDatum(onChange) {
  const datum = new Datum.Form({ deepClone: false, onChange })
  datum.setValue({
    name: 'Alice',
    status: 0,
    user: { name: 'Alice', age: 18, address: { city: 'Beijing', zip: '100000' } },
    tags: ['a', 'b'],
    extra: { deep: { level: 3 } },
  })
  return datum
}

// ─── ✅ 正常工作的场景 ─────────────────────────────────────────────

describe('deepClone=false 受控模式 - 正常工作的场景', () => {
  it('① 直接透传：onChange={setValue}，getValue 返回浅拷贝，setValue 快速跳过', () => {
    const datum = makeDatum(null)
    const v = datum.getValue()

    // 浅拷贝：顶层是新引用，嵌套共享
    expect(v).not.toBe(datum.$values)
    expect(v.user).toBe(datum.$values.user)

    const prevValues = datum.$values
    datum.setValue(v)
    // deepEqual 发现所有 nested ref 相同 → skip，$values 不替换
    expect(datum.$values).toBe(prevValues)
  })

  it('② 展开 + 新增顶层字段', () => {
    const onChange = jest.fn()
    const datum = makeDatum(onChange)

    const v = datum.getValue()
    datum.setValue({ ...v, extra2: 'new' })

    expect(datum.get('extra2')).toBe('new')
    expect(datum.get('name')).toBe('Alice')
  })

  it('③ 展开 + 替换顶层原始值', () => {
    const datum = makeDatum(null)
    const v = datum.getValue()
    datum.setValue({ ...v, status: 1 })

    expect(datum.get('status')).toBe(1)
  })

  it('④ 正确不可变更新：展开嵌套对象', () => {
    const datum = makeDatum(null)
    const v = datum.getValue()
    datum.setValue({ ...v, user: { ...v.user, name: 'Bob' } })

    expect(datum.get('user.name')).toBe('Bob')
    expect(datum.get('user.age')).toBe(18) // 其他字段保留
  })

  it('⑤ 正确不可变更新：展开深层嵌套对象', () => {
    const datum = makeDatum(null)
    const v = datum.getValue()
    datum.setValue({
      ...v,
      user: { ...v.user, address: { ...v.user.address, city: 'Shanghai' } },
    })

    expect(datum.get('user.address.city')).toBe('Shanghai')
    expect(datum.get('user.address.zip')).toBe('100000') // 同层其他字段保留
    expect(datum.get('user.name')).toBe('Alice') // 父级其他字段保留
  })

  it('⑧ 数组字段：展开 + 追加元素', () => {
    const datum = makeDatum(null)
    const v = datum.getValue()
    datum.setValue({ ...v, tags: [...v.tags, 'c'] })

    expect(datum.get('tags')).toEqual(['a', 'b', 'c'])
  })

  it('⑧ 数组字段：展开 + 替换某项', () => {
    const datum = makeDatum(null)
    const v = datum.getValue()
    const newTags = [...v.tags]
    newTags[0] = 'replaced'
    datum.setValue({ ...v, tags: newTags })

    expect(datum.get('tags')).toEqual(['replaced', 'b'])
  })

  it('⑩ 删除顶层字段', () => {
    const datum = makeDatum(null)
    const v = datum.getValue()
    const { status, ...rest } = v
    datum.setValue(rest)

    expect(datum.get('status')).toBeUndefined()
    expect(datum.get('name')).toBe('Alice')
  })

  it('⑫ formRef.getValue() + 正确不可变更新嵌套字段', () => {
    const datum = makeDatum(null)
    const v = datum.getValue() // 浅拷贝
    datum.setValue({ ...v, user: { ...v.user, name: 'Carol' } })

    expect(datum.get('user.name')).toBe('Carol')
  })

  it('⑫ formRef.getValue() + 正确不可变更新深层字段', () => {
    const datum = makeDatum(null)
    const v = datum.getValue()
    datum.setValue({
      ...v,
      extra: { ...v.extra, deep: { ...v.extra.deep, level: 99 } },
    })

    expect(datum.get('extra.deep.level')).toBe(99)
  })
})

// ─── ⚠️ 有限制的场景 ─────────────────────────────────────────────────

describe('deepClone=false 受控模式 - 已知限制场景', () => {
  it('⑥ ⚠️ 直接 mutate 嵌套字段后展开顶层：deepEqual 因共享引用判断为相等，setValue 跳过', () => {
    const datum = makeDatum(null)
    const prevValues = datum.$values
    const v = datum.getValue() // v.user === datum.$values.user (共享)

    // 直接修改嵌套对象（同时污染了 $values.user.name）
    v.user.name = 'MUTATED'
    datum.setValue({ ...v })

    // deepEqual({...v}, $values)：v.user === $values.user（同一引用，都是 'MUTATED'）→ true → skip
    // $values 引用不替换
    expect(datum.$values).toBe(prevValues)
    // 但 $values.user.name 已被污染
    expect(datum.$values.user.name).toBe('MUTATED')
    // 字段订阅者未收到 dispatch，依赖 pub/sub 的 Input 组件不会重渲染
  })

  it('⑦ ⚠️ 直接 mutate 深层字段后展开顶层：同样被 deepEqual 短路', () => {
    const datum = makeDatum(null)
    const prevValues = datum.$values
    const v = datum.getValue()

    // v.user.address === $values.user.address（共享）
    v.user.address.city = 'MUTATED_CITY'
    datum.setValue({ ...v })

    expect(datum.$values).toBe(prevValues)
    // 深层值已被污染
    expect(datum.$values.user.address.city).toBe('MUTATED_CITY')
  })

  it('⑨ ⚠️ 数组直接 push 后展开顶层：共享 ref，deepEqual 判断相等，setValue 跳过', () => {
    const datum = makeDatum(null)
    const prevValues = datum.$values
    const v = datum.getValue()

    // v.tags === $values.tags（共享引用）
    v.tags.push('c')
    datum.setValue({ ...v })

    expect(datum.$values).toBe(prevValues)
    // 数组已被污染
    expect(datum.$values.tags).toEqual(['a', 'b', 'c'])
  })

  it('⑬ ⚠️ formRef.getValue() 后直接 mutate 嵌套字段：同场景 ⑥', () => {
    const datum = makeDatum(null)
    const v = datum.getValue() // 浅拷贝，v.user === $values.user

    v.user.name = 'MUTATED_VIA_REF'
    datum.setValue({ ...v })

    // setValue 被 deepEqual 跳过，但 $values.user.name 已被污染
    expect(datum.$values.user.name).toBe('MUTATED_VIA_REF')
  })

  it('⑪ ⚠️ 外部 server 数据 setValue：$values 与外部对象共享引用，后续 set 会 mutate 原始对象', () => {
    const datum = makeDatum(null)
    const serverData = {
      name: 'Server',
      user: { name: 'Server User', address: { city: 'Guangzhou', zip: '510000' } },
      tags: ['x'],
    }

    datum.setValue(serverData, undefined, true) // forceSet=true 跳过 deepEqual

    // $values 与 serverData 是同一引用
    expect(datum.$values).toBe(serverData)

    // 之后通过 datum.set 修改字段，会直接 mutate serverData
    datum.set('name', 'Changed')
    expect(serverData.name).toBe('Changed') // 原始 server 数据被污染
  })
})

// ─── 与 deepClone=true 对比 ────────────────────────────────────────

describe('deepClone=false vs deepClone=true 行为对比', () => {
  it('deepClone=true 时 mutate 嵌套字段不影响 $values，setValue 能正常执行', () => {
    const datum = new Datum.Form({ deepClone: true })
    datum.setValue({
      user: { name: 'Alice', address: { city: 'Beijing' } },
    })

    const v = datum.getValue() // 深拷贝，v.user !== $values.user

    v.user.name = 'MUTATED'
    const prevValues = datum.$values
    datum.setValue({ ...v })

    // v.user 是独立对象，$values.user 不受影响
    expect(datum.$values.user.name).toBe('MUTATED')
    // deepEqual 能检测到 user.name 变化（引用不同），正常执行 setValue
    expect(datum.$values).not.toBe(prevValues)
  })

  it('deepClone=false 受控模式下 set() 正常触发 onChange', () => {
    const onChange = jest.fn()
    const datum = makeDatum(onChange)

    datum.set('name', 'Bob')

    expect(onChange).toHaveBeenCalledTimes(1)
    const called = onChange.mock.calls[0][0]
    expect(called.name).toBe('Bob')
    // onChange 收到浅拷贝，是新引用
    expect(called).not.toBe(datum.$values)
    // 但嵌套引用共享
    expect(called.user).toBe(datum.$values.user)
  })
})
