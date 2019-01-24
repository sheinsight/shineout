import normalizeWheel from '../../../src/utils/dom/normalizeWheel'

describe('normalizeWheel.js[normalizeWheel]', () => {
  test('should return correct if event ok', () => {
    const event = {
      wheelDeltaY: 240,
    }
    expect(normalizeWheel(event).spinY).toBe(-2)
    event.deltaY = 1000
    expect(normalizeWheel(event).pixelY).toBe(1000)
  })
})
