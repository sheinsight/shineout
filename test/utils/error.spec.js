import { FormError, isSameError, promiseAll } from '../../src/utils/errors'

describe('errors.js[FormError-wrapFormError-isSameError]', () => {
  test('should have FormError instance data', () => {
    const err = new FormError('error', 'name', 'value')
    expect(err.message).toBe('error')
    expect(err.name).toBe('name')
    expect(err.value).toBe('value')
  })

  // test('should wrap error if Error/[Error]', () => {
  //   console.log(wrapFormError(err) instanceof FormError)
  //   expect(wrapFormError(err) instanceof FormError).toBeTruthy()
  //   expect(wrapFormError([err, err]) instanceof Array).toBeTruthy()
  // })

  test('should return true if sameError', () => {
    const err1 = new FormError('error1')
    const err2 = new FormError('error1')
    expect(isSameError(err1, err2)).toBeTruthy()
    expect(isSameError(err1, err1)).toBeTruthy()
    err2.message = 'change_error2'
    expect(isSameError(err1, err2)).toBeFalsy()
  })
})

describe('error.js[promiseAll]', () => {
  test('should promise all promises', () => {
    const promise1 = Promise.resolve(1)
    const promise2 = 10
    const promise3 = new Promise(resolve => {
      setTimeout(() => {
        resolve(3)
      })
    })

    const promises = [promise1, promise2, promise3]
    expect(promiseAll(promises)).resolves.toBeTruthy()

    const promise4 = Promise.resolve(false)
    promises.push(promise4)
    expect(promiseAll(promises)).resolves.toBeFalsy()
  })
})
