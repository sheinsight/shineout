import { color, style } from '../../src/utils/expose'

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
      'so-expose-primary-color',
      'so-expose-warning-color',
      'so-expose-success-color',
      'so-expose-danger-color',
      'so-expose-secondary-color',
      'so-expose-primary-background',
      'so-expose-warning-background',
      'so-expose-success-background',
      'so-expose-danger-background',
      'so-expose-secondary-background',
      'so-expose-primary-border',
      'so-expose-warning-border',
      'so-expose-success-border',
      'so-expose-danger-border',
      'so-expose-secondary-border',
    ]
    data.map((input, index) => expect(style.getClassname(input)).toBe(output[index]))
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
      'so-expose-primary-color so-expose-danger-border so-expose-secondary-background',
      'so-expose-danger-color so-expose-warning-border so-expose-primary-background',
    ]
    data.map((input, index) => expect(style.getClassname(input)).toBe(output[index]))
  })
  test('should return a empty string while not a json', () => {
    ;[1, false, true, 'test'].map(v => expect(style.getClassname(v)).toBe(''))
  })
  test('should return a empty string while not in appoint', () => {
    ;[{ color: 'hello' }, { test: 'primary' }, { test: 'test' }].map(v => expect(style.getClassname(v)).toBe(''))
  })
})

describe('expose[getColor]', () => {
  const colorConfig = { borderColor: '#fff' }
  const types = ['primary', 'warning', 'danger', 'success', 'secondary']
  beforeAll(() => {
    window.getComputedStyle = () => colorConfig
  })
  test('should return color in types', () => {
    types.forEach(type => {
      expect(color[type]).toBe(colorConfig.borderColor)
    })
  })
})
