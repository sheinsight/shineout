export class FormError extends Error {
  value: any

  constructor(message: string, name?: string, value?: any) {
    super()
    this.message = message
    this.name = name || ''
    this.value = value
  }
}

export function wrapFormError<T>(error: T): T
export function wrapFormError(error: Error): FormError
export function wrapFormError(error: Error[]): FormError[]
export function wrapFormError(error: Error | Error[] | boolean) {
  if (error instanceof Error) {
    return new FormError(error.message)
  }
  if (Array.isArray(error)) {
    return error.map(e => wrapFormError(e))
  }
  return error
}

export const promiseAll = (ops: Promise<any>[], isForm = true) =>
  new Promise((resolve, reject) => {
    Promise.all(ops)
      .then(res => {
        const error = res.find(r => r !== true)
        if (error) reject(error)
        else resolve(true)
      })
      .catch(e => {
        reject(isForm ? wrapFormError(e) : e)
      })
  })

export const isSameError = (a: unknown, b: unknown) => {
  if (a === b) return true
  if (a instanceof Error && b instanceof Error) {
    return a.message === b.message
  }
  return a === b
}
