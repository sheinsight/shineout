export class FormError extends Error {
  constructor(message, name, value) {
    super()
    this.message = message
    this.name = name
    this.value = value
  }
}

export const wrapFormError = (error) => {
  if (error instanceof Error) {
    return new FormError(error.message)
  }
  if (Array.isArray(error)) {
    return error.map(wrapFormError)
  }
  return new FormError(error)
}
