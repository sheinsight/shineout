import type from '../../../src/utils/validate/type'

describe('type.js[type]', () => {
  test('should return true while value match type', () => {
    const mockFn = jest.fn()
    // email validate
    let typeValidate = type('email', '')
    typeValidate('hello@qq.com', undefined, mockFn)
    expect(mockFn.mock.calls[0][0]).toBe(true)
    // integer validate
    typeValidate = type('integer', '')
    typeValidate('23234', undefined, mockFn)
    expect(mockFn.mock.calls[1][0]).toBe(true)
    // number
    typeValidate = type('number', '')
    typeValidate('1.2e4', undefined, mockFn)
    expect(mockFn.mock.calls[2][0]).toBe(true)
    // number -
    typeValidate = type('number', '')
    typeValidate('-023', undefined, mockFn)
    expect(mockFn.mock.calls[3][0]).toBe(true)
    // tel
    typeValidate = type('tel', '')
    typeValidate('025-86188611', undefined, mockFn)
    expect(mockFn.mock.calls[4][0]).toBe(true)
    // hex
    type('hex', '')('#ff23fa', undefined, mockFn)
    expect(mockFn.mock.calls[5][0]).toBe(true)
    // rgb
    type('rgb', '')('rgb(244,214,245)', undefined, mockFn)
    expect(mockFn.mock.calls[6][0]).toBe(true)
    // rgba
    type('rgba', '')('rgba(244,255,254,0.8)', undefined, mockFn)
    expect(mockFn.mock.calls[7][0]).toBe(true)
    // ipv4
    type('ipv4', '')('192.168.1.1', undefined, mockFn)
    expect(mockFn.mock.calls[8][0]).toBe(true)
    // ipv4 loop
    type('ipv4', '')('127.0.0.1', undefined, mockFn)
    expect(mockFn.mock.calls[9][0]).toBe(true)
    // url
    type('url', '')('https://www.google.com', undefined, mockFn)
    expect(mockFn.mock.calls[10][0]).toBe(true)
    // url
    type('url', '')('http://192.168.1.1:8080/index', undefined, mockFn)
    expect(mockFn.mock.calls[11][0]).toBe(true)
    // json
    type('json', '')('{"a":1}', undefined, mockFn)
    expect(mockFn.mock.calls[12][0]).toBe(true)
  })
  test('should get error while value not match type', () => {
    const mockFn = jest.fn()
    // email validate
    let typeValidate = type('email', '')
    typeValidate('helloqq.com', undefined, mockFn)
    expect(mockFn.mock.calls[0][0] instanceof Error).toBeTruthy()
    // integer validate
    typeValidate = type('integer', '')
    typeValidate('2323-4', undefined, mockFn)
    expect(mockFn.mock.calls[1][0] instanceof Error).toBeTruthy()
    // number
    typeValidate = type('number', '')
    typeValidate('1.2eab4', undefined, mockFn)
    expect(mockFn.mock.calls[2][0] instanceof Error).toBeTruthy()
    // number -
    typeValidate = type('number', '')
    typeValidate('-0+23', undefined, mockFn)
    expect(mockFn.mock.calls[3][0] instanceof Error).toBeTruthy()
    // tel
    typeValidate = type('tel', '')
    typeValidate('025-@86188611', undefined, mockFn)
    expect(mockFn.mock.calls[4][0] instanceof Error).toBeTruthy()
    // hex
    type('hex', '')('#xxxxxx', undefined, mockFn)
    expect(mockFn.mock.calls[5][0] instanceof Error).toBeTruthy()
    // rgb
    type('rgb', '')('rgb(284,214,245)', undefined, mockFn)
    expect(mockFn.mock.calls[6][0] instanceof Error).toBeTruthy()
    // rgba
    type('rgba', '')('rgba(244,255,254,255)', undefined, mockFn)
    expect(mockFn.mock.calls[7][0] instanceof Error).toBeTruthy()
    // ipv4
    type('ipv4', '')('192.168.1.1.1', undefined, mockFn)
    expect(mockFn.mock.calls[8][0] instanceof Error).toBeTruthy()
    // url
    type('url', '')('hello://localhost', undefined, mockFn)
    expect(mockFn.mock.calls[9][0] instanceof Error).toBeTruthy()
  })
  test('should get error while not a json string', () => {
    const mockFn = jest.fn()
    type('json', '')('{abc', undefined, mockFn)
    expect(mockFn.mock.calls[0][0] instanceof Error).toBeTruthy()
  })
})
