export function isInstance(instance, constructor) {
  return Object.getPrototypeOf(instance) === constructor.prototype
}

export function sleep(duration = 300) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
