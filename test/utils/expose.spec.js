import { getClassname, getColor } from '../../src/utils/expose'

describe('expose[getClassname]', () => {
  test('should joint correct', () => {
    const data = [
      { color: 'primary' },
      { color: 'warning' },
      { color: 'success' },
      { color: 'danger' },
      { color: 'secondary' },
      { background: 'primary' },
      { background: 'warning' },
      { background: 'success' },
      { background: 'danger' },
      { background: 'secondary' },
      { border: 'primary' },
      { border: 'warning' },
      { border: 'success' },
      { border: 'danger' },
      { border: 'secondary' },
    ]
    const output = [
      'so-primary-color',
      'so-warning-color',
      'so-success-color',
      'so-danger-color',
      'so-secondary-color',
      'so-primary-background',
      'so-warning-background',
      'so-success-background',
      'so-danger-background',
      'so-secondary-background',
      'so-primary-border',
      'so-warning-border',
      'so-success-border',
      'so-danger-border',
      'so-secondary-border',
    ]
    data.map((input, index) => expect(getClassname(input)).toBe(output[index]))
  })
  test('should joint correct at least one data', () => {
    const data = [
      {
        color: 'primary',
        border: 'danger',
        background: 'secondary',
      },
      {
        color: 'danger',
        border: 'warning',
        background: 'primary',
      },
    ]
    const output = [
      'so-primary-color so-danger-border so-secondary-background',
      'so-danger-color so-warning-border so-primary-background',
    ]
    data.map((input, index) => expect(getClassname(input)).toBe(output[index]))
  })
  test('should return a empty string while not a json', () => {
    ;[1, false, true, 'test'].map(v => expect(getClassname(v)).toBe(''))
  })
  test('should return a empty string while not in appoint', () => {
    ;[{ color: 'hello' }, { test: 'primary' }, { test: 'test' }].map(v => expect(getClassname(v)).toBe(''))
  })
})

describe('expose[getColor]', () => {
  const color = { borderColor: '#fff' }
  const types = ['primary', 'warning', 'danger', 'success', 'secondary']
  beforeAll(() => {
    window.getComputedStyle = () => color
  })
  test('should return color in types', () => {
    types.forEach(type => {
      expect(getColor(type)).toBe(color.borderColor)
    })
  })
  test('should get empty string while not in types', () => {
    expect(getColor('test')).toBe('')
  })
})
