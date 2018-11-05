const { hasOwnProperty } = Object.prototype

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  }
  // eslint-disable-next-line
  return x !== x && y !== y
}

export default function (objA, objB) {
  if (is(objA, objB)) {
    return true
  }

  if (typeof objA !== 'object' || objA === null
      || typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i])
      || !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false
    }
  }

  return true
}
