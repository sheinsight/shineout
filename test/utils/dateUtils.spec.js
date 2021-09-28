import utils from '../../src/DatePicker/utils'
import { setLocale, getLocale } from '../../src/locale'

describe('dateUtil[clearHMS]', () => {
  it('clean the hour minute seconds', () => {
    const a = new Date()
    const b = new Date(a.valueOf())
    b.setHours(0)
    b.setMinutes(0)
    b.setSeconds(0)
    b.setMilliseconds(0)
    expect(utils.clearHMS(a).valueOf()).toBe(b.valueOf())
  })
})

describe('dateUtil[addDays]', () => {
  it.each([[1], [0], [-1]])('add %i day', num => {
    const a = new Date()
    const b = new Date(a.valueOf())
    b.setDate(b.getDate() + num)
    const c = utils.addDays(a, num)
    expect(b.valueOf()).toBe(c.valueOf())
  })
})

describe('dateUtil[addMonths]', () => {
  it.each([[1], [0], [-1]])('add %i month', num => {
    const a = new Date()
    const b = new Date(a.valueOf())
    b.setMonth(b.getMonth() + num)
    const c = utils.addMonths(a, num)
    expect(b.valueOf()).toBe(c.valueOf())
  })
})

describe('dateUtil[addYears]', () => {
  it.each([[1], [0], [-1]])('add %i year', num => {
    const a = new Date()
    const b = new Date(a.valueOf())
    b.setFullYear(b.getFullYear() + num)
    const c = utils.addYears(a, num)
    expect(b.valueOf()).toBe(c.valueOf())
  })
})

describe('dateUtil[addSeconds]', () => {
  it.each([[1], [0], [-1]])('add %i seconds', num => {
    const a = new Date()
    const b = new Date(a.valueOf())
    b.setSeconds(b.getSeconds() + num)
    const c = utils.addSeconds(a, num)
    expect(b.valueOf()).toBe(c.valueOf())
  })
})

describe('dateUtil[cloneTime]', () => {
  it('clone false value  will return false', () => {
    expect(utils.cloneTime(null)).toBeNull()
  })

  it('clone invalid time to date will return date', () => {
    const date = new Date(2021, 10, 1)
    const time = '12314'
    const format = 'xxxxxxx'
    const result = new Date(2021, 10, 1)
    expect(utils.cloneTime(date, time, format).valueOf()).toBe(result.valueOf())
  })

  it('clone date time to date', () => {
    const date = new Date(2021, 10, 1)
    const time = new Date(1995, 10, 2, 14, 15, 20)
    const result = new Date(2021, 10, 1, 14, 15, 20)
    expect(utils.cloneTime(date, time).valueOf()).toBe(result.valueOf())
  })

  it('clone string time to date', () => {
    const date = new Date(2021, 10, 1)
    const time = '14:15:20'
    const format = 'HH:mm:ss'
    const result = new Date(2021, 10, 1, 14, 15, 20)
    expect(utils.cloneTime(date, time, format).valueOf()).toBe(result.valueOf())
  })
})

describe('dateUtil[compareAsc]', () => {
  it.each([
    { a: '1990-1-1', b: '1990-1-1', expected: 0 },
    { a: '1990-1-2', b: '1990-1-1', expected: 1 },
    { a: '1990-1-1', b: '1990-1-2', expected: -1 },
  ])('.compareAsc($a, $b)', ({ a, b, expected }) => {
    const dateA = new Date(...a.split('-'))
    const dateB = new Date(...b.split('-'))
    expect(utils.compareAsc(dateA, dateB)).toBe(expected)
  })
})

describe('dateUtil[compareMonth]', () => {
  it('false left date or false right date will return 0', () => {
    expect(utils.compareMonth(false)).toBe(0)
    expect(utils.compareMonth(new Date(), false)).toBe(0)
  })
  it('compare date with 0 pad', () => {
    const a = new Date(2021, 10, 1)
    const b = new Date(2021, 9, 2)
    expect(utils.compareMonth(a, a)).toBe(0)
    expect(utils.compareMonth(a, b)).toBe(1)
    expect(utils.compareMonth(b, a)).toBe(-1)
  })

  it('compare date with  pad', () => {
    const a = new Date(2021, 10, 1)
    const b = new Date(2021, 12, 2)
    expect(utils.compareMonth(a, b, -2)).toBe(0)
    expect(utils.compareMonth(a, b, -3)).toBe(1)
    expect(utils.compareMonth(a, a, 2)).toBe(-1)
  })
})

describe('dateUtil[getDaysOfMonth]', () => {
  it('weekStartsOn 1', () => {
    setLocale('zh-CN')
    expect(getLocale('startOfWeek')).toBe(1)
    const receive = utils.getDaysOfMonth(new Date(2021, 9, 1, 10))
    const start = new Date(2021, 8, 27, 10)
    expect(receive.length).toBe(42)
    receive.forEach(day => {
      expect(day.valueOf()).toBe(start.valueOf())
      start.setDate(start.getDate() + 1)
    })
  })
  it('weekStartsOn 0', () => {
    setLocale('en-US')
    expect(getLocale('startOfWeek')).toBe(0)
    const receive = utils.getDaysOfMonth(new Date(2021, 9, 1, 10))
    const start = new Date(2021, 8, 26, 10)
    expect(receive.length).toBe(42)
    receive.forEach(day => {
      expect(day.valueOf()).toBe(start.valueOf())
      start.setDate(start.getDate() + 1)
    })
  })
})

