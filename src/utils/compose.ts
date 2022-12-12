// type Fn<V, R> = (x: V) => R
// // @ts-expect-error T is an array :troll:
// type Q<T, V> = (...args: T) => V
//
// export function compose<T, V0, V1>(fn1: Fn<V0, V1>, fn0: Q<T, V0>): Q<T, V1>
// export function compose<T, V0, V1, V2>(fn2: Fn<V1, V2>, fn1: Fn<V0, V1>, fn0: Q<T, V0>): Q<T, V2>
// export function compose<T, V0, V1, V2, V3>(fn3: Fn<V2, V3>, fn2: Fn<V1, V2>, fn1: Fn<V0, V1>, fn0: Q<T, V0>): Q<T, V3>
// export function compose<T, V0, V1, V2, V3, V4>(
//   fn4: Fn<V3, V4>,
//   fn3: Fn<V2, V3>,
//   fn2: Fn<V1, V2>,
//   fn1: Fn<V0, V1>,
//   fn0: Q<T, V0>
// ): Q<T, V4>
// export function compose<T, V0, V1, V2, V3, V4, V5>(
//   fn5: Fn<V4, V5>,
//   fn4: Fn<V3, V4>,
//   fn3: Fn<V2, V3>,
//   fn2: Fn<V1, V2>,
//   fn1: Fn<V0, V1>,
//   fn0: Q<T, V0>
// ): Q<T, V5>
// export function compose<T, V0, V1, V2, V3, V4, V5, V6>(
//   fn6: Fn<V5, V6>,
//   fn5: Fn<V4, V5>,
//   fn4: Fn<V3, V4>,
//   fn3: Fn<V2, V3>,
//   fn2: Fn<V1, V2>,
//   fn1: Fn<V0, V1>,
//   fn0: Q<T, V0>
// ): Q<T, V6>
// export function compose<T, V0, V1, V2, V3, V4, V5, V6, V7>(
//   fn7: Fn<V6, V7>,
//   fn6: Fn<V5, V6>,
//   fn5: Fn<V4, V5>,
//   fn4: Fn<V3, V4>,
//   fn3: Fn<V2, V3>,
//   fn2: Fn<V1, V2>,
//   fn1: Fn<V0, V1>,
//   fn0: Q<T, V0>
// ): Q<T, V7>
// export function compose<T, V0, V1, V2, V3, V4, V5, V6, V7, V8>(
//   fn8: Fn<V7, V8>,
//   fn7: Fn<V6, V7>,
//   fn6: Fn<V5, V6>,
//   fn5: Fn<V4, V5>,
//   fn4: Fn<V3, V4>,
//   fn3: Fn<V2, V3>,
//   fn2: Fn<V1, V2>,
//   fn1: Fn<V0, V1>,
//   fn0: Q<T, V0>
// ): Q<T, V8>
// export function compose<T, V0, V1, V2, V3, V4, V5, V6, V7, V8, V9>(
//   fn9: Fn<V8, V9>,
//   fn8: Fn<V7, V8>,
//   fn7: Fn<V6, V7>,
//   fn6: Fn<V5, V6>,
//   fn5: Fn<V4, V5>,
//   fn4: Fn<V3, V4>,
//   fn3: Fn<V2, V3>,
//   fn2: Fn<V1, V2>,
//   fn1: Fn<V0, V1>,
//   fn0: Q<T, V0>
// ): Q<T, V9>
// export function compose<T, V0, V1, V2, V3, V4, V5, V6, V7, V8, V9, V10>(
//   fn10: Fn<V9, V10>,
//   fn9: Fn<V8, V9>,
//   fn8: Fn<V7, V8>,
//   fn7: Fn<V6, V7>,
//   fn6: Fn<V5, V6>,
//   fn5: Fn<V4, V5>,
//   fn4: Fn<V3, V4>,
//   fn3: Fn<V2, V3>,
//   fn2: Fn<V1, V2>,
//   fn1: Fn<V0, V1>,
//   fn0: Q<T, V0>
// ): Q<T, V10>

export function compose(...funcs: any) {
  if (funcs.length === 0) {
    return (arg: any) => arg
  }
  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args: typeof last) => rest.reduceRight((composed: any, f: any) => f(composed), last(...args))
}
