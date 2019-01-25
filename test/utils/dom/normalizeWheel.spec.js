import normalizeWheel from '../../../src/utils/dom/normalizeWheel'

describe('normalizeWheel.js[normalizeWheel]', () => {
  test('should return correct if event has y', () => {
    const event = {
      wheelDeltaY: 240,
    }
    expect(normalizeWheel(event).spinY).toBe(-2)
    event.deltaY = 1000
    expect(normalizeWheel(event).pixelY).toBe(1000)
  })
  test('should return correct if event ha x', () => {
    const event = {
      wheelDeltaX: 480,
    }
    expect(normalizeWheel(event).spinX).toBe(-4)
    event.deltaX = 1000
    expect(normalizeWheel(event).pixelX).toBe(1000)
  })
  test('should return corrent if event has -y -x', () => {
    const event = {
      wheelDeltaY: -240,
      wheelDeltaX: -480,
    }
    expect(normalizeWheel(event).spinX).toBe(4)
    expect(normalizeWheel(event).spinY).toBe(2)
  })
})
