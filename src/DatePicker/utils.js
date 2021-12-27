import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekday from 'dayjs/plugin/weekday'
import weekYear from 'dayjs/plugin/weekYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import enLocale from 'dayjs/locale/en'
import { getLocale } from '../locale'

const en2Locate = {
  ...enLocale,
  name: 'en2',
  weekStart: 1,
}

dayjs.locale(en2Locate, null, true)
dayjs.extend(advancedFormat)
dayjs.extend(isoWeek)
dayjs.extend(relativeTime)
dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(customParseFormat)

const TIME_FORMAT = 'HH:mm:ss'

const compatibleFmt = fmt => {
  if (typeof fmt !== 'string') return fmt
  const trans = {
    yy: 'YY',
    d: 'D',
    a: 'A',
    t: 'X',
    T: 'x',
    RRRR: 'GGGG',
    II: 'WW',
  }
  let result = fmt
  Object.keys(trans).forEach(key => {
    result = result.replace(new RegExp(key, 'g'), trans[key])
  })
  return result
}

function getDayJsLocate(options) {
  if (options && options.weekStartsOn === 1) return 'en2'
  return 'en'
}

function addDays(date, offset) {
  return dayjs(date)
    .add(offset, 'day')
    .toDate()
}

function addMonths(date, offset) {
  return dayjs(date)
    .add(offset, 'month')
    .toDate()
}

function addSeconds(date, offset) {
  return dayjs(date)
    .add(offset, 'second')
    .toDate()
}

function addYears(date, offset) {
  return dayjs(date)
    .add(offset, 'year')
    .toDate()
}

function compareAsc(dateA, dateB) {
  if (!dateA || !dateB) return NaN
  const a = dayjs(dateA).valueOf()
  const b = dayjs(dateB).valueOf()
  if (!a || !b) return NaN
  if (a === b) return 0
  return a > b ? 1 : -1
}

function format(date, fmt, options) {
  if (!date) return 'Invalid Date'
  const fmt2 = compatibleFmt(fmt)
  return dayjs(date)
    .locale(getDayJsLocate(options))
    .format(fmt2)
}

function isSameMonth(date1, date2) {
  return (
    date1 &&
    date2 &&
    date1.getFullYear() &&
    date2.getFullYear &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  )
}

function isSameDay(date1, date2) {
  return isSameMonth(date1, date2) && date1.getDate() === date2.getDate()
}

function isSameWeek(date1, date2, options) {
  if (!date1 || !date2) return false
  const dateA = dayjs(date1).locale(getDayJsLocate(options))
  const dateB = dayjs(date2).locale(getDayJsLocate(options))
  return dateA.weekYear() === dateB.weekYear() && dateA.week() === dateB.week()
}

function isValid(date) {
  if (!date) return false
  if (!(date instanceof Date)) return false
  return dayjs(date).isValid()
}

function parse(date, fmt, options) {
  if (!date) return new Date('')
  const fmt2 = compatibleFmt(fmt)

  // handle IOS Year Week
  const index = fmt2.indexOf('GGGG')
  if (index >= 0) {
    const year = date.slice(index, index + 5)
    const weekIndex = fmt2.indexOf('WW')
    const week = weekIndex >= 0 ? date.slice(weekIndex, weekIndex + 3) : 1
    const result = dayjs(year, 'YYYY')
      .locale(getDayJsLocate(options))
      .isoWeek(week)
      .toDate()
    return result
  }
  return dayjs(date, fmt2, getDayJsLocate(options)).toDate()
}

function startOfMonth(day) {
  return new Date(day.getFullYear(), day.getMonth(), 1)
}

function startOfWeek(day, options) {
  const day1 = dayjs(day).locale(getDayJsLocate(options))
  return day1.startOf('week').toDate()
}

function toDate(day) {
  if (!day) return new Date('')
  if (day instanceof Date) return dayjs(day).toDate()
  return dayjs(day).toDate()
}

