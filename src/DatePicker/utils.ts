import utcToZonedTime from 'date-fns-tz/utcToZonedTime'
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc'
import dayjs from 'dayjs'
import enLocale from 'dayjs/locale/en'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isoWeek from 'dayjs/plugin/isoWeek'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { DateMode, DateTimeType } from './Props'

interface DateOptions {
  timeZone?: string
  weekStartsOn?: number
}

const en2Locate = {
  ...enLocale,
  name: 'en2',
  weekStart: 1,
}

dayjs.locale(en2Locate, undefined, true)
dayjs.extend(advancedFormat)
dayjs.extend(isoWeek)
dayjs.extend(relativeTime)
dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(customParseFormat)
dayjs.extend(quarterOfYear)

const TIME_FORMAT = 'HH:mm:ss'

export const compatibleFmt = (fmt?: string) => {
  if (typeof fmt !== 'string') return fmt
  const trans = {
    yy: 'YY',
    d: 'D',
    a: 'A',
    t: 'X',
    T: 'x',
    RRRR: 'GGGG',
    I: 'W',
  }
  let result = fmt
  Object.keys(trans).forEach((key: keyof typeof trans) => {
    result = result.replace(new RegExp(key, 'g'), trans[key])
  })
  if (result !== fmt) {
    console.warn(`invalid datepicker format: ${fmt} please use ${result}`)
  }
  return result
}

function getDayJsLocate(options?: DateOptions) {
  if (options && options.weekStartsOn === 1) return 'en2'
  return 'en'
}

function transDateWithZone(dd: Date, options: DateOptions = {}, back = false) {
  if (options.timeZone) {
    const timezoneHH = /^([+-]\d{2})$/
    // 只放开两位时区
    if (timezoneHH.test(options.timeZone)) {
      const num = +options.timeZone
      if (num <= 13 && num >= -12) {
        return back ? zonedTimeToUtc(dd, options.timeZone) : utcToZonedTime(dd, options.timeZone)
      }
    }
    console.error(new Error(`timeZone is not supported: ${options.timeZone}`))
  }
  return new Date(dd)
}

function addDays(date: Date, offset: number, options: DateOptions) {
  const zd = transDateWithZone(date, options)
  const d = dayjs(zd)
    .add(offset, 'day')
    .toDate()
  const ud = transDateWithZone(d, options, true)
  return ud
}

function addMonths(date: Date, offset: number, options: DateOptions) {
  const zd = transDateWithZone(date, options)
  const d = dayjs(zd)
    .add(offset, 'month')
    .toDate()
  const ud = transDateWithZone(d, options, true)
  return ud
}

function addSeconds(date: Date, offset: number, options: DateOptions) {
  const zd = transDateWithZone(date, options)
  const d = dayjs(zd)
    .add(offset, 'seconds')
    .toDate()
  const ud = transDateWithZone(d, options, true)
  return ud
}

function addYears(date: Date, offset: number, options: DateOptions) {
  const zd = transDateWithZone(date, options)
  const d = dayjs(zd)
    .add(offset, 'year')
    .toDate()
  const ud = transDateWithZone(d, options, true)
  return ud
}

function changeDate(date: Date, type: DateMode, num: number, options: DateOptions) {
  const zd = transDateWithZone(date, options)
  // type is year month ...
  const d = (dayjs(zd) as any)[type](num).toDate()
  const ud = transDateWithZone(d, options, true)
  return ud
}

function getDateInfo(date: Date, type: DateMode, options: DateOptions): number {
  const zd = transDateWithZone(date, options)
  return (dayjs(zd) as any)[type]()
}

function compareAsc(dateA: DateTimeType, dateB: DateTimeType) {
  if (!dateA || !dateB) return NaN
  const a = dayjs(dateA).valueOf()
  const b = dayjs(dateB).valueOf()
  if (!a || !b) return NaN
  if (a === b) return 0
  return a > b ? 1 : -1
}

function format(date: Date, fmt?: string, options: DateOptions = {}) {
  if (!date) return 'Invalid Date'
  const fmt2 = compatibleFmt(fmt)
  let zd = date
  if (fmt2 !== 'X' && fmt2 !== 'x') {
    zd = transDateWithZone(date, options)!
  }
  const dd = dayjs(zd).locale(getDayJsLocate(options))
  const result = dd.format(fmt2)
  return result
}

function isSameMonth(date1: Date, date2: Date, options: DateOptions = {}) {
  return date1 && date2 && format(date1, 'YYYY-MM', options) === format(date2, 'YYYY-MM', options)
}

function isSameDay(date1: Date, date2: Date, options: DateOptions) {
  return date1 && date2 && format(date1, 'YYYY-MM-DD', options) === format(date2, 'YYYY-MM-DD', options)
}

function isSameWeek(date1: Date, date2: Date, options: DateOptions) {
  if (!date1 || !date2) return false
  return date1 && date2 && format(date1, 'gggg-ww', options) === format(date2, 'gggg-ww', options)
}
function isSameQuarter(date1: Date, date2: Date, options: DateOptions) {
  if (!date1 || !date2) return false
  return date1 && date2 && format(date1, 'YYYY Q', options) === format(date2, 'YYYY Q', options)
}

