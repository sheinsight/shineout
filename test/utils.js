export function isInstance(instance, constructor) {
  return Object.getPrototypeOf(instance) === constructor.prototype
}

export function sleep(duration = 300) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

export function simulateWheel(distance) {
  // wheelDeltaX
  const wheelEvent = new UIEvent('wheel')
  wheelEvent.initUIEvent('wheel', false, true)
  wheelEvent.wheelDeltaX = distance * 120
  document.dispatchEvent(wheelEvent)
}

export function beTruthy(validate) {
  return (...args) => expect(validate(...args)).toBeTruthy()
}
export function beFalsy(validate) {
  return (...args) => expect(validate(...args)).toBeFalsy()
}
export function beEqual(process) {
  return (input, expects) => expect(process(...input)).toEqual(expects)
}

export function appendToDOM(html) {
  const dom = document.createElement('div')
  dom.innerHTML = html
  document.body.appendChild(dom)
}
