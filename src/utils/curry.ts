const _curry = (fn: Function) => {
  const curried = function(...t: any[]) {
    return t.length >= fn.length
      ? fn.call(this, ...t)
      : curried.bind(this, ...t)
  }
  return curried
}

// Types
export type CurriedFunction2<P0, P1, R> = {
  (p0: P0): {(p1: P1): R}
  (p0: P0, p1: P1): R
}

export type CurriedFunction3<P0, P1, P2, R> = {
  (p0: P0, p1: P1, p2: P2): R
  (p0: P0, p1: P1): {(p2: P2): R}
  (p0: P0): CurriedFunction2<P1, P2, R>
}

export type CurriedFunction4<P0, P1, P2, P3, R> = {
  (p0: P0, p1: P1, p2: P2, p3: P3): R
  (p0: P0, p1: P1, p2: P2): {(p3: P3): R}
  (p0: P0, p1: P1): CurriedFunction2<P2, P3, R>
  (p0: P0): CurriedFunction3<P1, P2, P3, R>
}

// Functions
export function curry2<P0, P1, R>(
  fn: (p0: P0, p1: P1) => R
): CurriedFunction2<P0, P1, R> {
  return _curry(fn)
}

export function curry3<P0, P1, P2, R>(
  fn: (p0: P0, p1: P1, p2: P2) => R
): CurriedFunction3<P0, P1, P2, R> {
  return _curry(fn)
}

export function curry4<P0, P1, P2, P3, R>(
  fn: (p0: P0, p1: P1, p2: P2, p3: P3) => R
): CurriedFunction4<P0, P1, P2, P3, R> {
  return _curry(fn)
}
