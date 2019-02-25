import * as is from '../../src/utils/is'
import { beFalsy, beTruthy} from '../utils'

describe('is.js[isArray]', () => {
  test('should return true if array', () => {
    expect(is.isArray([])).toBeTruthy()
    // eslint-disable-next-line
    expect(is.isArray(new Array())).toBeTruthy()
  })
  test('should return false if not array/array like', () => {
    const test = [new Set(), new Date(), { length: 1 }]
    test.forEach(value => {
      expect(is.isArray(value)).toBeFalsy()
    })
  })
})

describe('is.js[isUndef-isNotUndef]', () => {
  test('should return true if a undefined', () => {
    const test = [null, undefined]
    test.forEach(value => {
      expect(is.isUndef(value)).toBeTruthy()
      expect(is.isNotUndef(value)).toBeFalsy()
    })
  })
  test('should return false if a false like', () => {
    const test = [false, Object.create(null), 0, '']
    test.forEach(value => {
      expect(is.isUndef(value)).toBeFalsy()
      expect(is.isNotUndef(value)).toBeTruthy()
    })
  })
  test('should return false if a plain/refer object', () => {
    beFalsy(is.isUndef)(1)
    beFalsy(is.isUndef)({})

    beTruthy(is.isNotUndef)(1)
    beTruthy(is.isNotUndef)({})
  })
})

describe('is.js[isNan]', () => {
  test('should return true if a NaN', () => {
    expect(is.isNan(NaN)).toBeTruthy()
    expect(is.isNan(Number('a'))).toBeTruthy()
  })
  test('should return false if not a NaN', () => {
    const test = [true, false, {}, null, Number.MAX_VALUE, Number.MIN_VALUE]
    test.forEach(value => {
      expect(is.isNan(value)).toBeFalsy()
    })
  })
})

describe('is.js[isFunc]', () => {
  test('should return true if a func', () => {
    const test = [function() {}, () => {}, Date.constructor, class Test {}]
    test.forEach(value => {
      expect(is.isFunc(value)).toBeTruthy()
    })
  })
  test('should return false if not a func', () => {
    const test = [true, false, {}, null]
    test.forEach(value => {
      expect(is.isFunc(value)).toBeFalsy()
    })
  })
})

describe('is.js[isNumber]', () => {
  test('should be correct', () => {
    const test = [1, Number(1), Number.MAX_VALUE, Number.MIN_VALUE]
    test.forEach(value => {
      expect(is.isNumber(value)).toBeTruthy()
    })
    beFalsy(is.isNumber)({})
    beFalsy(is.isNumber)(null)
  })
})

describe('is.js[isObject]', () => {
  test('should be correct', () => {
    beTruthy(is.isObject)({})
    beTruthy(is.isObject)(new Date())

    const falsy = beFalsy(is.isObject)
    falsy(false)
    falsy(() => {})
    falsy(class Test {})
    falsy(null)
  })
})

describe('is.js[isString]', () => {
  test('should be correct', () => {
    beTruthy(is.isString)('')
    beTruthy(is.isString)('abc')
    const falsy = beFalsy(is.isString)
    falsy(null)
    falsy({})
    falsy(new String(''))
  })
})

describe('is.js[isDate]', () => {
  test('should be correct', () => {
    beTruthy(is.isDate)(new Date())
    beTruthy(is.isDate)(new Date('333'))
    beFalsy(is.isDate)(Date)
    beFalsy(is.isDate)('2019.1.1')
  })
})

describe('is.js[isError]', () => {
  test('should be correct', () => {
    beTruthy(is.isError)(new Error())
    beFalsy(is.isError)({})
    beFalsy(is.isError)(Error)
  })
})

describe('is.js[isRegexp]', () => {
  test('should be correct', () => {
    beTruthy(is.isRegexp)(/hello/)
    beTruthy(is.isRegexp)(new RegExp('hello'))
    beFalsy(is.isRegexp)('hello')
    beFalsy(is.isRegexp)({})
  })
})

describe('is.js[isMap-isSet]', () => {
  test('shoule be correct', () => {
    beTruthy(is.isMap)(new Map())
    beTruthy(is.isSet)(new Set())
    beFalsy(is.isSet)([])
    beFalsy(is.isMap)({})
  })
})

describe('is.js[isPromise]', () => {
  test('should be correct', () => {
    const promise = new Promise(resolve => {
      resolve(1)
    })
    expect(is.isPromise(promise)).toBeTruthy()
    expect(is.isPromise(promise.then())).toBeTruthy()
    expect(is.isPromise(Promise)).toBeFalsy()
  })
})

describe('is.js[isInPath]', () => {
  test('should be correct', () => {
    beTruthy(is.isInPath)('a', 'a.b')
    beTruthy(is.isInPath)('a', 'a[1]')
    const falsy = beFalsy(is.isInPath)
    falsy('b', 'a.c')
    falsy('', 'a.b')
    falsy('a', '')
  })
})

describe('is.js[isEmpty]', () => {
  test('should be correct', () => {
    const truthy = beTruthy(is.isEmpty)
    truthy(null)
    truthy({})
    truthy([])
    const falsy = beFalsy(is.isEmpty)
    falsy(0)
    falsy([0])
    falsy([undefined])
  })
})

describe('is.js[isMergeable]', () => {
  test('should be correct', () => {
    beTruthy(is.isMergeable)({})
    const falsy = beFalsy(is.isMergeable)
    falsy(new Date())
    falsy(null)
    falsy(1)
    falsy([])
  })
})

describe('is.js[isBuffer]', () => {
  test('should be correct', () => {
    function Fun() {}
    Fun.isBuffer = () => true
    expect(is.isBuffer(new Fun())).toBeTruthy()
    expect(is.isBuffer({})).toBeFalsy()
  })
})

describe('is.js[isOne-isPercent-isInseparable]', () => {
  test('should be correct', () => {
    beTruthy(is.isInseparable)(() => {})
    beTruthy(is.isInseparable)(new Set())
    beTruthy(is.isPercent)('100%')
    beTruthy(is.isPercent)('1%')
    expect(is.isOne(1) && is.isOne('1.0')).toBeTruthy()

    beFalsy(is.isOne)('11')
    beFalsy(is.isOne)('0')
    beFalsy(is.isPercent)('%')
    beFalsy(is.isPercent)('100')
    beFalsy(is.isPercent)('%323')
    beFalsy(is.isInseparable)({})
  })
})
