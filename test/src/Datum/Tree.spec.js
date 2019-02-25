import Tree from '../../../src/Datum/Tree'
import { deepClone } from '../../../src/utils/clone'

describe('Datum.js[Tree]', () => {
  test('should selected while set path', () => {
    const value = [
      {
        id: 1,
        text: '1',
        children: [
          {
            id: 2,
            text: '2',
          },
          {
            id: 3,
            text: '3',
          },
        ],
      },
    ]
    const datum = new Tree({
      data: value,
      mode: 1,
    })
    datum.set('0', 1)
    expect(datum.getValue()).toEqual(['0', '0,0', '0,1'])
  })
  test('should only select parent while mode = 3', () => {
    const value = [
      {
        id: 1,
        text: '1',
        children: [
          {
            id: 2,
            text: '2',
          },
          {
            id: 3,
            text: '3',
          },
        ],
      },
    ]
    const datum = new Tree({
      data: value,
      mode: 3,
    })
    datum.set('0', 1)
    expect(datum.getValue()).toEqual(['0'])
  })
  test('should not be selected while isDisabled', () => {
    const value = [
      {
        id: 1,
        text: '1',
        children: [
          {
            id: 2,
            text: '2',
          },
          {
            id: 3,
            text: '3',
          },
        ],
      },
    ]
    const datum = new Tree({
      data: value,
      mode: 1,
      disabled: v => v.text === '3',
    })
    datum.set('0,0', 1)
    const first = datum.getValue()
    datum.set('0,1', 1)
    expect(first).toEqual(datum.getValue())
  })
  test('should get correct value while different mode', () => {
    const source = [
      {
        id: 1,
        text: '1',
        children: [
          {
            id: 2,
            text: '2',
          },
          {
            id: 3,
            text: '3',
          },
        ],
      },
    ]
    const test = [
      {
        set: ['0,0', '0,1'],
        res: ['0,0', '0', '0,1'],
      },
      {
        set: ['0,0'],
        res: ['0,0', '0'],
      },
      {
        set: ['0,0', '0,1'],
        res: ['0,0', '0,1'],
      },
      {
        set: ['0,0', '0,1'],
        res: ['0'],
      },
    ]
    test.forEach((value, index) => {
      const datum = new Tree({
        data: deepClone(source),
        mode: index,
      })
      test[index].set.forEach(v => {
        datum.set(v, 1)
      })
      expect(datum.getValue()).toEqual(test[index].res)
    })
  })
  test('should emit event while bind', () => {
    const value = [
      {
        id: 1,
        text: '1',
        children: [
          {
            id: 2,
            text: '2',
          },
          {
            id: 3,
            text: '3',
          },
        ],
      },
    ]
    const datum = new Tree({
      data: value,
    })
    const mockFn = jest.fn()
    datum.bind('0,0', mockFn)
    datum.set('0,0', 1)
    expect(mockFn.mock.calls.length).toBe(1)
    datum.unbind('0,0')
    datum.set('0,0', 0)
    expect(mockFn.mock.calls.length).toBe(1)
  })
})
