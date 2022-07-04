import dayjs from 'dayjs'
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc'
import utcToZonedTime from 'date-fns-tz/utcToZonedTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekday from 'dayjs/plugin/weekday'
import weekYear from 'dayjs/plugin/weekYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import enLocale from 'dayjs/locale/en'

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
dayjs.extend(quarterOfYear)

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

function transDateWithZone(dd, options = {}, back = false) {
  if (options.timeZone) {
    return back ? zonedTimeToUtc(dd, options.timeZone) : utcToZonedTime(dd, options.timeZone)
  }
  return dd
}

function addDays(date, offset, options) {
  const zd = transDateWithZone(date, options)
  const d = dayjs(zd)
    .add(offset, 'day')
    .toDate()
  const ud = transDateWithZone(d, options, true)
  return ud
}

function addMonths(date, offset, options) {
  const zd = transDateWithZone(date, options)
  const d = dayjs(zd)
    .add(offset, 'month')
    .toDate()
  const ud = transDateWithZone(d, options, true)
  return ud
}

function addSeconds(date, offset, options) {
  const zd = transDateWithZone(date, options)
  const d = dayjs(zd)
    .add(offset, 'seconds')
    .toDate()
  const ud = transDateWithZone(d, options, true)
  return ud
}

function addYears(date, offset, options) {
  const zd = transDateWithZone(date, options)
  const d = dayjs(zd)
    .add(offset, 'year')
    .toDate()
  const ud = transDateWithZone(d, options, true)
  return ud
}

function changeDate(date, type, num, options) {
  const zd = transDateWithZone(date, options)
  // type is year month ...
  const d = dayjs(zd)
    [type](num)
    .toDate()
  const ud = transDateWithZone(d, options, true)
  return ud
}

function getDateInfo(date, type, options) {
  const zd = transDateWithZone(date, options)
  return dayjs(zd)[type]()
}

function compareAsc(dateA, dateB) {
  if (!dateA || !dateB) return NaN
  const a = dayjs(dateA).valueOf()
  const b = dayjs(dateB).valueOf()
  if (!a || !b) return NaN
  if (a === b) return 0
  return a > b ? 1 : -1
}

function format(date, fmt, options = {}) {
  if (!date) return 'Invalid Date'
  const fmt2 = compatibleFmt(fmt)
  let zd = date
  if (fmt2 !== 'X' && fmt2 !== 'x') {
    zd = transDateWithZone(date, options)
  }
  const dd = dayjs(zd).locale(getDayJsLocate(options))
  const result = dd.format(fmt2)
  return result
}

function isSameMonth(date1, date2, options = {}) {
  return date1 && date2 && format(date1, 'YYYY-MM', options) === format(date2, 'YYYY-MM', options)
}

function isSameDay(date1, date2, options) {
  return date1 && date2 && format(date1, 'YYYY-MM-dd', options) === format(date2, 'YYYY-MM-dd', options)
}

function isSameWeek(date1, date2, options) {
  if (!date1 || !date2) return false
  return date1 && date2 && format(date1, 'gggg-ww', options) === format(date2, 'gggg-ww', options)
}
function isSameQuarter(date1, date2, options) {
  if (!date1 || !date2) return false
  return date1 && date2 && format(date1, 'YYYY Q', options) === format(date2, 'YYYY Q', options)
}

function isValid(date) {
  if (!date) return false
  if (!(date instanceof Date)) return false
  return dayjs(date).isValid()
}

function parse(d, fmt, options) {
  if (!d) return new Date('')
  // should clear[xxx]
  const reg = /[[]([^[^\]]+?)[\]]/g
  const date = d && d.replace ? d.replace(reg, ' ') : d
  const fmt2 = compatibleFmt(fmt).replace(reg, ' ')

  // handle IOS Year Week
  const index = fmt2.indexOf('GGGG')
  if (index >= 0) {
    const year = date.slice(index, index + 5)
    const weekIndex = fmt2.indexOf('WW')
    const week = weekIndex >= 0 ? date.slice(weekIndex, weekIndex + 3) : 1
    const result = dayjs(`${year}-06-15`, 'YYYY-MM-dd')
      .locale(getDayJsLocate(options))
      .isoWeek(Number(week))
      .toDate()
    return transDateWithZone(result, options, true)
  }
  // handle Quarter
  const quarterIndex = fmt2.indexOf('Q')
  if (quarterIndex >= 0) {
    const quarter = date.slice(quarterIndex, quarterIndex + 2)
    const result = dayjs(date, fmt2)
      .locale(getDayJsLocate(options))
      .quarter(quarter)
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

function toDate(day, options) {
  if (!day) return new Date('')
  if (day instanceof Date) return dayjs(day).toDate()
  if (typeof day === 'number') return new Date(day)
  if (typeof day === 'string') return transDateWithZone(dayjs(day).toDate(), options, true)
  return dayjs(day).toDate()
}

function getDaysOfMonth(dirtyDate, options) {
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

function isInvalid(date) {
  // eslint-disable-next-line
  return isNaN(date)
}

function toDateWithFormat(dirtyDate, fmt, def, options) {
  let date
  if (typeof dirtyDate === 'string') {
    date = parse(dirtyDate, fmt, options)
    const str = format(date, fmt, options)
    if (str !== dirtyDate) {
      date = toDate(dirtyDate, options)
    }
  } else date = toDate(dirtyDate, options)
  if (isInvalid(date)) date = def
  return date
}

function compareMonth(dateLeft, dateRight, pad = 0, options) {
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

function compareYear(dateLeft, dateRight, pad = 0, options) {
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

function compareQuarter(dateLeft, dateRight, pad = 0, options) {
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

function newDate(defaultDate, options) {
  const date = defaultDate ? toDate(defaultDate, options) : new Date()
  const zd = transDateWithZone(date, options)
  const dd = dayjs(zd)
    .startOf('date')
    .toDate()
  const ud = transDateWithZone(dd, options, true)
  return ud
}

function setTime(date, old) {
  date.setHours(old.getHours())
  date.setMinutes(old.getMinutes())
  date.setSeconds(old.getSeconds())
  date.setMilliseconds(old.getMilliseconds())

  return date
}

function cloneTime(date, old, fmt, options) {
  if (!date) return date
  const oldDate = toDateWithFormat(old, fmt, undefined, options)
  if (isInvalid(oldDate)) return date
  return setTime(date, oldDate)
}

function formatDateWithDefaultTime(date, value, defaultTime, fmt, options) {
  if (!date) return date
  if (value) return setTime(date, value)
  if (!defaultTime) return date

  const dateHMS = toDateWithFormat(defaultTime, TIME_FORMAT, undefined, options)
  if (isInvalid(dateHMS)) return date

  const nDate = cloneTime(date, defaultTime, TIME_FORMAT, options)
  return format(nDate, fmt, options)
}

function clearHMS(date, options) {
  if (!isValid(date)) return date
  const zd = transDateWithZone(date, options)
  const dd = dayjs(zd)
    .startOf('date')
    .toDate()
  const ud = transDateWithZone(dd, options, true)
  return ud
}

function compareDateArray(arr1, arr2, type = 'date', options) {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false
  return arr1.every((v, i) => {
    if (!v || !arr2[i]) return false
    if (type === 'week') return format(v, 'RRRR II', options) === format(arr2[i], 'RRRR II', options)
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

function resetTimeByFormat(value, fo, options) {
  if (!value) return null
  const date = toDate(value, options)
  return toDate(format(date, getFormat(fo), options), options)
}

function formatted(date, fmt, options) {
  if (typeof fmt === 'function') return fmt(date)
  return format(date, fmt, options)
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
}