function getDaysOfMonth(dirtyDate) {
  const date = toDate(dirtyDate)
  let current = startOfWeek(startOfMonth(date), {
    weekStartsOn: getLocale('startOfWeek'),
  })
  current.setHours(dirtyDate.getHours())
  current.setMinutes(dirtyDate.getMinutes())
  current.setSeconds(dirtyDate.getSeconds())

  const days = []
  let index = 0

  while (index < 42) {
    days.push(current)
    current = addDays(current, 1)
    index += 1
  }

  return days
}

function isInvalid(date) {
  // eslint-disable-next-line
  return isNaN(date)
}

function toDateWithFormat(dirtyDate, fmt, def) {
  let date
  if (typeof dirtyDate === 'string') {
    date = parse(dirtyDate, fmt, new Date(), {
      weekStartsOn: getLocale('startOfWeek'),
    })
    const str = format(date, fmt, {
      weekStartsOn: getLocale('startOfWeek'),
    })
    if (str !== dirtyDate) {
      date = toDate(dirtyDate)
    }
  } else date = toDate(dirtyDate)
  if (isInvalid(date)) date = def
  return date
}

function compareMonth(dateLeft, dateRight, pad = 0) {
  if (!dateLeft || !dateRight) return 0
  const left = new Date(dateLeft.getFullYear(), dateLeft.getMonth(), 1)
  const right = new Date(dateRight.getFullYear(), dateRight.getMonth() + pad, 1)
  return compareAsc(left, right)
}

function newDate(defaultDate) {
  const date = defaultDate ? toDate(defaultDate) : new Date()
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function setTime(date, old) {
  date.setHours(old.getHours())
  date.setMinutes(old.getMinutes())
  date.setSeconds(old.getSeconds())

  return date
}

function cloneTime(date, old, fmt) {
  if (!date) return date
  old = toDateWithFormat(old, fmt)
  if (isInvalid(old)) return date
  return setTime(date, old)
}

function formatDateWithDefaultTime(date, value, defaultTime, fmt) {
  if (!date) return date
  if (value) return setTime(date, value)
  if (!defaultTime) return date

  const dateHMS = toDateWithFormat(defaultTime, TIME_FORMAT)
  if (isInvalid(dateHMS)) return date

  const nDate = cloneTime(date, defaultTime, TIME_FORMAT)
  return format(nDate, fmt)
}

function clearHMS(date) {
  if (!isValid(date)) return date
  return new Date(new Date(date.toDateString()).getTime())
}

function compareDateArray(arr1, arr2, type = 'date') {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false
  return arr1.every((v, i) => {
    if (!v || !arr2[i]) return false
    if (type === 'week') return format(v, 'RRRR II') === format(arr2[i], 'RRRR II')
    return v.getTime() === arr2[i].getTime()
  })
}

function getFormat(fo) {
  let defaultFormat = 'yyyy-MM-dd HH:mm:ss.SSS'
  ;['H', 'm', 's', 'S', 'h'].map(v => {
    if (fo.indexOf(v) <= -1) {
      const reg = new RegExp(`${v}`, 'g')
      defaultFormat = defaultFormat.replace(reg, '0')
    }
    return v
  })
  return defaultFormat
}

function resetTimeByFormat(value, fo) {
  if (!value) return null
  const date = toDate(value)
  return toDate(
    format(date, getFormat(fo), {
      weekStartsOn: getLocale('startOfWeek'),
    })
  )
}

function formatted(date, fmt, ...options) {
  if (typeof fmt === 'function') return fmt(date)
  return format(date, fmt, ...options)
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
  getDaysOfMonth,
  format: formatted,
  isInvalid,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isValid,
  newDate,
  setTime,
  parse,
  toDate,
  toDateWithFormat,
  formatDateWithDefaultTime,
  compareDateArray,
  TIME_FORMAT,
  resetTimeByFormat,
}
