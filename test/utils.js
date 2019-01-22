export function isInstance(instance, constructor) {
  return Object.getPrototypeOf(instance) === constructor.prototype
}
