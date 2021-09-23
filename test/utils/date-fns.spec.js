import startOfWeek from 'date-fns/startOfWeek'
import startOfMonth from 'date-fns/startOfMonth'
import utils from '../../src/DatePicker/utils'

describe('date-fns[addDays]', () => {
  it.each([[1], [0], [-1]])('add %i day', num => {
    const a = new Date()
    const b = new Date(a.valueOf())
    b.setDate(b.getDate() + num)
    const c = utils.addDays(a, num)
    expect(b.valueOf()).toBe(c.valueOf())
  })
})

describe('date-fns[addMonths]', () => {
  it.each([[1], [0], [-1]])('add %i month', num => {
    const a = new Date()
    const b = new Date(a.valueOf())
    b.setMonth(b.getMonth() + num)
    const c = utils.addMonths(a, num)
    expect(b.valueOf()).toBe(c.valueOf())
  })
})

describe('date-fns[addYears]', () => {
  it.each([[1], [0], [-1]])('add %i year', num => {
    const a = new Date()
    const b = new Date(a.valueOf())
    b.setFullYear(b.getFullYear() + num)
    const c = utils.addYears(a, num)
    expect(b.valueOf()).toBe(c.valueOf())
  })
})

describe('addSeconds', () => {
  it.each([[1], [0], [-1]])('add %i seconds', num => {
    const a = new Date()
    const b = new Date(a.valueOf())
    b.setSeconds(b.getSeconds() + num)
    const c = utils.addSeconds(a, num)
    expect(b.valueOf()).toBe(c.valueOf())
  })
})

describe('date-fns[compareAsc]', () => {
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

describe('date-fns[format]', () => {
  const date = new Date(2021, 0, 1, 11, 11, 11)
  it.each([
    { formatter: 'yyyy-MM-dd', expected: '2021-01-01' },
    { formatter: 'HH:mm:ss', expected: '11:11:11' },
    { formatter: 'hh:mm:ss a', expected: '11:11:11 AM' },
    { formatter: 't', expected: '1609470671' },
    { formatter: 'T', expected: '1609470671000' },
    { formatter: 'RRRR II', expected: '2020 53' },
    { formatter: 'yyyy-MM', expected: '2021-01' },
    { formatter: 'yyyy-MM-dd HH:mm:ss', expected: '2021-01-01 11:11:11' },
  ])('formatter, expected', ({ formatter, expected }) => {
    expect(utils.format(date, formatter)).toBe(expected)
  })
})

describe('date-fns[isSameDay]', () => {
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

describe('date-fns[isSameMonth]', () => {
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

describe('date-fns[isSameWeek]', () => {
  const a = new Date(2021, 8, 20)
  const b = new Date(2021, 8, 26)
  const c = new Date(2021, 8, 27)
  it('weekStartsOn 0', () => {
    expect(utils.isSameWeek(a, b, { weekStartsOn: 1 })).toBeTruthy()
    expect(utils.isSameWeek(b, c, { weekStartsOn: 1 })).toBeFalsy()
  })

  it('weekStartsOn 1', () => {
    expect(utils.isSameWeek(a, b, { weekStartsOn: 0 })).toBeFalsy()
    expect(utils.isSameWeek(b, c, { weekStartsOn: 0 })).toBeTruthy()
  })
})

describe('date-fns[isValid]', () => {
  it('should get true when date is valid', () => {
    expect(utils.isValid('2021-01-02')).toBeTruthy()
    expect(utils.isValid(new Date())).toBeTruthy()
  })

  it('should get false when date is inValid', () => {
    expect(utils.isValid(new Date(''))).toBeFalsy()
    expect(utils.isValid(undefined)).toBeFalsy()
  })
})

describe('date-fns[parse]', () => {
  it.each([
    { formatter: 'yyyy-MM-dd', value: '2021-01-01' },
    { formatter: 'HH:mm:ss', value: '11:11:11' },
    { formatter: 'hh:mm:ss a', value: '11:11:11 AM' },
    { formatter: 't', value: '1609470671' },
    { formatter: 'T', value: '1609470671000' },
    { formatter: 'RRRR II', value: '2020 53' },
    { formatter: 'RRRR II', value: '2020 53', options: { weekStartsOn: 0 } },
    { formatter: 'yyyy-MM', value: '2021-01' },
    { formatter: 'yyyy-MM-dd HH:mm:ss', value: '2021-01-01 11:11:11' },
  ])('$formatter', ({ formatter, value, options }) => {
    const date = utils.parse(value, formatter, new Date(), options)
    expect(date instanceof Date).toBeTruthy()
    expect(utils.format(date, formatter, options)).toBe(value)
  })
})

describe('date-fns[startOfMonth]', () => {
  const a = new Date(2021, 8, 15)
  const b = new Date(2021, 8)
  it('start of Month the date is 0', () => {
    expect(startOfMonth(a).valueOf()).toBe(b.valueOf())
  })
})

describe('date-fns[startOfWeek]', () => {
  const a = new Date(2021, 8, 15)
  const b = new Date(2021, 8, 12)
  const c = new Date(2021, 8, 13)
  it('weekStartsOn 0', () => {
    expect(startOfWeek(a, { weekStartsOn: 0 }).valueOf()).toBe(b.valueOf())
  })

  it('weekStartsOn 1', () => {
    expect(startOfWeek(a, { weekStartsOn: 1 }).valueOf()).toBe(c.valueOf())
  })
})

describe('date-fns[toDate]', () => {
  it('string date 0', () => {
    expect(utils.toDate('2021-08-15 23:11:11').valueOf()).toBe(new Date(2021, 7, 15, 23, 11, 11).valueOf())
  })

  it('Date instance', () => {
    expect(utils.toDate(new Date(2021, 7, 15)).valueOf()).toBe(new Date(2021, 7, 15).valueOf())
  })
})