function isValid(date: DateTimeType) {
  if (!date) return false
  if (!(date instanceof Date)) return false
  return dayjs(date).isValid()
}

function parse(d: string, fmt?: string, options?: DateOptions) {
  if (!d) return new Date('')
  // should clear[xxx]
  const reg = /[[]([^[^\]]+?)[\]]/g
  const date = d && typeof d === 'string' && d.replace ? d.replace(reg, ' ') : d
  const fmt2 = compatibleFmt(fmt)!.replace(reg, ' ')

  // handle IOS Year Week
  const index = fmt2.indexOf('GGGG')
  if (index >= 0 && typeof date === 'string') {
    const year = date.slice(index, index + 5)
    const weekIndex = fmt2.indexOf('WW')
    const week = weekIndex >= 0 ? date.slice(weekIndex, weekIndex + 3) : 1
    const result = dayjs(`${year}-06-15`, 'YYYY-MM-DD')
      .locale(getDayJsLocate(options))
      .isoWeek(Number(week))
      .toDate()
    return transDateWithZone(result, options, true)
  }
  // handle Quarter
  const quarterIndex = fmt2.indexOf('Q')
  if (quarterIndex >= 0 && typeof date === 'string') {
    const quarter = date.slice(quarterIndex, quarterIndex + 2)
    const result = dayjs(date, fmt2)
      .locale(getDayJsLocate(options))
      .quarter(Number(quarter))
      .toDate()
    return transDateWithZone(result, options, true)
  }

  // dayjs parse stamp with  timeZone have bug
  if (fmt2 === 'x' || fmt2 === 'X') {
    let stamp = +date
    if (fmt2 === 'X') stamp *= 1000
    return new Date(stamp)
  }
  const result = dayjs(date, fmt2, getDayJsLocate(options)).toDate()
  return transDateWithZone(result, options, true)
}

function toDate(day: DateTimeType, options?: DateOptions): Date {
  if (!day) return new Date('')
  if (day instanceof Date) return dayjs(day).toDate()
  if (typeof day === 'number') return new Date(day)
  if (typeof day === 'string') return transDateWithZone(dayjs(day).toDate(), options, true)
  return dayjs(day).toDate()
}

function getDaysOfMonth(dirtyDate: DateTimeType, options: DateOptions) {
  const date = toDate(dirtyDate, options)
  const temp = dayjs(transDateWithZone(date, options))
  let current = dayjs(transDateWithZone(date, options))
    .locale(getDayJsLocate(options))
    .startOf('month')
    .startOf('week')
    .hour(temp.hour())
    .minute(temp.minute())
    .second(temp.second())
    .millisecond(temp.millisecond())

  const days = []
  let index = 0

  while (index < 42) {
    days.push(transDateWithZone(current.toDate(), options, true))
    current = current.add(1, 'day')
    index += 1
  }

  return days
}

function isInvalid(date: unknown) {
  // eslint-disable-next-line
  return isNaN(date as number)
}

// function toDateWithFormat(dirtyDate: Date, fmt: string, def: DateTimeType, options: DateOptions): Date
// function toDateWithFormat(dirtyDate: DateTimeType, fmt: string, def: DateTimeType, options: DateOptions): DateTimeType
function toDateWithFormat(dirtyDate: DateTimeType, fmt?: string, def?: Date, options?: DateOptions) {
  let date: Date
  if (typeof dirtyDate === 'string') {
    date = parse(dirtyDate, fmt, options)
    const str = format(date, fmt, options)
    if (str !== dirtyDate) {
      date = toDate(dirtyDate, options)
    }
  } else date = toDate(dirtyDate, options)
  if (isInvalid(date)) date = def!
  return date
}

function compareDay(dateLeft: Date, dateRight: Date, pad = 0, options: DateOptions) {
  if (!dateLeft || !dateRight) return NaN
  const left = dayjs(transDateWithZone(dateLeft, options))
    .startOf('date')
    .toDate()
  const right = dayjs(transDateWithZone(dateRight, options))
    .startOf('date')
    .add(pad, 'day')
    .toDate()
  return compareAsc(left, right)
}

function compareMonth(dateLeft: Date, dateRight: Date, pad = 0, options: DateOptions) {
  if (!dateLeft || !dateRight) return 0
  const left = dayjs(transDateWithZone(dateLeft, options))
    .startOf('month')
    .toDate()
  const right = dayjs(transDateWithZone(dateRight, options))
    .startOf('month')
    .add(pad, 'month')
    .toDate()
  return compareAsc(left, right)
}

function compareWeek(dateLeft: Date, dateRight: Date, pad = 0, options: DateOptions) {
  if (!dateLeft || !dateRight) return 0
  const left = dayjs(transDateWithZone(dateLeft, options))
    .startOf('isoWeek')
    .toDate()
  const right = dayjs(transDateWithZone(dateRight, options))
    .startOf('isoWeek')
    .add(pad, 'week')
    .toDate()
  return compareAsc(left, right)
}

