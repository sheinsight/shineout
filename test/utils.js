export function isInstance(instance, constructor) {
  return Object.getPrototypeOf(instance) === constructor.prototype
}

export function sleep(duration = 300) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
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
