import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import utils from '../../src/DatePicker/utils'
import { setLocale, getLocale } from '../../src/locale'

dayjs.extend(timezone)
dayjs.extend(utc)

const timeZone = 'Pacific/Honolulu'
const offset = '-10'

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
  it('with timeZone', () => {
    const now = new Date()
    const a = utils.clearHMS(now, { timeZone: offset }).valueOf()
    const b = dayjs(now)
      .tz(timeZone)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .valueOf()
    expect(a).toBe(b)
  })
})

describe(
  'dateUtil[addDays]', () => {
  it.each([[1], [0], [-1]])('add %i day', num => {
    const a = new Date()
    const b = new Date(a.valueOf())
    b.setDate(b.getDate() + num)
    const c = utils.addDays(a, num)
    expect(b.valueOf()).toBe(c.valueOf())
  })
  it.each([[1], [0], [-1]])('add %i day with timeZone', num => {
    const now = new Date()
    const a = utils.addDays(now, num, { timeZone: offset })
    const b = dayjs(now)
      .tz(timeZone)
      .add(num, 'day')
      .toDate()
    expect(a.valueOf()).toBe(b.valueOf())
  })
})

describe('dateUtil[addMonths]', () => {
  it.each([[1], [0], [-1]])('add %i month', num => {
    const a = new Date(2022, 6, 15)
    const b = new Date(a.valueOf())
    b.setMonth(b.getMonth() + num)
    const c = utils.addMonths(a, num)
    expect(b.valueOf()).toBe(c.valueOf())
  })

  it.each([[1], [0], [-1]])('add %i month with timeZone', num => {
    const now = new Date()
    const a = utils.addMonths(now, num, { timeZone: offset })
    const b = dayjs(now)
      .tz(timeZone)
      .add(num, 'month')
      .toDate()
    expect(a.valueOf()).toBe(b.valueOf())
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

  it.each([[1], [0], [-1]])('add %i year with timeZone', num => {
    const now = new Date()
    const a = utils.addYears(now, num, { timeZone: offset })
    const b = dayjs(now)
      .tz(timeZone)
      .add(num, 'year')
      .toDate()
    expect(a.valueOf()).toBe(b.valueOf())
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

  it.each([[1], [0], [-1]])('add %i seconds with timeZone', num => {
    const now = new Date()
    const a = utils.addSeconds(now, num, { timeZone: offset })
    const b = dayjs(now)
      .tz(timeZone)
      .add(num, 'second')
      .toDate()
    expect(a.valueOf()).toBe(b.valueOf())
  })
})

describe('dateUtil[cloneTime]', () => {
  it('clone null value  will return null', () => {
    expect(utils.cloneTime(null)).toBeNull()
    expect(utils.cloneTime('')).toBe('')
    expect(utils.cloneTime()).toBeUndefined()
  })

  it('clone invalid time to date will return date', () => {
    const date = utils.parse('2020-11-01', 'yyyy-MM-dd')
    const time = ''
    const format = 'xxxxxxx'
    const result = utils.parse('2020-11-01', 'yyyy-MM-dd')
    expect(utils.cloneTime(date, time, format).valueOf()).toBe(result.valueOf())
  })

  it('clone date time to date', () => {
    const date = utils.parse('2020-11-01', 'yyyy-MM-dd')
    const time = utils.parse('1995-11-02 14:14:20', 'yyyy-MM-dd HH:mm:ss')
    const result = utils.parse('2020-11-01 14:14:20', 'yyyy-MM-dd HH:mm:ss')
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
    { a: new Date(1990, 1, 1), b: new Date(1990, 1, 1), expected: 0 },
    { a: new Date(1990, 1, 1), b: undefined, expected: NaN },
    { a: undefined, b: new Date(1990, 1, 1), expected: NaN },
    { a: new Date(1990, 1, 2), b: new Date(1990, 1, 1), expected: 1 },
    { a: new Date(1990, 1, 1), b: new Date(1990, 1, 2), expected: -1 },
    { a: new Date(1990, 1, 1), b: new Date(''), expected: NaN },
  ])('.compareAsc($a, $b)', ({ a, b, expected }) => {
    expect(utils.compareAsc(a, b)).toBe(expected)
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
    expect(utils.compareMonth(a, new Date(''))).toBe(NaN)
    expect(utils.compareMonth(new Date(''), new Date(''))).toBe(NaN)
  })

  it('compare date with  pad', () => {
    const a = new Date(2021, 10, 1)
    const b = new Date(2021, 12, 2)
    expect(utils.compareMonth(a, b, -2)).toBe(0)
    expect(utils.compareMonth(a, b, -3)).toBe(1)
    expect(utils.compareMonth(a, a, 2)).toBe(-1)
  })

  it('compare date with  zone', () => {
    const a = dayjs('2022-06-30 23:59:59', 'YYYY-MM-DD HH:mm:ss')
      .tz(timeZone, true)
      .toDate()
    const b = dayjs('2022-06-01 01:00:00', 'YYYY-MM-DD HH:mm:ss')
      .tz(timeZone, true)
      .toDate()
    expect(utils.compareMonth(a, b, 0, { timeZone: offset })).toBe(0)
  })
})

describe('dateUtil[compareYear]', () => {
  it('false left date or false right date will return 0', () => {
    expect(utils.compareYear(false)).toBe(0)
    expect(utils.compareYear(new Date(), false)).toBe(0)
  })
  it('compare date with 0 pad', () => {
    const a = new Date(2021, 0, 1)
    const b = new Date(2021, 11, 20)
    const c = new Date(2022, 0, 1)
    expect(utils.compareYear(a, b)).toBe(0)
    expect(utils.compareYear(a, c)).toBe(-1)
    expect(utils.compareYear(c, a)).toBe(1)
    expect(utils.compareYear(a, new Date(''))).toBe(NaN)
    expect(utils.compareYear(new Date(''), new Date(''))).toBe(NaN)
  })

  it('compare date with  pad', () => {
    const a = new Date(2022, 10, 1)
    const b = new Date(2021, 11, 2)
    expect(utils.compareYear(a, b, 1)).toBe(0)
    expect(utils.compareYear(a, b, -2)).toBe(1)
    expect(utils.compareYear(a, a, 2)).toBe(-1)
  })

  it('compare date with  zone', () => {
    const a = dayjs('2022-01-01 00:00:01', 'YYYY-MM-DD HH:mm:ss')
      .tz(timeZone, true)
      .toDate()
    const b = dayjs('2022-12-31 23:59:59', 'YYYY-MM-DD HH:mm:ss')
      .tz(timeZone, true)
      .toDate()
    expect(utils.compareYear(a, b, 0, { timeZone: offset })).toBe(0)
  })
})

describe('dateUtil[compareQuarter]', () => {
  it('false left date or false right date will return 0', () => {
    expect(utils.compareQuarter(false)).toBe(0)
    expect(utils.compareQuarter(new Date(), false)).toBe(0)
  })

  it('compare date with 0 pad', () => {
    const a = new Date(2021, 0, 2)
    const aa = new Date(2021, 1, 2)
    const b = new Date(2021, 3, 2)
    expect(utils.compareQuarter(a, aa)).toBe(0)
    expect(utils.compareQuarter(new Date(2021, 9, 1), new Date(2022, 3, 1))).toBe(-1)
    expect(utils.compareQuarter(a, b)).toBe(-1)
    expect(utils.compareQuarter(b, a)).toBe(1)
    expect(utils.compareQuarter(a, new Date(''))).toBe(NaN)
    expect(utils.compareQuarter(new Date(''), new Date(''))).toBe(NaN)
  })

  it('compare date with  pad', () => {
    const a = new Date(2021, 0, 1)
    const b = new Date(2021, 11, 2)
    expect(utils.compareQuarter(a, b, -3)).toBe(0)
    expect(utils.compareQuarter(a, b, -4)).toBe(1)
    expect(utils.compareQuarter(a, b, 0)).toBe(-1)
  })

  it('compare date with  zone', () => {
    const a = dayjs('2022-01-01 00:00:01', 'YYYY-MM-DD HH:mm:ss')
      .tz(timeZone, true)
      .toDate()
    const b = dayjs('2022-03-31 23:59:59', 'YYYY-MM-DD HH:mm:ss')
      .tz(timeZone, true)
      .toDate()
    expect(utils.compareQuarter(a, b, 0, { timeZone: offset })).toBe(0)
  })
})

describe('dateUtil[getDaysOfMonth]', () => {
  it('weekStartsOn 1', () => {
    setLocale('zh-CN')
    expect(getLocale('startOfWeek')).toBe(1)
    const receive = utils.getDaysOfMonth(new Date(2021, 9, 1, 10), {
      weekStartsOn: 1,
    })
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

  it('with zone', () => {
    setLocale('en-US')
    expect(getLocale('startOfWeek')).toBe(0)
    const date = new Date(2021, 9, 1, 10)
    const receive = utils.getDaysOfMonth(date, { timeZone: offset })
    const temp = dayjs(date).tz(timeZone)
    const start = dayjs(temp)
      .startOf('month')
      .startOf('week')
      .hour(temp.hour())
      .minute(temp.minute())
      .second(temp.second())
      .millisecond(temp.millisecond())
      .toDate()
    expect(receive.length).toBe(42)
    expect(receive[0].valueOf()).toBe(start.valueOf())
  })
})

describe('dateUtil[format]', () => {
  it('format inValid date', () => {
    expect(utils.format(undefined, 'yyyy-MM-dd')).toBe('Invalid Date')
  })
  it('format with inner format', () => {
    setLocale('zh-CN')
    const date = utils.parse('2021-01-01 11:11:11', 'YYYY-MM-DD hh:mm:ss')
    const timeStamp = `${date.valueOf()}`
    const data = [
      { formatter: 'yyyy-MM-dd', expected: '2021-01-01' },
      { formatter: 'HH:mm:ss', expected: '11:11:11' },
      { formatter: 'hh:mm:ss a', expected: '11:11:11 AM' },
      { formatter: 't', expected: timeStamp.slice(0, -3) },
      { formatter: 'T', expected: timeStamp },
      { formatter: 'RRRR II', expected: '2020 53' },
      { formatter: 'yyyy-MM', expected: '2021-01' },
      { formatter: 'yyyy-MM-dd HH:mm:ss', expected: '2021-01-01 11:11:11' },
      {
        input: utils.parse('2021-05-01 11:11:11', 'YYYY-MM-DD hh:mm:ss'),
        formatter: 'yyyy-[Q]Q',
        expected: '2021-Q2',
      },
    ]
    data.forEach(({ formatter, expected, input }) => {
      expect(utils.format(input || date, formatter)).toBe(expected)
      const zoneDate = dayjs(input || date).tz(timeZone)
      const zoneUtc =
        formatter === 't' || formatter === 'T'
          ? date
          : new Date(
              zoneDate.year(),
              zoneDate.month(),
              zoneDate.date(),
              zoneDate.hour(),
              zoneDate.minute(),
              zoneDate.second(),
              zoneDate.millisecond()
            )
      expect(utils.format(input || date, formatter, { timeZone: offset })).toBe(utils.format(zoneUtc, formatter))
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
  const a = new Date(2017, 4, 1, 23, 59, 59)
  const b = new Date(2017, 4, 1, 0, 0, 1)
  const c = new Date(2017, 5, 1)
  const zoneA = dayjs(a)
    .tz(timeZone, true)
    .toDate()
  const zoneB = dayjs(b)
    .tz(timeZone, true)
    .toDate()
  it('same', () => {
    expect(utils.isSameDay(a, b)).toBeTruthy()
  })
  it('not same', () => {
    expect(utils.isSameDay(a, c)).toBeFalsy()
  })
  it('zone', () => {
    expect(utils.isSameDay(zoneA, zoneB)).toBeFalsy()
    expect(utils.isSameDay(zoneB, zoneB, { timeZone: offset })).toBeTruthy()
  })
})

describe('dateUtil[isSameMonth]', () => {
  const a = new Date(2017, 4, 1, 0, 0, 1)
  const b = new Date(2017, 4, 31, 23, 59, 59)
  const c = new Date(2017, 5, 1)
  const zoneA = dayjs(a)
    .tz(timeZone, true)
    .toDate()
  const zoneB = dayjs(b)
    .tz(timeZone, true)
    .toDate()
  it('same', () => {
    expect(utils.isSameMonth(a, b)).toBeTruthy()
  })
  it('not same', () => {
    expect(utils.isSameMonth(a, c)).toBeFalsy()
  })
  it('zone', () => {
    expect(utils.isSameMonth(zoneA, zoneB)).toBeFalsy()
    expect(utils.isSameMonth(zoneA, zoneB, { timeZone: offset })).toBeTruthy()
  })
})

describe('dateUtil[isSameQuarter]', () => {
  const a = new Date(2017, 0, 1, 0, 0, 1)
  const b = new Date(2017, 2, 31, 23, 59, 59)
  const c = new Date(2017, 3, 10)
  const zoneA = dayjs(a)
    .tz(timeZone, true)
    .toDate()
  const zoneB = dayjs(b)
    .tz(timeZone, true)
    .toDate()
  it('same', () => {
    expect(utils.isSameQuarter(a, b)).toBeTruthy()
  })
  it('not same', () => {
    expect(utils.isSameQuarter(a, c)).toBeFalsy()
  })
  it('zone', () => {
    expect(utils.isSameQuarter(zoneA, zoneB)).toBeFalsy()
    expect(utils.isSameQuarter(zoneA, zoneB, { timeZone: offset })).toBeTruthy()
  })
})

describe('dateUtil[isSameWeek]', () => {
  const a = new Date(2021, 8, 20, 0, 0, 1)
  const b = new Date(2021, 8, 26, 23, 59, 59)
  const c = new Date(2021, 8, 27)
  const zoneA = dayjs(a)
    .tz(timeZone, true)
    .toDate()
  const zoneB = dayjs(b)
    .tz(timeZone, true)
    .toDate()
  it('weekStartsOn 1', () => {
    expect(utils.isSameWeek(a, b, { weekStartsOn: 1 })).toBeTruthy()
    expect(utils.isSameWeek(b, c, { weekStartsOn: 1 })).toBeFalsy()
  })

  it('weekStartsOn 0', () => {
    expect(utils.isSameWeek(a, b, { weekStartsOn: 0 })).toBeFalsy()
    expect(utils.isSameWeek(b, c, { weekStartsOn: 0 })).toBeTruthy()
  })

  it('zone', () => {
    expect(utils.isSameWeek(zoneA, zoneB, { weekStartsOn: 1 })).toBeFalsy()
    expect(utils.isSameWeek(zoneA, zoneB, { timeZone: offset, weekStartsOn: 1 })).toBeTruthy()
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
  it('invalid param return  invalid Date', () => {
    expect(utils.parse(undefined, 'yyyy-MM-dd', {}).toString()).toBe('Invalid Date')
  })
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
    { formatter: 'yyyy-[Q]Q', value: '2021-Q2' },
  ])('$formatter', ({ formatter, value, options = {} }) => {
    const date = utils.parse(value, formatter, options)
    expect(date instanceof Date).toBeTruthy()
    expect(utils.format(date, formatter, options)).toBe(value)
    const zoneParse = utils.parse(value, formatter, { ...options, timeZone: offset })
    expect(utils.format(zoneParse, formatter, { ...options, timeZone: offset })).toBe(value)
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
  it('zone', () => {
    const a = new Date(2021, 10, 12, 22, 22)
    const expected = dayjs(a)
      .tz(timeZone)
      .startOf('date')
      .toDate()
    expect(utils.newDate(a, { timeZone: offset }).valueOf()).toBe(expected.valueOf())
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
  it('invalid param return  invalid Date', () => {
    expect(utils.toDate(undefined).toString()).toBe('Invalid Date')
  })
  it('string date', () => {
    expect(utils.toDate('2021-08-15 23:11:11').valueOf()).toBe(new Date(2021, 7, 15, 23, 11, 11).valueOf())
  })

  it('Date instance', () => {
    expect(utils.toDate(new Date(2021, 7, 15)).valueOf()).toBe(new Date(2021, 7, 15).valueOf())
  })

  it('with Zone', () => {
    expect(utils.toDate(new Date(2021, 7, 15), { timeZone: offset }).valueOf()).toBe(new Date(2021, 7, 15).valueOf())
    expect(utils.toDate('2021-08-15 23:11:11', { timeZone: offset }).valueOf()).toBe(
      dayjs('2021-08-15 23:11:11')
        .tz(timeZone, true)
        .toDate()
        .valueOf()
    )
  })
})

describe('dateUtil[toDateWithFormat]', () => {
  it('invalid Date', () => {
    expect(utils.toDateWithFormat(NaN, 'yyyy-MM-dd', null)).toBeNull()
    expect(utils.toDateWithFormat(NaN, 'yyyy-MM-dd', null, { timeZone: offset })).toBeNull()
  })
  it('string Date', () => {
    const expected = new Date(2021, 9, 1)
    expect(utils.toDateWithFormat('2021-10-01', 'yyyy-MM-dd', undefined).valueOf()).toBe(expected.valueOf())
    expect(utils.toDateWithFormat('2021-10-01', 'yyyy-MM-dd', undefined, { timeZone: offset }).valueOf()).toBe(
      dayjs('2021-10-01', 'YYYY-MM-DD')
        .tz(timeZone, true)
        .toDate()
        .valueOf()
    )
  })
  it('of not string will return date not formatted', () => {
    const expected = new Date(2021, 9, 1, 12, 12)
    expect(utils.toDateWithFormat(expected, 'yyyy-MM-dd', undefined).valueOf()).toBe(expected.valueOf())
  })
  it('not match format will return toDate(dirtyDate)', () => {
    const expected = new Date(2021, 9, 1, 12, 12, 12)
    expect(utils.toDateWithFormat('2021-10-01 12:12:12', 'HH:mm:ss', undefined).valueOf()).toBe(expected.valueOf())
    expect(utils.toDateWithFormat('2021-10-01 12:12:12', 'HH:mm:ss', undefined, { timeZone: offset }).valueOf()).toBe(
      dayjs('2021-10-01 12:12:12')
        .tz(timeZone, true)
        .toDate()
        .valueOf()
    )
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
    expect(utils.formatDateWithDefaultTime(date, value, null, null, offset).valueOf()).toBe(
      utils.cloneTime(date, value).valueOf()
    )
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

  it('valid params with zone', () => {
    const date = new Date()
    const defaultTime = '10:12:20'
    const fmt = 'yyyy-MM-dd HH:mm:ss'
    const nDate = utils.cloneTime(date, defaultTime, utils.TIME_FORMAT, { timeZone: offset })
    const result = utils.format(nDate, fmt, { timeZone: offset })
    expect(utils.formatDateWithDefaultTime(date, null, defaultTime, fmt, { timeZone: offset })).toBe(result)
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

  it('type = "week" and set zone', () => {
    const trans = d =>
      dayjs(d)
        .tz(timeZone, true)
        .toDate()
    const arr1 = [trans(new Date(2021, 8, 1))]
    const arr2 = [trans(new Date(2021, 8, 4))]
    const arr3 = [trans(new Date(2021, 9, 4))]
    expect(utils.compareDateArray(arr1, arr2, 'week', { timeZone: offset })).toBe(true)
    expect(utils.compareDateArray(arr1, arr3, 'week', { timeZone: offset })).toBe(false)
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

describe('getDateInfo', () => {
  const d = new Date()
  it.each(['year', 'month', 'date', 'week', 'quarter', 'day', 'hour', 'minute', 'second', 'millisecond'])(
    '.get %S',
    type => {
      expect(utils.getDateInfo(d, type)).toBe(dayjs(d)[type]())
      expect(utils.getDateInfo(d, type, { timeZone: offset })).toBe(
        dayjs(d)
          .tz(timeZone)
          [type]()
      )
    }
  )
})

describe('changeDate', () => {
  const d = new Date()
  it.each([
    ['year', 2000],
    ['month', 5],
    ['date', 5],
    ['week', 10],
    ['quarter', 1],
    ['day', 1],
    ['hour', 1],
    ['minute', 1],
    ['second', 1],
    ['millisecond', 1],
  ])('.get %S', (type, value) => {
    expect(utils.changeDate(d, type, value).valueOf()).toBe(
      dayjs(d)
        [type](value)
        .toDate()
        .valueOf()
    )
    expect(utils.changeDate(d, type, value, { timeZone: offset }).valueOf()).toBe(
      dayjs(d)
        .tz(timeZone)
        [type](value)
        .toDate()
        .valueOf()
    )
  })
})
