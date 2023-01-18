import Datum from '../../../src/Datum'
import { deepClone } from '../../../src/utils/clone'

describe('Datum[Form.js]', () => {
  test('should get/set in a Datum.Form', () => {
    const datum = new Datum.Form()
    const data = {
      a: 1,
      b: { c: 'hello' },
      d: [1, 2, 3],
      e: 'world',
    }
    // set/get value
    datum.setValue(data)
    expect(datum.getValue()).toEqual(data)
    // set key
    datum.set('b.c', 'hello1')
    expect(datum.get('b.c')).toBe('hello1')
    // set arr
    datum.set('d[0]', 2)
    expect(datum.get('d[0]')).toBe(2)
  })
  test('should call change in while set datum', () => {
    const data = {
      a: 1,
      b: { c: 'hello' },
      d: [1, 2, 3],
      e: 'world',
    }
    const mockFn = jest.fn()
    const datum = new Datum.Form({
      onChange: mockFn,
      value: data,
    })
    datum.set('a', 2)
    expect(mockFn.mock.calls.length).toBe(1)
    expect(mockFn.mock.calls[0][0]).toEqual({ ...data, a: 2 })
  })
  test('should validate error while did not match rule', () => {
    const datum = new Datum.Form()

    const mockSetter = jest.fn()
    datum.bind(
      'age',
      mockSetter,
      -1,
      age =>
        new Promise((resolve, reject) => {
          if (age > 0 && age < 100) resolve(true)
          reject(new Error('age error'))
        })
    )
    return expect(datum.validate()).rejects.toBeTruthy()
  })
  test('should validate success while match rule', () => {
    const datum = new Datum.Form()

    const mockSetter = jest.fn()
    datum.bind(
      'age',
      mockSetter,
      10,
      age =>
        new Promise((resolve, reject) => {
          if (age > 0 && age < 100) resolve(true)
          reject(new Error('age error'))
        })
    )
    return expect(datum.validate()).resolves.toBeTruthy()
  })
  test('should empty while reset', () => {
    const data = {
      a: 1,
      b: { c: 'hello' },
      d: [1, 2, 3],
      e: 'world',
    }
    const datum = new Datum.Form({
      value: data,
    })
    datum.reset()
    expect(datum.getValue()).toEqual({})
  })
  test('should react while splice/insert', () => {
    const data = {
      a: 1,
      b: { c: 'hello' },
      d: [1, 2, 3],
      e: 'world',
    }
    const datum0 = new Datum.Form({
      value: deepClone(data),
    })
    datum0.insert('d', 0, 0)
    expect(datum0.getValue().d).toEqual([0, 1, 2, 3])

    datum0.splice('d', 0)
    expect(datum0.getValue().d).toEqual([1, 2, 3])
  })
  test('should clone while getValue', () => {
    const data = {
      a: 1,
      b: { c: 'hello' },
      d: [1, 2, 3],
      e: 'world',
    }
    const datum = new Datum.Form({
      value: data,
    })
    expect(datum.getValue()).not.toBe(data)
    expect(datum.getValue()).toEqual(data)
  })
  test('should transform auto while set object', () => {
    const data = {
      a: 1,
      b: { c: 'hello' },
      d: [1, 2, 3],
      e: 'world',
    }
    const datum = new Datum.Form({
      value: data,
    })
    datum.set({ b: { c: 'world' } })
    expect(datum.getValue().b.c).toBe('world')
  })
  test('should get values you need', () => {
    const data = {
      a: 1,
      b: { c: 'hello' },
      d: [1, 2, 3],
      e: 'world',
    }
    const datum = new Datum.Form({
      value: data,
    })
    expect(datum.get(['a', 'e'])).toEqual([1, 'world'])
    expect(datum.get('a')).toBe(1)
  })
  test('should set multiple values', () => {
    const data = {
      a: 1,
      b: { c: 'hello' },
      d: [1, 2, 3],
      e: 'world',
    }
    const datum = new Datum.Form({
      value: data,
    })
    datum.set(['a', 'b'], [2, 2])
    expect(datum.getValue()).toEqual({ ...data, a: 2, b: 2 })
  })
  test('should set/get error', () => {
    const datum = new Datum.Form()
    const callback = () => {}
    datum.setError('_test', callback)
    expect(datum.getError('_test')).toBe(callback)
  })
})