function compareYear(dateLeft: Date, dateRight: Date, pad = 0, options: DateOptions) {
  if (!dateLeft || !dateRight) return 0
  const left = dayjs(transDateWithZone(dateLeft, options))
    .startOf('year')
    .toDate()
  const right = dayjs(transDateWithZone(dateRight, options))
    .startOf('year')
    .add(pad, 'year')
    .toDate()
  return compareAsc(left, right)
}

function compareQuarter(dateLeft: Date, dateRight: Date, pad = 0, options: DateOptions) {
  if (!dateLeft || !dateRight) return 0
  const left = dayjs(transDateWithZone(dateLeft, options))
    .startOf('quarter')
    .toDate()
  const right = dayjs(transDateWithZone(dateRight, options))
    .startOf('quarter')
    .add(pad, 'quarter')
    .toDate()
  return compareAsc(left, right)
}

function newDate(defaultDate?: Date | DateTimeType, options?: DateOptions) {
  const date = defaultDate ? toDate(defaultDate, options) : new Date()
  const zd = transDateWithZone(date, options)
  const dd = dayjs(zd)
    .startOf('date')
    .toDate()
  const ud = transDateWithZone(dd, options, true)
  return ud
}

function setTime(date: Date, old: Date, options?: DateOptions) {
  const zd = transDateWithZone(date, options)
  const oldZd = transDateWithZone(old, options)
  zd.setHours(oldZd.getHours())
  zd.setMinutes(oldZd.getMinutes())
  zd.setSeconds(oldZd.getSeconds())
  zd.setMilliseconds(oldZd.getMilliseconds())
  const ud = transDateWithZone(zd, options, true)
  return ud
}

function cloneTime(date: Date, old: Date, fmt?: string, options?: DateOptions) {
  if (!date) return date
  const oldDate = toDateWithFormat(old, fmt, undefined, options)
  if (isInvalid(oldDate)) return date
  return setTime(date, oldDate, options)
}

function formatDateWithDefaultTime(
  date: Date,
  value: Date | undefined,
  defaultTime: Date | undefined,
  fmt: string,
  options: DateOptions
) {
  if (!date) return date
  if (value) return setTime(date, value, options)
  if (!defaultTime) return date

  const dateHMS = toDateWithFormat(defaultTime, TIME_FORMAT, undefined, options)
  if (isInvalid(dateHMS)) return date

  const nDate = cloneTime(date, defaultTime, TIME_FORMAT, options)
  return format(nDate, fmt, options)
}

function clearHMS(date: Date, options: DateOptions) {
  if (!isValid(date)) return date
  const zd = transDateWithZone(date, options)
  const dd = dayjs(zd)
    .startOf('date')
    .toDate()
  const ud = transDateWithZone(dd, options, true)
  return ud
}

function compareDateArray(arr1: Date[], arr2: Date[], type = 'date', options: DateOptions) {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false
  return arr1.every((v, i) => {
    if (!v || !arr2[i]) return false
    if (type === 'week') return format(v, 'GGGG WW', options) === format(arr2[i], 'GGGG WW', options)
    return v.getTime() === arr2[i].getTime()
  })
}

function getFormat(fo: string) {
  let defaultFormat = 'YYYY-MM-DD HH:mm:ss.SSS'
  ;['H', 'm', 's', 'S', 'h'].map(v => {
    if (fo.indexOf(v) <= -1) {
      const reg = new RegExp(`${v}`, 'g')
      defaultFormat = defaultFormat.replace(reg, '0')
    }
    return v
  })
  return defaultFormat
}

function resetTimeByFormat(value: Date | undefined, fo: string, options: DateOptions) {
  if (!value) return null
  const date = toDate(value, options)
  return toDate(format(date, getFormat(fo), options), options)
}

function formatted(date: Date, fmt: string | Function, options: DateOptions) {
  const offsetDate = transDateWithZone(date, options)
  if (typeof fmt === 'function') return fmt(date, offsetDate)
  return format(date, fmt, options)
}

function isDisabledByTime(date: Date, disabled: (date: Date) => boolean) {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)
  const currentTime = new Date(startOfDay)
  while (currentTime <= endOfDay) {
    if (!disabled(currentTime)) {
      return false
    }
    currentTime.setHours(currentTime.getHours() + 1)
  }
  return true
}

export default {
  clearHMS,
  addDays,
  addMonths,
  addYears,
  addSeconds,
  cloneTime,
  compareAsc,
  compareMonth,
  compareWeek,
  compareDay,
  compareQuarter,
  getDaysOfMonth,
  format: formatted,
  isInvalid,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isSameQuarter,
  isValid,
  newDate,
  setTime,
  parse,
  toDate,
  toDateWithFormat,
  formatDateWithDefaultTime,
  compareDateArray,
  compareYear,
  TIME_FORMAT,
  resetTimeByFormat,
  changeDate,
  getDateInfo,
  compatibleFmt,
  transDateWithZone,
  isDisabledByTime,
}
