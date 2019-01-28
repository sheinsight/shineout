import Datum from '../../../src/Datum/index'

describe('Datum.js[List]', () => {
  test('should return assign key while use format', () => {
    // format single value
    const datum = new Datum.List({
      format: v => v.name,
    })
    datum.add({ id: 1, name: 'red' })
    expect(datum.getValue()).toEqual(['red'])
    // format complex value
    const datum1 = new Datum.List({
      format: v => `${v.id}-${v.name}`,
    })
    datum1.add({ id: 1, name: 'red' })
    expect(datum1.getValue()).toEqual(['1-red'])
  })
  test('should call change in while set datum', () => {
    const mockFn = jest.fn()
    const datum = new Datum.List({
      onChange: mockFn,
    })
    // add value
    datum.add({ id: 1, name: 'red' })
    expect(mockFn.mock.calls.length).toBe(1)
    expect(mockFn.mock.calls[0][0]).toEqual([{ id: 1, name: 'red' }])
    // expect(mockFn)
    // reset value
    datum.setValue([{ id: 1, name: 'blue' }])
    expect(mockFn.mock.calls.length).toBe(2)
    expect(mockFn.mock.calls[1][0]).toEqual([{ id: 1, name: 'blue' }])
  })
  test('should separation while have separator', () => {
    const datum = new Datum.List({
      value: ['hello'],
      separator: '|',
    })
    datum.add('world')
    expect(datum.getValue()).toEqual('hello|world')
    datum.remove('hello')
    expect(datum.getValue()).toEqual('world')
  })
  test('should ignore item while disable', () => {
    const datum = new Datum.List({
      disabled: v => v.indexOf('shineout') !== -1,
    })
    datum.add('shineout')
    expect(datum.getValue().length).toBe(0)
    datum.add('hello')
    expect(datum.getValue()).toEqual(['hello'])
  })
  test('should remove all values while clear', () => {
    const datum = new Datum.List({
      value: [1, 2],
    })
    expect(datum.getValue()).toEqual([1, 2])
    datum.add(3)
    datum.clear()
    expect(datum.getValue()).toEqual([])
  })
  test('should return length', () => {
    const datum = new Datum.List({
      value: [1, 2],
    })
    expect(datum.length).toBe(2)
    datum.add(3)
    expect(datum.length).toBe(3)
  })
  test('should effect while use setDisabled', () => {
    const datum = new Datum.List({
      value: [1, 2],
    })
    datum.setDisabled(v => v === 2)
    datum.remove(2)
    expect(datum.getValue()).toEqual([1, 2])
  })
})