describe('dateUtil[format]', () => {
  it('format with inner format', () => {
    setLocale('zh-CN')
    const date = new Date(2021, 0, 1, 11, 11, 11)
    const data = [
      { formatter: 'yyyy-MM-dd', expected: '2021-01-01' },
      { formatter: 'HH:mm:ss', expected: '11:11:11' },
      { formatter: 'hh:mm:ss a', expected: '11:11:11 AM' },
      { formatter: 't', expected: '1609470671' },
      { formatter: 'T', expected: '1609470671000' },
      { formatter: 'RRRR II', expected: '2020 53' },
      { formatter: 'yyyy-MM', expected: '2021-01' },
      { formatter: 'yyyy-MM-dd HH:mm:ss', expected: '2021-01-01 11:11:11' },
    ]
    data.forEach(({ formatter, expected }) => {
      expect(utils.format(date, formatter)).toBe(expected)
    })
  })
  it('custom format', () => {
    const a = Symbol('custom')
    expect(utils.format(new Date(), () => a)).toBe(a)
  })
})

describe('dateUtil[isInvalid]', () => {
  it('false', () => {
    expect(utils.isInvalid(new Date())).toBeFalsy()
    expect(utils.isInvalid(1632734126272)).toBeFalsy()
  })
  it('true', () => {
    expect(utils.isInvalid('2021-10-1')).toBeTruthy()
    expect(utils.isInvalid(NaN)).toBeTruthy()
  })
})

describe('dateUtil[isSameDay]', () => {
  const a = new Date(2017, 4, 1)
  const b = new Date(2017, 4, 1)
  const c = new Date(2017, 5, 1)
  it('same', () => {
    expect(utils.isSameDay(a, b)).toBeTruthy()
  })
  it('not same', () => {
    expect(utils.isSameDay(a, c)).toBeFalsy()
  })
})

describe('dateUtil[isSameMonth]', () => {
  const a = new Date(2017, 4, 1)
  const b = new Date(2017, 4, 5)
  const c = new Date(2018, 4, 10)
  it('same', () => {
    expect(utils.isSameMonth(a, b)).toBeTruthy()
  })
  it('not same', () => {
    expect(utils.isSameMonth(a, c)).toBeFalsy()
  })
})

describe('dateUtil[isSameWeek]', () => {
  const a = new Date(2021, 8, 20)
  const b = new Date(2021, 8, 26)
  const c = new Date(2021, 8, 27)
  it('weekStartsOn 1', () => {
    expect(utils.isSameWeek(a, b, { weekStartsOn: 1 })).toBeTruthy()
    expect(utils.isSameWeek(b, c, { weekStartsOn: 1 })).toBeFalsy()
  })

  it('weekStartsOn 0', () => {
    expect(utils.isSameWeek(a, b, { weekStartsOn: 0 })).toBeFalsy()
    expect(utils.isSameWeek(b, c, { weekStartsOn: 0 })).toBeTruthy()
  })
})

describe('dateUtil[isValid]', () => {
  it('should get true when date is valid', () => {
    expect(utils.isValid(new Date(2016, 1, 6))).toBeTruthy()
    expect(utils.isValid(new Date())).toBeTruthy()
  })

  it('should get false when date is inValid', () => {
    expect(utils.isValid(new Date(''))).toBeFalsy()
    expect(utils.isValid(undefined)).toBeFalsy()
  })
})

describe('dateUtil[parse]', () => {
  it.each([
    { formatter: 'yyyy-MM-dd', value: '2021-01-01' },
    { formatter: 'HH:mm:ss', value: '11:11:11' },
    { formatter: 'hh:mm:ss a', value: '11:11:11 AM', options: { weekStartsOn: 1 } },
    { formatter: 't', value: '1609470671' },
    { formatter: 'T', value: '1609470671000' },
    { formatter: 'RRRR II', value: '2020 53' },
    { formatter: 'RRRR II', value: '2020 53' },
    { formatter: 'yyyy-MM', value: '2021-01' },
    { formatter: 'yyyy-MM-dd HH:mm:ss', value: '2021-01-01 11:11:11' },
  ])('$formatter', ({ formatter, value, options }) => {
    const date = utils.parse(value, formatter, new Date(), options)
    expect(date instanceof Date).toBeTruthy()
    expect(utils.format(date, formatter, options)).toBe(value)
  })
})

describe('dateUtil[newDate]', () => {
  it('get date without time', () => {
    const a = new Date()
    const expected = new Date(a.getFullYear(), a.getMonth(), a.getDate())
    expect(utils.newDate().valueOf()).toBe(expected.valueOf())
  })
  it('defaultDate', () => {
    const a = new Date(2021, 10, 12, 22, 22)
    const expected = new Date(a.getFullYear(), a.getMonth(), a.getDate())
    expect(utils.newDate(a).valueOf()).toBe(expected.valueOf())
  })
})

describe('dateUtil[setTime]', () => {
  it('clone time from date1 to date2 will change origin date1 and return date1', () => {
    const a = new Date(2021, 0, 1)
    const b = new Date(2021, 1, 2, 13, 14, 15)
    const c = new Date(2021, 0, 1, 13, 14, 15)
    expect(utils.setTime(a, b).valueOf()).toBe(c.valueOf())
    expect(a.valueOf()).toBe(c.valueOf())
  })
})

describe('dateUtil[toDate]', () => {
  it('string date', () => {
    expect(utils.toDate('2021-08-15 23:11:11').valueOf()).toBe(new Date(2021, 7, 15, 23, 11, 11).valueOf())
  })

  it('Date instance', () => {
    expect(utils.toDate(new Date(2021, 7, 15)).valueOf()).toBe(new Date(2021, 7, 15).valueOf())
  })
})

describe('dateUtil[toDateWithFormat]', () => {
  it('invalid Date', () => {
    expect(utils.toDateWithFormat(NaN, 'yyyy-MM-dd', null)).toBeNull()
  })
  it('string Date', () => {
    const expected = new Date(2021, 9, 1)
    expect(utils.toDateWithFormat('2021-10-01', 'yyyy-MM-dd', undefined).valueOf()).toBe(expected.valueOf())
  })
  it('of not string will return date not formatted', () => {
    const expected = new Date(2021, 9, 1, 12, 12)
    expect(utils.toDateWithFormat(expected, 'yyyy-MM-dd', undefined).valueOf()).toBe(expected.valueOf())
  })
})

describe('dateUtil[formatDateWithDefaultTime]', () => {
  it('false date', () => {
    expect(utils.formatDateWithDefaultTime(undefined)).toBe(undefined)
  })
  it('has value will return setTime(date value)', () => {
    const date = new Date()
    const value = new Date(1999, 9, 9, 9, 9, 9)
    expect(utils.formatDateWithDefaultTime(date, value).valueOf()).toBe(utils.cloneTime(date, value).valueOf())
  })
  it('if has no value and defaultTime return date', () => {
    const date = new Date()
    expect(utils.formatDateWithDefaultTime(date, null, null).valueOf()).toBe(date.valueOf())
  })
  it('if has invalid defaultTime return date', () => {
    const date = new Date()
    expect(utils.formatDateWithDefaultTime(date, null, 'hello').valueOf()).toBe(date.valueOf())
  })

  it('valid params', () => {
    const date = new Date()
    const defaultTime = '10:12:20'
    const fmt = 'yyyy-MM-dd HH:mm:ss'
    const nDate = utils.cloneTime(date, defaultTime, utils.TIME_FORMAT)
    const result = utils.format(nDate, fmt)
    expect(utils.formatDateWithDefaultTime(date, null, defaultTime, fmt)).toBe(result)
  })
})

describe('dateUtil[compareDateArray]', () => {
  it('if !arr1 return false', () => {
    expect(utils.compareDateArray()).toBe(false)
  })
  it('if !arr2 return false', () => {
    expect(utils.compareDateArray([])).toBe(false)
  })
  it('if arr1.length !== arr2.length return false', () => {
    expect(utils.compareDateArray([new Date()], [new Date(), new Date()])).toBe(false)
  })
  it('if !arr1[i] || !arr2[i] return false', () => {
    expect(utils.compareDateArray([false], [])).toBe(false)
  })
  it('if type === "week" will format(v, "RRRR II")', () => {
    const arr1 = [new Date(2021, 8, 1)]
    const arr2 = [new Date(2021, 8, 4)]
    const arr3 = [new Date(2021, 9, 4)]
    expect(utils.compareDateArray(arr1, arr2, 'week')).toBe(true)
    expect(utils.compareDateArray(arr1, arr3, 'week')).toBe(false)
  })

  it('if type !== "week will compare with getTime', () => {
    const arr1 = [new Date(2021, 8, 1, 10, 11), new Date(2021, 8, 1, 10, 12)]
    const arr2 = [new Date(2021, 8, 1, 10, 11), new Date(2021, 8, 1, 10, 12)]
    const arr3 = [new Date(2021, 8, 1), new Date(2021, 8, 1)]
    expect(utils.compareDateArray(arr1, arr2)).toBe(true)
    expect(utils.compareDateArray(arr1, arr3)).toBe(false)
  })
})

describe('dateUtil[resetTimeByFormat]', () => {
  it('if !value return null', () => {
    expect(utils.resetTimeByFormat(false)).toBeNull()
  })

  it('reset date by format', () => {
    const d1 = new Date(2021, 8, 9, 10, 12, 21)
    const d2 = new Date(2021, 8, 9)
    const fmt = 'yyyy-MM-dd'
    const fmt2 = 'HH:mm:ss'
    expect(utils.resetTimeByFormat(d1, fmt).valueOf()).toBe(d2.valueOf())
    expect(utils.resetTimeByFormat(d1, fmt2).valueOf()).toBe(d1.valueOf())
  })
})
